import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { CrmSnapshot, ServiceType } from '../types/cleaning';

interface CrmThreeAnalyticsProps {
  snapshot: CrmSnapshot | null;
}

interface BarSpec {
  id: string;
  label: string;
  category: 'Pipeline' | 'Booked' | 'Referrals';
  value: number;
  count: number;
  color: number;
  x: number;
  z: number;
}

interface BarMeshRef {
  mesh: THREE.Mesh;
  baseMat: THREE.MeshPhysicalMaterial;
  spec: BarSpec;
  currentHeight: number;
  targetHeight: number;
}

const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();

export const CrmThreeAnalytics: React.FC<CrmThreeAnalyticsProps> = ({ snapshot }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredBar, setHoveredBar] = useState<BarSpec | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const barSpecs = useMemo<BarSpec[]>(() => {
    const leads = snapshot?.leads ?? [];
    const bookings = snapshot?.bookings ?? [];
    const customers = snapshot?.customers ?? [];

    const sumLeadsByService = (st: ServiceType) => {
      const items = leads.filter((l) => l.serviceType === st && l.status !== 'Archived');
      return {
        value: items.reduce((s, i) => s + i.estimatedPrice, 0),
        count: items.length,
      };
    };

    const sumBookingsByService = (st: ServiceType) => {
      const items = bookings.filter((b) => b.serviceType === st && b.status !== 'Cancelled');
      return {
        value: items.reduce((s, i) => s + i.totalPrice, 0),
        count: items.length,
      };
    };

    const refTotal = customers.reduce((s, c) => s + c.referralCredits, 0);
    const refCount = customers.reduce((s, c) => s + c.referralsCount, 0);

    const hLead = sumLeadsByService('home');
    const oLead = sumLeadsByService('office');
    const dLead = sumLeadsByService('deep');
    const mLead = sumLeadsByService('move-out');

    const hBook = sumBookingsByService('home');
    const oBook = sumBookingsByService('office');
    const dBook = sumBookingsByService('deep');
    const mBook = sumBookingsByService('move-out');

    return [
      { id: 'lead-home', label: 'Home Pipeline', category: 'Pipeline', ...hLead, color: 0x38bdf8, x: -3.0, z: -0.9 },
      { id: 'lead-office', label: 'Office Pipeline', category: 'Pipeline', ...oLead, color: 0x0ea5e9, x: -1.4, z: -0.9 },
      { id: 'lead-deep', label: 'Deep Pipeline', category: 'Pipeline', ...dLead, color: 0x0284c7, x: 0.2, z: -0.9 },
      { id: 'lead-move', label: 'Move-Out Pipeline', category: 'Pipeline', ...mLead, color: 0x0369a1, x: 1.8, z: -0.9 },

      { id: 'book-home', label: 'Home Booked', category: 'Booked', ...hBook, color: 0x34d399, x: -3.0, z: 0.9 },
      { id: 'book-office', label: 'Office Booked', category: 'Booked', ...oBook, color: 0x10b981, x: -1.4, z: 0.9 },
      { id: 'book-deep', label: 'Deep Booked', category: 'Booked', ...dBook, color: 0x059669, x: 0.2, z: 0.9 },
      { id: 'book-move', label: 'Move-Out Booked', category: 'Booked', ...mBook, color: 0x047857, x: 1.8, z: 0.9 },

      { id: 'ref-credits', label: 'Referral Credits', category: 'Referrals', value: refTotal, count: refCount, color: 0xf59e0b, x: 3.35, z: 0 },
    ];
  }, [snapshot]);

  const barSpecsRef = useRef<BarSpec[]>(barSpecs);
  useEffect(() => {
    barSpecsRef.current = barSpecs;
  }, [barSpecs]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      const isSoftwareGl = (() => {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      })();

      const renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const width = container.clientWidth || 720;
      const height = container.clientHeight || 340;
      renderer.setSize(width, height);
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0b1528);
      scene.fog = new THREE.Fog(0x0b1528, 12, 26);

      const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
      camera.position.set(0.6, 5.2, 8.6);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = !isSoftwareGl;
      controls.dampingFactor = 0.06;
      controls.autoRotate = !isSoftwareGl && !prefersReducedMotion;
      controls.autoRotateSpeed = 0.45;
      controls.minDistance = 5.5;
      controls.maxDistance = 14;
      controls.minPolarAngle = 0.35;
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.target.set(0.2, 0.9, 0);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      pmrem.dispose();

      scene.add(new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 1.1));
      const key = new THREE.DirectionalLight(0xfff9f0, 1.8);
      key.position.set(6, 10, 7);
      key.castShadow = !isSoftwareGl;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x38bdf8, 1.2);
      rim.position.set(-6, 5, -5);
      scene.add(rim);

      // Architectural Analytics Platform Deck
      const deck = new THREE.Mesh(
        new THREE.BoxGeometry(9.2, 0.24, 4.4),
        new THREE.MeshPhysicalMaterial({
          color: 0x111f38,
          roughness: 0.25,
          metalness: 0.4,
          clearcoat: 0.8,
        }),
      );
      deck.position.set(0.2, -0.14, 0);
      deck.receiveShadow = true;
      scene.add(deck);

      const grid = new THREE.GridHelper(9.0, 18, 0x1e3a5f, 0x162a47);
      grid.position.set(0.2, -0.01, 0);
      scene.add(grid);

      // Build 3D Live Data Bars
      const barGeo = new THREE.BoxGeometry(0.76, 1, 0.76);
      barGeo.translate(0, 0.5, 0); // Bottom-center pivot so scaling Y grows strictly upward

      const barRefs: BarMeshRef[] = [];
      const interactables: THREE.Mesh[] = [];

      barSpecsRef.current.forEach((spec) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: spec.color,
          roughness: 0.14,
          metalness: 0.25,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
          emissive: new THREE.Color(spec.color),
          emissiveIntensity: 0.14,
        });
        const mesh = new THREE.Mesh(barGeo, mat);
        mesh.position.set(spec.x, 0, spec.z);
        mesh.scale.set(1, 0.2, 1);
        mesh.castShadow = !isSoftwareGl;
        mesh.userData.barId = spec.id;
        scene.add(mesh);
        interactables.push(mesh);

        // Glowing base ring around each column
        const pad = new THREE.Mesh(
          new THREE.RingGeometry(0.42, 0.48, 24),
          new THREE.MeshBasicMaterial({ color: spec.color, side: THREE.DoubleSide, transparent: true, opacity: 0.45 }),
        );
        pad.rotation.x = -Math.PI / 2;
        pad.position.set(spec.x, 0.01, spec.z);
        scene.add(pad);

        barRefs.push({
          mesh,
          baseMat: mat,
          spec,
          currentHeight: 0.2,
          targetHeight: 1.0,
        });
      });

      // Live Conversion Spline Arcs + Flowing Telemetry Pulses
      const arcCurves = [
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-3.0, 0.8, -0.9),
          new THREE.Vector3(-1.5, 2.5, 0),
          new THREE.Vector3(0.2, 1.0, 0.9),
        ]),
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-1.4, 1.0, -0.9),
          new THREE.Vector3(1.1, 2.8, -0.3),
          new THREE.Vector3(3.35, 1.2, 0),
        ]),
      ];

      const pulseNodes: Array<{ mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; offset: number }> = [];
      const pulseGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });

      arcCurves.forEach((curve, idx) => {
        const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.018, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: idx === 0 ? 0x38bdf8 : 0x34d399,
          transparent: true,
          opacity: 0.45,
        });
        scene.add(new THREE.Mesh(tubeGeo, tubeMat));

        for (let k = 0; k < 2; k++) {
          const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
          scene.add(pMesh);
          pulseNodes.push({ mesh: pMesh, curve, offset: k * 0.5 + idx * 0.25 });
        }
      });

      if (!isSoftwareGl) {
        renderer.compile(scene, camera);
      }

      let hoveredId: string | null = null;
      let lastRaycast = 0;

      const onPointerMove = (e: PointerEvent) => {
        const now = performance.now();
        if (now - lastRaycast < 45) return;
        lastRaycast = now;

        const rect = renderer.domElement.getBoundingClientRect();
        _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        _raycaster.setFromCamera(_pointer, camera);
        const hits = _raycaster.intersectObjects(interactables, false);
        if (hits.length > 0) {
          const id = String(hits[0].object.userData.barId);
          hoveredId = id;
          const found = barSpecsRef.current.find((b) => b.id === id) || null;
          setHoveredBar(found);
          renderer.domElement.style.cursor = 'pointer';
        } else {
          if (hoveredId !== null) {
            hoveredId = null;
            setHoveredBar(null);
            renderer.domElement.style.cursor = 'grab';
          }
        }
      };

      renderer.domElement.addEventListener('pointermove', onPointerMove);

      const onResize = () => {
        if (!container) return;
        const nw = container.clientWidth || 720;
        const nh = container.clientHeight || 340;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener('resize', onResize);

      const clock = new THREE.Clock();
      let frameId = 0;
      let disposed = false;

      function afterDraw(cb: () => void) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (!gl || typeof gl.fenceSync !== 'function') {
          frameId = window.setTimeout(cb, 80);
          return;
        }
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      }

      const tick = () => {
        if (disposed) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();

        const latestSpecs = barSpecsRef.current;
        const maxVal = Math.max(400, ...latestSpecs.map((s) => s.value));

        for (let i = 0; i < barRefs.length; i++) {
          const ref = barRefs[i];
          const updated = latestSpecs.find((s) => s.id === ref.spec.id);
          if (updated) ref.spec = updated;

          const norm = 0.22 + (ref.spec.value / maxVal) * 2.5;
          ref.targetHeight = norm;
          ref.currentHeight = THREE.MathUtils.damp(ref.currentHeight, ref.targetHeight, 5.5, dt);
          ref.mesh.scale.y = ref.currentHeight;

          const isHov = hoveredId === ref.spec.id;
          ref.baseMat.emissiveIntensity = THREE.MathUtils.damp(
            ref.baseMat.emissiveIntensity,
            isHov ? 0.55 : 0.14,
            8,
            dt,
          );
        }

        for (let i = 0; i < pulseNodes.length; i++) {
          const node = pulseNodes[i];
          const t = (elapsed * 0.35 + node.offset) % 1;
          node.curve.getPointAt(t, node.mesh.position);
        }

        controls.update();
        renderer.render(scene, camera);

        if (prefersReducedMotion) return;
        if (isSoftwareGl) afterDraw(tick);
        else frameId = requestAnimationFrame(tick);
      };

      tick();

      return () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        controls.dispose();
        barGeo.dispose();
        pulseGeo.dispose();
        pulseMat.dispose();
        barRefs.forEach((b) => b.baseMat.dispose());
        envTex.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      setWebglFailed(true);
    }
  }, []);

  const topMetric = hoveredBar ?? barSpecs[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#0B1528] overflow-hidden text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-semibold text-sky-300">
            Interactive 3D Live Telemetry Deck
          </span>
          <h2 className="font-display text-sm font-bold text-white">
            Pipeline vs. Booked Revenue &amp; Referral Flow (Drag to Orbit · Hover Columns)
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-sky-300">
            <span className="h-2.5 w-2.5 rounded-sm bg-sky-400" aria-hidden="true" />
            Lead Pipeline
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" aria-hidden="true" />
            Confirmed Bookings
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" aria-hidden="true" />
            Referral Credits
          </span>
        </div>
      </div>

      {webglFailed ? (
        <div className="h-72 flex items-center justify-center text-xs text-slate-400">
          3D analytics deck unavailable in this browser context.
        </div>
      ) : (
        <div ref={mountRef} className="w-full h-72 md:h-80" />
      )}

      {/* Live Inspection Strip below canvas */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 bg-slate-950/80 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{topMetric?.label}</span>
          <span className="text-slate-400">({topMetric?.category})</span>
        </div>
        <div className="flex items-center gap-5 font-mono tabular-nums">
          <span className="text-sky-300">
            Value: ${(topMetric?.value ?? 0).toLocaleString()}
          </span>
          <span className="text-slate-300">Records: {topMetric?.count ?? 0}</span>
        </div>
      </div>
    </div>
  );
};
