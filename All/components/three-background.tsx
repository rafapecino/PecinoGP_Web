"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeBackgroundProps = {
  className?: string;
  /** Color de las partículas principales. */
  color?: string;
  /** Número de partículas rojas (la capa blanca usa la mitad). */
  density?: number;
  /** Tamaño de cada partícula. */
  size?: number;
  /** Opacidad de las partículas (0-1). Súbela para hacerlas más visibles. */
  opacity?: number;
  /** Si true, las partículas reaccionan al hacer scroll (se mueven y se calman). */
  scrollReactive?: boolean;
};

/**
 * Fondo 3D sutil con three.js: un campo de partículas que rota lentamente y
 * hace parallax siguiendo el ratón. Pensado para ir DETRÁS del contenido
 * (pointer-events: none, opacidad baja). Libera recursos al desmontar y
 * respeta "prefers-reduced-motion".
 */
export default function ThreeBackground({
  className = "",
  color = "#dc2626",
  density = 600,
  size = 0.28,
  opacity = 0.65,
  scrollReactive = false,
}: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Capa principal (color de marca)
    const positions = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Capa secundaria (blanco tenue) para dar profundidad
    const count2 = Math.floor(density / 2);
    const positions2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 90;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 55;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    const mat2 = new THREE.PointsMaterial({
      color: 0xffffff,
      size: size * 0.45,
      transparent: true,
      opacity: opacity * 0.4,
      depthWrite: false,
    });
    const points2 = new THREE.Points(geo2, mat2);
    scene.add(points2);

    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    // Reactividad al scroll: acumula "velocidad" al deslizar y decae al parar.
    let scrollVel = 0;
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const s = window.scrollY;
      scrollVel += (s - lastScroll) * 0.0009;
      lastScroll = s;
    };
    if (scrollReactive) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04;
      points.rotation.x = Math.sin(t * 0.1) * 0.1;
      points2.rotation.y = -t * 0.02;

      // Las partículas reaccionan al scroll y se calman poco a poco.
      if (scrollReactive) {
        points.rotation.x += scrollVel;
        points2.rotation.x += scrollVel * 0.6;
        scrollVel *= 0.9;
      }

      // Parallax suave de cámara hacia el ratón
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (scrollReactive) window.removeEventListener("scroll", onScroll);
      geo.dispose();
      mat.dispose();
      geo2.dispose();
      mat2.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [color, density, size, opacity, scrollReactive]);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
