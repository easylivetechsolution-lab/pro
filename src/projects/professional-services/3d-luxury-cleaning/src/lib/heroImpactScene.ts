import * as THREE from 'three';

interface HeroSlots {
  container: HTMLDivElement;
  globeSlot: HTMLDivElement;
  starsSlot: HTMLDivElement;
}

interface HeroController {
  dispose: () => void;
}

/**
 * Mounts a lightweight Three.js globe scene into the hero strip.
 * Falls back to static CSS if WebGL is unavailable.
 */
export function mountHeroImpactScene(
  slots: HeroSlots,
  onFallback: () => void,
): HeroController {
  const { globeSlot, starsSlot } = slots;
  let disposed = false;

  // ── WebGL availability check ──
  const testCanvas = document.createElement('canvas');
  const gl =
    testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
  if (!gl) {
    onFallback();
    return { dispose: () => {} };
  }

  // ── Globe renderer ──
  let globeRenderer: THREE.WebGLRenderer | undefined;
  let globeScene: THREE.Scene | undefined;
  let globeCamera: THREE.PerspectiveCamera | undefined;
  let globeMesh: THREE.Mesh | undefined;
  let globeRaf = 0;

  try {
    globeRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'default',
    });
    globeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globeRenderer.setClearColor(0x000000, 0);
    const w = globeSlot.clientWidth || 196;
    const h = globeSlot.clientHeight || 196;
    globeRenderer.setSize(w, h);
    globeRenderer.domElement.style.cssText =
      'width:100%;height:100%;display:block;pointer-events:none;';
    globeSlot.appendChild(globeRenderer.domElement);

    globeScene = new THREE.Scene();
    globeCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    globeCamera.position.set(0, 0, 3.6);

    // Earth sphere
    const geo = new THREE.SphereGeometry(1, 48, 48);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      roughness: 0.55,
      metalness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.88,
    });
    globeMesh = new THREE.Mesh(geo, mat);
    globeScene.add(globeMesh);

    // Wire overlay for continent grid feel
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#0ea5e9'),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(geo.clone(), wireMat);
    wireMesh.scale.setScalar(1.012);
    globeScene.add(wireMesh);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    globeScene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(3, 2, 4);
    globeScene.add(dir);

    const renderer = globeRenderer;
    const scene = globeScene;
    const camera = globeCamera;
    const mesh = globeMesh;

    const animateGlobe = () => {
      if (disposed) return;
      globeRaf = requestAnimationFrame(animateGlobe);
      mesh.rotation.y += 0.003;
      wireMesh.rotation.y = mesh.rotation.y;
      renderer.render(scene, camera);
    };
    animateGlobe();
  } catch {
    onFallback();
    return { dispose: () => {} };
  }

  // ── Stars slot: 5 gold star SVGs (lightweight fallback, no second GL context) ──
  starsSlot.innerHTML = '';
  const starContainer = document.createElement('div');
  starContainer.style.cssText =
    'display:flex;align-items:center;justify-content:center;gap:6px;width:100%;height:100%;';
  for (let i = 0; i < 5; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '22');
    svg.setAttribute('height', '22');
    svg.setAttribute('fill', '#fbbf24');
    svg.innerHTML =
      '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>';
    svg.style.cssText = `filter:drop-shadow(0 1px 3px rgba(251,191,36,0.5));animation:hero-star-pop 0.5s ease ${i * 0.12}s both;`;
    starContainer.appendChild(svg);
  }
  starsSlot.appendChild(starContainer);

  // Inject keyframe once
  if (!document.getElementById('hero-star-keyframe')) {
    const style = document.createElement('style');
    style.id = 'hero-star-keyframe';
    style.textContent = `@keyframes hero-star-pop{0%{opacity:0;transform:scale(0.4) rotate(-15deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}`;
    document.head.appendChild(style);
  }

  return {
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(globeRaf);
      if (globeRenderer) {
        globeRenderer.dispose();
        if (globeRenderer.domElement.parentNode) {
          globeRenderer.domElement.parentNode.removeChild(
            globeRenderer.domElement,
          );
        }
      }
      if (globeMesh) {
        globeMesh.geometry.dispose();
        (globeMesh.material as THREE.Material).dispose();
      }
      starsSlot.innerHTML = '';
    },
  };
}
