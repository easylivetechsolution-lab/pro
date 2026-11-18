import React, { Component, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STORY_SPACES, type StorySpaceStage } from '../lib/storySpaces';

gsap.registerPlugin(ScrollTrigger);

interface StoryWorldCanvasProps {
  activeView: 'landing' | 'crm';
  scrollProgressRef: React.MutableRefObject<number>;
}

const _pointerVec = new THREE.Vector2(0, 0);
const _smoothPointer = new THREE.Vector2(0, 0);

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const PointerParallaxRig: React.FC = () => {
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    _smoothPointer.x = THREE.MathUtils.damp(_smoothPointer.x, _pointerVec.x, 5.0, dt);
    _smoothPointer.y = THREE.MathUtils.damp(_smoothPointer.y, _pointerVec.y, 5.0, dt);
  });
  return null;
};

interface FullscreenSpaceStageProps {
  stage: StorySpaceStage;
  index: number;
  total: number;
  activeView: 'landing' | 'crm';
  scrollProgressRef: React.MutableRefObject<number>;
}

const FullscreenSpaceStage: React.FC<FullscreenSpaceStageProps> = ({
  stage,
  index,
  total,
  activeView,
  scrollProgressRef,
}) => {
  const { gl, size, camera } = useThree();
  const meshRef = useRef<THREE.Mesh | null>(null);
  const matRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [imgAspect, setImgAspect] = useState(16 / 9);
  const smoothProgressRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      stage.imageUrl,
      (loaded) => {
        if (!mounted) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
        loaded.minFilter = THREE.LinearMipmapLinearFilter;
        loaded.magFilter = THREE.LinearFilter;
        if (loaded.image && loaded.image.width && loaded.image.height) {
          setImgAspect(loaded.image.width / loaded.image.height);
        }
        setTexture(loaded);
      },
      undefined,
      () => {},
    );
    return () => {
      mounted = false;
    };
  }, [stage.imageUrl, gl]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;

    // Defer rendering plane until photo texture finishes uploading so CSS layer beneath shows seamlessly
    if (!texture) {
      mesh.visible = false;
      return;
    }

    const dt = Math.min(delta, 0.05);
    const targetProgress =
      activeView === 'crm' ? 0.0 : Math.max(0, Math.min(1, scrollProgressRef.current));
    smoothProgressRef.current = THREE.MathUtils.damp(
      smoothProgressRef.current,
      targetProgress,
      5.5,
      dt,
    );

    const continuousStage = smoothProgressRef.current * (total - 1);
    const distFromStage = continuousStage - index;

    if (distFromStage <= -1.0 || distFromStage >= 1.05) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    const opacity =
      distFromStage < 0
        ? THREE.MathUtils.smoothstep(1 + distFromStage, 0.04, 0.96)
        : 1.0;
    mat.opacity = opacity;

    const baseDist = 10.0;
    const forwardPush = THREE.MathUtils.clamp(distFromStage, -1, 1) * 2.2;
    const depthDist = baseDist - forwardPush;

    const perspCam = camera as THREE.PerspectiveCamera;
    const vFovRad = THREE.MathUtils.degToRad(perspCam.fov || 45);
    const visibleHeight = 2 * depthDist * Math.tan(vFovRad / 2);
    const viewportAspect = size.width / Math.max(1, size.height);
    const visibleWidth = visibleHeight * viewportAspect;

    const coverH = Math.max(visibleHeight, visibleWidth / imgAspect) * 1.12;
    const coverW = coverH * imgAspect;

    mesh.scale.set(coverW, coverH, 1);
    mesh.position.set(
      -_smoothPointer.x * 0.35 + distFromStage * (index % 2 === 0 ? -0.35 : 0.35),
      -_smoothPointer.y * 0.22,
      -depthDist,
    );
    mesh.rotation.y = _smoothPointer.x * 0.025;
    mesh.rotation.x = -_smoothPointer.y * 0.018;
    mesh.renderOrder = index;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} visible={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={matRef}
        map={texture ?? undefined}
        color="#ffffff"
        transparent
        opacity={index === 0 ? 1 : 0}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export const StoryWorldCanvas: React.FC<StoryWorldCanvasProps> = ({
  activeView,
  scrollProgressRef,
}) => {
  const [webglActive, setWebglActive] = useState(true);
  const bgImgRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      _pointerVec.x = (e.clientX / window.innerWidth) * 2 - 1;
      _pointerVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const syncCssBackdrop = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const continuousStage = clamped * (STORY_SPACES.length - 1);
      bgImgRefs.current.forEach((img, index) => {
        if (!img) return;
        const dist = continuousStage - index;
        if (dist <= -1.0 || dist >= 1.15) {
          img.style.opacity = '0';
          return;
        }
        const op =
          dist < 0 ? THREE.MathUtils.smoothstep(1 + dist, 0.04, 0.96) : 1.0;
        img.style.opacity = op.toFixed(3);
      });
    };

    if (activeView !== 'landing') {
      syncCssBackdrop(0);
      return;
    }

    const scrollerEl = document.getElementById('story-scroll-root');
    if (!scrollerEl) return;

    syncCssBackdrop(scrollProgressRef.current);

    const trigger = ScrollTrigger.create({
      trigger: scrollerEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.75,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        syncCssBackdrop(self.progress);
      },
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(scrollerEl);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [activeView, scrollProgressRef]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none bg-slate-900 overflow-hidden"
    >
      {/* Persistent CSS architectural backdrop so scrolling/WebGL transitions never flash white */}
      {STORY_SPACES.map((stage, index) => (
        <img
          key={stage.id}
          ref={(el) => {
            bgImgRefs.current[index] = el;
          }}
          src={stage.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-75"
          style={{
            opacity: index === 0 ? 1 : 0,
            zIndex: index,
          }}
        />
      ))}

      {webglActive && (
        <div className="absolute inset-0 z-10">
          <WebGLErrorBoundary onError={() => setWebglActive(false)}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 0] }}
              gl={{
                antialias: false,
                powerPreference: 'default',
                alpha: true,
              }}
              onCreated={({ gl }) => {
                gl.outputColorSpace = THREE.SRGBColorSpace;
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.04;
                gl.setClearColor(0x000000, 0);
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  setWebglActive(false);
                });
              }}
            >
              <PointerParallaxRig />

              {STORY_SPACES.map((stage, index) => (
                <FullscreenSpaceStage
                  key={stage.id}
                  stage={stage}
                  index={index}
                  total={STORY_SPACES.length}
                  activeView={activeView}
                  scrollProgressRef={scrollProgressRef}
                />
              ))}
            </Canvas>
          </WebGLErrorBoundary>
        </div>
      )}
    </div>
  );
};
