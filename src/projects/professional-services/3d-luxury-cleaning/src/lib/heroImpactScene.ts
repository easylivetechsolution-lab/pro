import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface HeroImpactSlots {
  container: HTMLElement;
  globeSlot: HTMLElement;
  starsSlot: HTMLElement;
}

export interface HeroImpactSceneController {
  dispose: () => void;
}

const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _dummy = new THREE.Object3D();

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render|WARP/i.test(gpu);
  } catch {
    return true;
  }
}

function latLngToVec3(latDeg: number, lngDeg: number, radius: number, out = new THREE.Vector3()): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - latDeg);
  const theta = THREE.MathUtils.degToRad(lngDeg + 180);
  out.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
  return out;
}

function createStarGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const outer = 0.42;
  const inner = 0.185;
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 + Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 8,
  });
  geom.center();
  return geom;
}

/** Builds a smooth full-width undulating silk-wave geometry for the GLSL ribbon shader */
function createSilkWaveGeometry(
  width: number,
  height: number,
  yOffset: number,
  amp: number,
  freq: number,
  phase: number,
): THREE.PlaneGeometry {
  const geom = new THREE.PlaneGeometry(width, height, 128, 1);
  const pos = geom.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const wave =
      Math.sin((x / width) * Math.PI * freq + phase) * amp +
      Math.cos((x / width) * Math.PI * (freq * 0.5) - phase * 0.5) * (amp * 0.45);
    pos.setY(i, y + yOffset + wave);
  }
  geom.computeVertexNormals();
  return geom;
}

