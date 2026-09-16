import React, { useEffect, useRef } from 'react';

export const HeroCanvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.4;
    let rotY = 0.6;
    let time = 0;

    // Responsive resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width && entry.contentRect.height) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          width = entry.contentRect.width;
          height = entry.contentRect.height;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.resetTransform();
          ctx.scale(dpr, dpr);
        }
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Interactive mouse track relative to hero center
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      targetRotY = (clientX / width) * 0.8;
      targetRotX = -(clientY / height) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Geometric vertices for a multi-layered 3D icosahedron / geodesic sphere
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Normalize and scale
    const radius = Math.min(width, height) * 0.28;
    const vertices = baseVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * radius, (y / len) * radius, (z / len) * radius] as [number, number, number];
    });

    // Generate connecting edges (distance threshold)
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // Dynamic orbital particles representing continuous growth
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, (_, idx) => {
      const angle = (idx / particleCount) * Math.PI * 2;
      const orbRadius = radius * (1.1 + (idx % 3) * 0.18);
      const speed = 0.008 + (idx % 4) * 0.004;
      const tilt = ((idx % 3) - 1) * 0.45;
      return { angle, orbRadius, speed, tilt, size: 2 + (idx % 3) };
    });

    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += 0.012;
        rotX += (targetRotX - rotX) * 0.06 + 0.002;
        rotY += (targetRotY - rotY) * 0.06 + 0.005;
      }

      const cx = width / 2;
      const cy = height / 2;
      const fov = 450;

      // Soft ambient background aura
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.6);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
      grad.addColorStop(1, 'rgba(8, 11, 17, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Matrix rotation helper
      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);

      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;
        // 3D perspective projection
        const scale = fov / (fov + z2 + 200);
        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          scale,
          z: z2,
        };
      };

      // Project vertices
      const projected = vertices.map(([vx, vy, vz]) => project(vx, vy, vz));

      // Draw subtle orbital guide rings
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2; a += 0.1) {
        const ringR = radius * 1.35;
        const rx = Math.cos(a) * ringR;
        const rz = Math.sin(a) * ringR;
        const pt = project(rx, 0, rz);
        if (a === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Draw edges with depth-based opacity
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.08, Math.min(0.65, (avgZ + radius) / (radius * 2)));

        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Draw node points
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3.2 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // Glowing core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, 1.4 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render orbiting data nodes (symbolizing dynamic business growth)
      particles.forEach((pt) => {
        if (!prefersReducedMotion) {
          pt.angle += pt.speed;
        }
        const px = Math.cos(pt.angle) * pt.orbRadius;
        const pz = Math.sin(pt.angle) * pt.orbRadius;
        const py = Math.sin(pt.angle * 2) * (pt.orbRadius * pt.tilt);

        const proj = project(px, py, pz);
        const alpha = Math.max(0.15, Math.min(0.9, (proj.z + pt.orbRadius) / (pt.orbRadius * 2)));

        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, pt.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-auto"
        aria-label="Interactive 3D geometry representing KEAGROW technology and business growth"
      />
      {/* Floating status tag */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#0f141f]/90 backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-full text-xs font-mono text-emerald-400 flex items-center gap-2 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
        <span>Interactive 3D Engine • Live</span>
      </div>
    </div>
  );
};
