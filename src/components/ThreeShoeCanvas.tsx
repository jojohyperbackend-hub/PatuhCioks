import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SNEAKER_SHOWCASE_IMAGE } from '../data';

interface ThreeShoeCanvasProps {
  colorway?: 'phantom' | 'clay-lux' | 'moss-bio';
}

export default function ThreeShoeCanvas({ colorway = 'phantom' }: ThreeShoeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check for reduced motion or mobile on load
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (reducedMotion || isMobile) {
      setIsLowPower(true);
    }
  }, []);

  useEffect(() => {
    if (isLowPower || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- Three.js Setup ---
    const scene = new THREE.Scene();

    // Fog to give a cinematic, atmospheric depth
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.08);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap resolution for performance
    renderer.setSize(container.clientWidth, container.clientHeight);

    // --- Lighting (Strictly 1 directional light + 1 ambient light) ---
    // Ambient Light: cool slate blue
    const ambientLight = new THREE.AmbientLight(0x2d3a4f, 0.5);
    scene.add(ambientLight);

    // Directional Light: warm brassy gold highlight
    const dirLight = new THREE.DirectionalLight(0xe5c158, 2.2);
    dirLight.position.set(4, 5, 3);
    scene.add(dirLight);

    // --- Procedural Shoe Mesh Group ---
    const shoeGroup = new THREE.Group();

    // 1. Sole Material (Recycled heavy-tread rubber)
    const soleMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.9,
      metalness: 0.1,
    });

    // 2. Body Material (Depending on pillar/colorway)
    let bodyMat: THREE.Material;
    let accentMat: THREE.Material;
    let hardwareMat: THREE.Material;

    if (colorway === 'clay-lux') {
      bodyMat = new THREE.MeshStandardMaterial({
        color: 0xf5eedc, // Bone-white
        roughness: 0.5,
        metalness: 0.0,
      });
      accentMat = new THREE.MeshStandardMaterial({
        color: 0xcc8e5e, // Clay ochre
        roughness: 0.7,
        metalness: 0.0,
      });
      hardwareMat = new THREE.MeshStandardMaterial({
        color: 0xc9a054, // Matte brass/gold
        roughness: 0.4,
        metalness: 0.8,
      });
    } else if (colorway === 'moss-bio') {
      bodyMat = new THREE.MeshStandardMaterial({
        color: 0xdddbd1, // Unbleached linen
        roughness: 0.8,
        metalness: 0.0,
      });
      accentMat = new THREE.MeshStandardMaterial({
        color: 0x4e5e40, // Forest moss green
        roughness: 0.9,
        metalness: 0.0,
      });
      hardwareMat = new THREE.MeshStandardMaterial({
        color: 0x6e6255, // Sand/bark
        roughness: 0.8,
        metalness: 0.1,
      });
    } else {
      // 'phantom' - Default Street
      bodyMat = new THREE.MeshStandardMaterial({
        color: 0x181a1f, // Wet asphalt/dark gray
        roughness: 0.7,
        metalness: 0.2,
      });
      accentMat = new THREE.MeshStandardMaterial({
        color: 0x2b2f3a, // Charcoal blue-gray
        roughness: 0.8,
        metalness: 0.1,
      });
      hardwareMat = new THREE.MeshStandardMaterial({
        color: 0x050608, // Deep polished black
        roughness: 0.2,
        metalness: 0.9,
      });
    }

    // Geometries
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // Sole: Curved elongated box
    const soleGeo = new THREE.BoxGeometry(2.4, 0.25, 0.85, 4, 1, 2);
    geometriesToDispose.push(soleGeo);
    // Slight bending of the sole for orthopedic/aesthetic look
    const pos = soleGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // lift toe (right side positive x) and lift heel slightly
      if (x > 0.5) {
        pos.setY(i, y + (x - 0.5) * (x - 0.5) * 0.18);
      } else if (x < -0.5) {
        pos.setY(i, y + (x + 0.5) * (x + 0.5) * 0.08);
      }
    }
    soleGeo.computeVertexNormals();
    const soleMesh = new THREE.Mesh(soleGeo, soleMat);
    soleMesh.position.y = -0.4;
    shoeGroup.add(soleMesh);

    // Tread lines (Procedural sole lines)
    for (let j = -4; j <= 4; j++) {
      const treadGeo = new THREE.BoxGeometry(0.08, 0.15, 0.9);
      geometriesToDispose.push(treadGeo);
      const tread = new THREE.Mesh(treadGeo, soleMat);
      tread.position.set(j * 0.23, -0.48, 0);
      tread.rotation.z = -0.15;
      shoeGroup.add(tread);
    }

    // Main Shoe Upper Body (Procedural curves)
    const upperGeo = new THREE.BoxGeometry(1.6, 0.6, 0.8, 4, 2, 2);
    geometriesToDispose.push(upperGeo);
    const upperPos = upperGeo.attributes.position;
    for (let i = 0; i < upperPos.count; i++) {
      const x = upperPos.getX(i);
      const y = upperPos.getY(i);
      const z = upperPos.getZ(i);
      // Taper front toe
      if (x > 0) {
        upperPos.setY(i, y * (1.1 - x * 0.45));
        upperPos.setZ(i, z * (1.0 - x * 0.45));
      }
    }
    upperGeo.computeVertexNormals();
    const upperMesh = new THREE.Mesh(upperGeo, bodyMat);
    upperMesh.position.set(-0.1, -0.05, 0);
    shoeGroup.add(upperMesh);

    // Shoe Collar (Ankle neck)
    const collarGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.7, 16);
    geometriesToDispose.push(collarGeo);
    const collarMesh = new THREE.Mesh(collarGeo, accentMat);
    collarMesh.position.set(-0.4, 0.4, 0);
    collarMesh.rotation.z = -0.3; // Tilt back
    shoeGroup.add(collarMesh);

    // Shoe Tongue
    const tongueGeo = new THREE.BoxGeometry(0.8, 0.12, 0.42);
    geometriesToDispose.push(tongueGeo);
    const tongueMesh = new THREE.Mesh(tongueGeo, accentMat);
    tongueMesh.position.set(0.15, 0.28, 0);
    tongueMesh.rotation.z = 0.4;
    shoeGroup.add(tongueMesh);

    // Laces / Cross Straps
    const laceColor = colorway === 'clay-lux' ? 0x111317 : colorway === 'moss-bio' ? 0xdddbd1 : 0xcc8e5e;
    const laceMat = new THREE.MeshStandardMaterial({
      color: laceColor,
      roughness: 0.8,
    });
    for (let k = 0; k < 3; k++) {
      const strapGeo = new THREE.BoxGeometry(0.1, 0.04, 0.52);
      geometriesToDispose.push(strapGeo);
      const strap = new THREE.Mesh(strapGeo, laceMat);
      strap.position.set(0.02 + k * 0.2, 0.22 + k * 0.05, 0);
      strap.rotation.set(0.2, 0, -0.4);
      shoeGroup.add(strap);

      // Hardware hooks/eyelets
      const eyeletGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8);
      geometriesToDispose.push(eyeletGeo);
      const eyeletL = new THREE.Mesh(eyeletGeo, hardwareMat);
      eyeletL.position.set(0.02 + k * 0.2, 0.22 + k * 0.05, 0.26);
      eyeletL.rotation.x = Math.PI / 2;
      const eyeletR = eyeletL.clone();
      eyeletR.position.z = -0.26;
      shoeGroup.add(eyeletL, eyeletR);
    }

    // Heel Overlay / Mudguard
    const mudGeo = new THREE.BoxGeometry(1.0, 0.42, 0.82);
    geometriesToDispose.push(mudGeo);
    const mudMesh = new THREE.Mesh(mudGeo, accentMat);
    mudMesh.position.set(-0.55, -0.15, 0);
    shoeGroup.add(mudMesh);

    // Light Streak Loop (Atmospheric detail)
    // Create subtle vertical light lines
    const glowLines: THREE.Line[] = [];
    const lineMat = new THREE.LineBasicMaterial({
      color: colorway === 'phantom' ? 0x4f6b8c : 0xc9a054,
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < 4; i++) {
      const linePoints = [
        new THREE.Vector3((Math.random() - 0.5) * 4, -2.5, (Math.random() - 0.5) * 2),
        new THREE.Vector3((Math.random() - 0.5) * 4, 2.5, (Math.random() - 0.5) * 2)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      geometriesToDispose.push(lineGeo);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      glowLines.push(line);
    }

    // Center shoe and add to scene
    shoeGroup.position.set(0, 0, 0);
    shoeGroup.rotation.set(0.1, -0.6, 0);
    scene.add(shoeGroup);

    setIsReady(true);

    // --- Interaction & Scroll Mapping Variables ---
    let targetRotationY = -0.6;
    let targetRotationX = 0.1;
    let targetScale = 1.0;
    let currentRotationY = -0.6;
    let currentRotationX = 0.1;
    let currentScale = 1.0;

    const handleScroll = () => {
      const scrollFraction = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      // rotate shoe slowly up to 2.5 radians on Y based on scroll
      targetRotationY = -0.6 + scrollFraction * 3.5;
      targetRotationX = 0.1 - scrollFraction * 0.3;
      // shrink shoe slightly on deep scroll to fade out of the hero view
      targetScale = 1.0 - scrollFraction * 0.25;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle mouse move for micro hover tilt
    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) - 0.5;
      const yNorm = (e.clientY / window.innerHeight) - 0.5;
      // micro-tilt added to scroll targets
      shoeGroup.position.x = xNorm * 0.25;
      shoeGroup.position.y = -yNorm * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize Handler via ResizeObserver (Guideline requirement) ---
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width && height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth interpolation (lerp) for cinematic inertia
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentScale += (targetScale - currentScale) * 0.08;

      shoeGroup.rotation.y = currentRotationY;
      shoeGroup.rotation.x = currentRotationX;
      shoeGroup.scale.set(currentScale, currentScale, currentScale);

      // Add extremely subtle floating breath effect
      shoeGroup.position.y += Math.sin(elapsed * 1.5) * 0.0012;

      // Rotate lines very slowly
      glowLines.forEach((line, index) => {
        line.position.y += Math.sin(elapsed * 0.5 + index) * 0.002;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.unobserve(container);
      resizeObserver.disconnect();

      // Explicit memory disposal
      geometriesToDispose.forEach((geo) => geo.dispose());
      soleMat.dispose();
      bodyMat.dispose();
      accentMat.dispose();
      hardwareMat.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [isLowPower, colorway]);

  if (isLowPower) {
    return (
      <div 
        id="shoe-canvas-fallback"
        className="relative w-full h-full flex items-center justify-center bg-transparent"
      >
        <img
          src={SNEAKER_SHOWCASE_IMAGE}
          alt="PatuhCioks Cinematic Product Design Showcase"
          className="object-contain w-[80%] max-w-[450px] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none will-change-transform"
          style={{ transform: 'rotate(-12deg)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
          Interactive 3D Paused for Performance
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      id="shoe-canvas-container"
      className="relative w-full h-full select-none"
    >
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full block transition-opacity duration-1000 ${
          isReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-zinc-700 border-t-zinc-400 animate-spin" />
        </div>
      )}
    </div>
  );
}