export function mountHeroImpactScene(
  slots: HeroImpactSlots,
  onWebglError?: () => void,
): HeroImpactSceneController {
  const isSoftwareGl = detectSoftwareGl();

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch {
    onWebglError?.();
    return { dispose: () => {} };
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.autoClear = false;

  const canvasEl = renderer.domElement;
  canvasEl.style.position = 'absolute';
  canvasEl.style.inset = '0';
  canvasEl.style.width = '100%';
  canvasEl.style.height = '100%';
  canvasEl.style.pointerEvents = 'none';
  canvasEl.style.zIndex = '2';
  canvasEl.style.opacity = '0';
  canvasEl.style.transition = 'opacity 300ms ease-out';
  slots.container.appendChild(canvasEl);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  pmrem.dispose();

  const disposables: Array<{ dispose: () => void }> = [envRT];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  let disposed = false;

  // ============================================================================
  // SUB-SCENE 1: MATURE SILK LIGHT WAVES + SUBTLE LUMINOUS MOTES ACROSS ALL CARDS
  // ============================================================================
  const backdropScene = new THREE.Scene();
  const backdropCam = new THREE.PerspectiveCamera(40, 3, 0.1, 100);
  backdropCam.position.set(0, 0, 10);

  const silkVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const silkFragmentShader = `
    uniform float uTime;
    uniform float uSpeed;
    uniform float uBaseOpacity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;

    void main() {
      // Soft Gaussian core across ribbon thickness (zero hard tube edges)
      float crossDist = abs(vUv.y - 0.5) * 2.0;
      float core = pow(max(0.0, 1.0 - crossDist), 3.4);
      float halo = pow(max(0.0, 1.0 - crossDist), 1.35) * 0.35;

      // Full-bleed horizontal smooth feathering
      float hFade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);

      // Travelling soft champagne/cyan energy shimmer wave
      float pulse = 0.65 + 0.35 * sin(vUv.x * 10.0 - uTime * uSpeed);
      float highlight = pow(max(0.0, sin(vUv.x * 5.0 - uTime * (uSpeed * 0.7))), 6.0) * 0.45;

      vec3 col = mix(uColorA, uColorB, clamp(vUv.x * 0.8 + highlight * 0.4, 0.0, 1.0));
      float alpha = (core + halo + highlight * core) * hFade * pulse * uBaseOpacity;
      gl_FragColor = vec4(col, alpha);
    }
  `;

  const waveConfigs = [
    {
      width: 24,
      height: 0.72,
      yOffset: -0.92,
      amp: 0.34,
      freq: 2.2,
      phase: 0.2,
      z: 0.1,
      speed: 1.15,
      opacity: 0.42,
      colorA: '#fbbf24',
      colorB: '#fde68a',
    },
    {
      width: 24,
      height: 0.9,
      yOffset: -1.18,
      amp: 0.28,
      freq: 1.7,
      phase: 1.8,
      z: -0.2,
      speed: 0.85,
      opacity: 0.34,
      colorA: '#38bdf8',
      colorB: '#bae6fd',
    },
    {
      width: 24,
      height: 0.52,
      yOffset: -0.68,
      amp: 0.22,
      freq: 2.8,
      phase: 3.1,
      z: 0.2,
      speed: 1.35,
      opacity: 0.26,
      colorA: '#f8fafc',
      colorB: '#fde68a',
    },
  ];

  const silkUniforms: Array<{ uTime: { value: number } }> = [];
  waveConfigs.forEach((cfg) => {
    const geom = track(
      createSilkWaveGeometry(cfg.width, cfg.height, cfg.yOffset, cfg.amp, cfg.freq, cfg.phase),
    );
    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: cfg.speed },
      uBaseOpacity: { value: cfg.opacity },
      uColorA: { value: new THREE.Color(cfg.colorA) },
      uColorB: { value: new THREE.Color(cfg.colorB) },
    };
    silkUniforms.push(uniforms);

    const mat = track(
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: silkVertexShader,
        fragmentShader: silkFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = cfg.z;
    backdropScene.add(mesh);
  });

  // Subtle soft bokeh motes drifting smoothly along the lower light wave
  const MOTE_COUNT = 28;
  const moteGeo = track(new THREE.SphereGeometry(0.032, 10, 10));
  const moteMat = track(
    new THREE.MeshBasicMaterial({
      color: '#fde68a',
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    }),
  );
  const moteInstanced = new THREE.InstancedMesh(moteGeo, moteMat, MOTE_COUNT);
  moteInstanced.frustumCulled = false;
  const moteStates = Array.from({ length: MOTE_COUNT }, (_, i) => ({
    x: ((i / MOTE_COUNT) * 20) - 10,
    y: -0.95 + Math.sin(i * 4.7) * 0.55,
    z: Math.cos(i * 2.9) * 0.9,
    speed: 0.22 + (i % 4) * 0.06,
    amp: 0.08 + (i % 3) * 0.04,
    phase: i * 1.1,
    scale: 0.45 + (i % 3) * 0.25,
  }));
  backdropScene.add(moteInstanced);

  // ============================================================================
  // SUB-SCENE 2: OFFICIAL THREE.JS BLUE MARBLE GLOBE (NASA EARTH + CLOUDS)
  // ============================================================================
  const globeScene = new THREE.Scene();
  globeScene.environment = envRT.texture;
  const globeCam = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  globeCam.position.set(0, 0.18, 4.15);
  globeCam.lookAt(0, 0, 0);

  const globeHemisphere = new THREE.HemisphereLight('#e0f2fe', '#0f172a', 1.25);
  const globeKey = new THREE.DirectionalLight('#fffdf5', 2.8);
  globeKey.position.set(4.5, 2.5, 5.2);
  const globeRim = new THREE.DirectionalLight('#38bdf8', 1.45);
  globeRim.position.set(-5.0, -1.5, -2.5);
  globeScene.add(globeHemisphere, globeKey, globeRim);

  const globeGroup = new THREE.Group();
  globeGroup.rotation.z = THREE.MathUtils.degToRad(16);
  globeGroup.rotation.x = THREE.MathUtils.degToRad(12);
  globeGroup.rotation.y = THREE.MathUtils.degToRad(-100); // Start facing Americas / Atlantic
  globeScene.add(globeGroup);

  const texLoader = new THREE.TextureLoader();
  const maxAniso = isSoftwareGl ? 1 : Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const loadPlanetTex = (url: string, isColor: boolean, onLoaded?: () => void): THREE.Texture => {
    const tex = texLoader.load(url, onLoaded);
    if (isColor) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAniso;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return track(tex);
  };

  const earthGeo = track(new THREE.SphereGeometry(1, 64, 48));
  const earthMat = track(
    new THREE.MeshPhongMaterial({
      color: new THREE.Color('#1d4ed8'),
      emissive: new THREE.Color('#0c4a6e'),
      emissiveIntensity: 0.32,
      normalScale: new THREE.Vector2(0.85, 0.85),
      specular: new THREE.Color('#7dd3fc'),
      shininess: 22,
    }),
  );

  const earthColorTex = loadPlanetTex('/aether-clean/assets/three-earth/earth_atmos_2048.jpg', true, () => {
    if (disposed) return;
    earthMat.map = earthColorTex;
    earthMat.color.set('#ffffff');
    earthMat.emissive.set('#000000');
    earthMat.emissiveIntensity = 0;
    earthMat.needsUpdate = true;
    canvasEl.style.opacity = '1';
  });
  const earthNormalTex = loadPlanetTex('/aether-clean/assets/three-earth/earth_normal_2048.jpg', false, () => {
    if (disposed) return;
    earthMat.normalMap = earthNormalTex;
    earthMat.needsUpdate = true;
  });
  const earthSpecTex = loadPlanetTex('/aether-clean/assets/three-earth/earth_specular_2048.jpg', false, () => {
    if (disposed) return;
    earthMat.specularMap = earthSpecTex;
    earthMat.needsUpdate = true;
  });
  const earthCloudsTex = loadPlanetTex('/aether-clean/assets/three-earth/earth_clouds_1024.png', true);

  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  globeGroup.add(earthMesh);

  // Real cloud layer from official three.js cloud texture
  const cloudGeo = track(new THREE.SphereGeometry(1.015, 56, 40));
  const cloudMat = track(
    new THREE.MeshLambertMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
    }),
  );
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  globeGroup.add(cloudMesh);

  // Subtle atmospheric Fresnel rim halo
  const atmoGeo = track(new THREE.SphereGeometry(1.11, 48, 32));
  const atmoMat = track(
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#60a5fa') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPos = -mv.xyz;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vViewPos;
        void main() {
          float rim = pow(clamp(0.72 + dot(normalize(vNormal), normalize(vViewPos)), 0.0, 1.0), 3.4);
          gl_FragColor = vec4(uColor, rim * 0.65);
        }
      `,
    }),
  );
  globeGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

  // City hubs + delicate sonar rings + curved orbital signal arcs matching Three.js globe scale
  const hubs = [
    { lat: 37.77, lng: -122.42 }, // SF
    { lat: 40.71, lng: -74.01 },  // NYC
    { lat: 51.5, lng: -0.12 },    // London
    { lat: 48.85, lng: 2.35 },    // Paris
    { lat: 25.2, lng: 55.27 },    // Dubai
    { lat: 35.67, lng: 139.65 },  // Tokyo
    { lat: 1.35, lng: 103.82 },   // Singapore
    { lat: -33.86, lng: 151.2 },  // Sydney
    { lat: -23.55, lng: -46.63 }, // Sao Paulo
  ];

  const hubVecs = hubs.map((h) => latLngToVec3(h.lat, h.lng, 1.02));
  const nodeGeo = track(new THREE.SphereGeometry(0.022, 10, 10));
  const nodeMat = track(new THREE.MeshBasicMaterial({ color: '#fef9c3' }));
  const pulseRingGeo = track(new THREE.RingGeometry(0.026, 0.042, 24));
  const pulseRings: Array<{ mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }> = [];

  hubVecs.forEach((pos, idx) => {
    const dot = new THREE.Mesh(nodeGeo, nodeMat);
    dot.position.copy(pos);
    globeGroup.add(dot);

    const rMat = track(
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const ring = new THREE.Mesh(pulseRingGeo, rMat);
    ring.position.copy(pos).multiplyScalar(1.01);
    ring.lookAt(pos.clone().multiplyScalar(2));
    globeGroup.add(ring);
    pulseRings.push({ mesh: ring, mat: rMat, phase: idx * 0.7 });
  });

  const arcPairs: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [1, 8],
    [3, 6],
  ];
  const arcPackets: Array<{ curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; speed: number; offset: number }> = [];
  const arcPulseGeo = track(new THREE.SphereGeometry(0.018, 10, 10));

  arcPairs.forEach(([aIdx, bIdx], idx) => {
    const start = hubVecs[aIdx];
    const end = hubVecs[bIdx];
    const dist = start.distanceTo(end);
    const mid = _vec3A
      .copy(start)
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(1.03 + dist * 0.28)
      .clone();

    const curve = new THREE.QuadraticBezierCurve3(start.clone(), mid, end.clone());
    const arcGeo = track(new THREE.TubeGeometry(curve, 32, 0.0055, 6, false));
    const arcMat = track(
      new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? '#fef08a' : '#e0f2fe',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    );
    globeGroup.add(new THREE.Mesh(arcGeo, arcMat));

    const pMat = track(new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    const pMesh = new THREE.Mesh(arcPulseGeo, pMat);
    globeGroup.add(pMesh);
    arcPackets.push({ curve, mesh: pMesh, speed: 0.3 + (idx % 3) * 0.1, offset: idx * 0.21 });
  });

  // Delicate outer orbital rings around the photoreal Earth
  const outerRingGroup = new THREE.Group();
  globeScene.add(outerRingGroup);

  const ringSpecs = [
    { radius: 1.22, rotX: 1.15, rotY: 0.35, color: '#bae6fd', opacity: 0.42 },
    { radius: 1.31, rotX: -0.95, rotY: -0.45, color: '#fef08a', opacity: 0.32 },
  ];
  const satellites: Array<{ mesh: THREE.Mesh; radius: number; rotX: number; rotY: number; speed: number }> = [];
  const satGeo = track(new THREE.SphereGeometry(0.024, 10, 10));

  ringSpecs.forEach((spec, idx) => {
    const tGeo = track(new THREE.TorusGeometry(spec.radius, 0.0045, 8, 96));
    const tMat = track(
      new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity,
        depthWrite: false,
      }),
    );
    const ringMesh = new THREE.Mesh(tGeo, tMat);
    ringMesh.rotation.set(spec.rotX, spec.rotY, 0);
    outerRingGroup.add(ringMesh);

    const sMat = track(new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    const sMesh = new THREE.Mesh(satGeo, sMat);
    outerRingGroup.add(sMesh);
    satellites.push({
      mesh: sMesh,
      radius: spec.radius,
      rotX: spec.rotX,
      rotY: spec.rotY,
      speed: idx === 0 ? 0.85 : -0.65,
    });
  });

  // ============================================================================
  // SUB-SCENE 3: 5 SCULPTED 3D METALLIC GOLD STARS + SPARKLE ORBIT
  // ============================================================================
  const starsScene = new THREE.Scene();
  starsScene.environment = envRT.texture;
  const starsCam = new THREE.PerspectiveCamera(34, 4, 0.1, 50);
  starsCam.position.set(0, 0, 3.85);
  starsCam.lookAt(0, 0, 0);

  const starHemi = new THREE.HemisphereLight('#ffffff', '#78350f', 1.4);
  const starKey = new THREE.DirectionalLight('#fffbeb', 2.8);
  starKey.position.set(3, 4, 5);
  const starRim = new THREE.DirectionalLight('#fde68a', 1.6);
  starRim.position.set(-4, -2, 3);
  starsScene.add(starHemi, starKey, starRim);

  const starGeom = track(createStarGeometry());
  const starGoldMat = track(
    new THREE.MeshPhysicalMaterial({
      color: '#fbbf24',
      emissive: '#92400e',
      emissiveIntensity: 0.24,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    }),
  );
  const starPartialMat = track(
    new THREE.MeshPhysicalMaterial({
      color: '#fde68a',
      emissive: '#78350f',
      emissiveIntensity: 0.18,
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 1.0,
    }),
  );

  const starMeshes: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(starGeom, i === 4 ? starPartialMat : starGoldMat);
    mesh.position.set((i - 2) * 0.98, 0, 0);
    starsScene.add(mesh);
    starMeshes.push(mesh);
  }

  const STAR_SPARKLES = 16;
  const sparkleGeo = track(new THREE.OctahedronGeometry(0.028, 0));
  const sparkleMat = track(
    new THREE.MeshBasicMaterial({
      color: '#fef08a',
      transparent: true,
      opacity: 0.78,
    }),
  );
  const sparkleInstanced = new THREE.InstancedMesh(sparkleGeo, sparkleMat, STAR_SPARKLES);
  sparkleInstanced.frustumCulled = false;
  starsScene.add(sparkleInstanced);

  let pointerX = 0;
  let pointerY = 0;
  let smoothPX = 0;
  let smoothPY = 0;
  const onPointerMove = (e: PointerEvent) => {
    const rect = slots.container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const syncSize = () => {
    const cw = Math.max(1, Math.floor(slots.container.clientWidth));
    const ch = Math.max(1, Math.floor(slots.container.clientHeight));
    renderer.setSize(cw, ch, false);
  };
  syncSize();
  const ro = new ResizeObserver(syncSize);
  ro.observe(slots.container);

  const renderScissorZone = (
    el: HTMLElement,
    rootRect: DOMRect,
    scene: THREE.Scene,
    cam: THREE.PerspectiveCamera,
  ) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    const x = r.left - rootRect.left;
    const yFromTop = r.top - rootRect.top;
    const yFromBottom = rootRect.height - (yFromTop + r.height);

    if (x + r.width < 0 || x > rootRect.width || yFromBottom + r.height < 0 || yFromBottom > rootRect.height) {
      return;
    }

    cam.aspect = r.width / r.height;
    cam.updateProjectionMatrix();
    renderer.setViewport(x, yFromBottom, r.width, r.height);
    renderer.setScissor(x, yFromBottom, r.width, r.height);
    renderer.setScissorTest(true);
    renderer.clearDepth();
    renderer.render(scene, cam);
  };

  let rafId = 0;
  let timerId = 0;
  let lastTime = performance.now();
  let elapsed = 0;

  const drawFrame = () => {
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    elapsed += dt;

    smoothPX = THREE.MathUtils.damp(smoothPX, pointerX, 4.5, dt);
    smoothPY = THREE.MathUtils.damp(smoothPY, pointerY, 4.5, dt);

    // 1. Update mature GLSL silk light waves + motes
    silkUniforms.forEach((u) => {
      u.uTime.value = elapsed;
    });
    for (let i = 0; i < MOTE_COUNT; i++) {
      const m = moteStates[i];
      const mx = ((m.x + elapsed * m.speed + 10) % 20) - 10;
      const my = m.y + Math.sin(elapsed * 1.1 + m.phase) * m.amp;
      _dummy.position.set(mx, my, m.z);
      _dummy.scale.setScalar(m.scale * (0.75 + 0.25 * Math.sin(elapsed * 2.2 + m.phase)));
      _dummy.updateMatrix();
      moteInstanced.setMatrixAt(i, _dummy.matrix);
    }
    moteInstanced.instanceMatrix.needsUpdate = true;

    // 2. Rotate photoreal Earth Globe, clouds, radar pulses, network packets & orbital rings
    globeGroup.rotation.y += dt * 0.22;
    globeGroup.rotation.x = THREE.MathUtils.degToRad(12) - smoothPY * 0.1;
    cloudMesh.rotation.y += dt * 0.065;
    outerRingGroup.rotation.y += dt * 0.12;
    outerRingGroup.rotation.x = smoothPY * 0.07;
    outerRingGroup.rotation.z = -smoothPX * 0.05;

    pulseRings.forEach((p) => {
      const cycle = (elapsed * 0.6 + p.phase) % 1;
      const s = 0.8 + cycle * 2.1;
      p.mesh.scale.setScalar(s);
      p.mat.opacity = (1 - cycle) * 0.62;
    });

    arcPackets.forEach((p) => {
      const t = (elapsed * p.speed + p.offset) % 1;
      p.curve.getPointAt(t, p.mesh.position);
    });

    satellites.forEach((sat, idx) => {
      const a = elapsed * sat.speed + idx * 2.1;
      _vec3B.set(Math.cos(a) * sat.radius, Math.sin(a) * sat.radius, 0);
      _vec3B.applyEuler(new THREE.Euler(sat.rotX, sat.rotY, 0));
      sat.mesh.position.copy(_vec3B);
    });

    // 3. Animate 5 sculpted 3D Gold Stars + golden sparkle orbit
    starMeshes.forEach((star, i) => {
      const wavePhase = elapsed * 2.2 - i * 0.45;
      const waveBoost = Math.pow(Math.max(0, Math.sin(wavePhase)), 6) * 0.16;
      star.rotation.y = Math.sin(elapsed * 1.1 + i * 0.55) * 0.38 + smoothPX * 0.22;
      star.rotation.x = Math.cos(elapsed * 0.9 + i * 0.4) * 0.12 - smoothPY * 0.16;
      star.position.y = Math.sin(elapsed * 1.8 + i * 0.7) * 0.07;
      star.scale.setScalar(1.0 + waveBoost);
    });

    for (let i = 0; i < STAR_SPARKLES; i++) {
      const a = elapsed * (0.85 + (i % 3) * 0.3) + i * 1.3;
      const sx = Math.cos(a * 0.7 + i) * 2.4;
      const sy = Math.sin(a * 1.3 + i * 2) * 0.46;
      const sz = Math.sin(a * 0.9) * 0.42;
      _dummy.position.set(sx, sy, sz);
      _dummy.rotation.set(a, a * 0.7, 0);
      _dummy.scale.setScalar(0.5 + 0.4 * Math.sin(elapsed * 3.2 + i));
      _dummy.updateMatrix();
      sparkleInstanced.setMatrixAt(i, _dummy.matrix);
    }
    sparkleInstanced.instanceMatrix.needsUpdate = true;

    const rootRect = slots.container.getBoundingClientRect();
    if (rootRect.width > 0 && rootRect.height > 0) {
      renderer.setScissorTest(false);
      renderer.clear();

      backdropCam.aspect = rootRect.width / rootRect.height;
      backdropCam.updateProjectionMatrix();
      renderer.setViewport(0, 0, rootRect.width, rootRect.height);
      renderer.render(backdropScene, backdropCam);

      renderScissorZone(slots.globeSlot, rootRect, globeScene, globeCam);
      renderScissorZone(slots.starsSlot, rootRect, starsScene, starsCam);
    }

    if (disposed) return;

    if (isSoftwareGl) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const state = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
          if (state === gl.UNSIGNALED) {
            timerId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            timerId = window.setTimeout(() => {
              if (!disposed) drawFrame();
            }, 80);
          }
        };
        timerId = window.setTimeout(poll, 5);
        return;
      }
    }

    rafId = requestAnimationFrame(drawFrame);
  };

  if (typeof renderer.compile === 'function' && !isSoftwareGl) {
    try {
      renderer.compile(globeScene, globeCam);
      renderer.compile(starsScene, starsCam);
      renderer.compile(backdropScene, backdropCam);
    } catch {
      // safe no-op
    }
  }

  rafId = requestAnimationFrame(drawFrame);

  return {
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      disposables.forEach((d) => {
        try {
          d.dispose();
        } catch {
          // safe dispose
        }
      });
      renderer.dispose();
      if (canvasEl.parentNode === slots.container) {
        slots.container.removeChild(canvasEl);
      }
    },
  };
}
