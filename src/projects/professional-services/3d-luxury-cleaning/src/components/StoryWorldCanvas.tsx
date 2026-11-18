import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StoryWorldCanvasProps {
  activeView: 'landing' | 'crm';
  scrollProgressRef: React.MutableRefObject<number>;
}

export const StoryWorldCanvas: React.FC<StoryWorldCanvasProps> = ({
  activeView,
  scrollProgressRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Subtle Architectural Ambient Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    // Floating 3D Architectural Geometry (Glass Chrome Torus Knot)
    const geom = new THREE.TorusKnotGeometry(1.4, 0.35, 128, 32);
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const knot = new THREE.Mesh(geom, mat);
    knot.position.set(3.2, 0.5, 0);
    scene.add(knot);

    // Inner Wireframe Accent
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireKnot = new THREE.Mesh(geom, wireMat);
    wireKnot.scale.set(1.02, 1.02, 1.02);
    knot.add(wireKnot);

    // Sparkling Ambient Micro-Particles (Sanitization Atmosphere)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Animation & Scroll Response
    let animId: number;
    let clock = new THREE.Clock();

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollProgressRef.current = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle floating and rotation
      knot.rotation.x = time * 0.18;
      knot.rotation.y = time * 0.22;
      knot.position.y = 0.5 + Math.sin(time * 0.8) * 0.15;

      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      wireMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
        activeView === 'crm' ? 'opacity-0' : 'opacity-100'
      }`}
    />
  );
};
