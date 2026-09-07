import { useEffect, useRef } from "react";

/**
 * Scroll-driven fiery ribbon background.
 * Optimized with mobile adaptive quality & resolution scaling.
 */
export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let step = 0;
    let currentScrollY = 0;
    let targetScrollY = 0;
    let rafId = 0;

    const isMobile = window.innerWidth <= 768;

    function resize() {
      // Cap maximum internal canvas buffer resolution to prevent performance drops on 4K/High-DPI displays
      const maxW = isMobile ? 1280 : 1920;
      const maxH = isMobile ? 720 : 1080;
      const baseScale = isMobile ? 0.75 : 1;
      const rawW = window.innerWidth * baseScale;
      const rawH = window.innerHeight * baseScale;
      const scaleRatio = Math.min(1, maxW / rawW, maxH / rawH);

      width = canvas!.width = Math.floor(rawW * scaleRatio);
      height = canvas!.height = Math.floor(rawH * scaleRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function getPatternY(patternId: number, x: number, i: number, localStep: number) {
      if (patternId === 0) {
        const y1 = Math.sin(x * 0.0025 + localStep + i * 0.035) * 110;
        const y2 = Math.cos(x * 0.0012 - localStep * 0.4) * 130;
        return y1 + y2 + i * 4.5;
      } else if (patternId === 1) {
        const y1 = Math.sin(x * 0.005 - localStep * 1.2 + i * 0.02) * 180;
        const y2 = Math.cos((x + i * 20) * 0.003 + localStep) * 90;
        return y1 + y2 + i * 8.0;
      } else {
        const y1 = Math.sin(x * 0.008 + localStep * 2 + i * 0.05) * 60;
        const y2 = Math.cos(x * 0.002 - localStep) * 150;
        return y1 + y2 + i * 3.0;
      }
    }

    function drawSegmentedWaves(scrollY: number) {
      // Mobile performance tuning: fewer lines and larger step increments
      const lineCount = isMobile ? 20 : 36;
      const xStep = isMobile ? 28 : 22;

      const sectionSpacing = height * 1.0;
      const rawProgress = scrollY / sectionSpacing;
      const currentPatternIdx = Math.floor(rawProgress);
      const progressWithinSection = rawProgress - currentPatternIdx;

      let gapVisibility: number;
      if (currentPatternIdx === 0 && scrollY < height * 0.3) {
        gapVisibility = 1;
      } else {
        gapVisibility = Math.sin(
          Math.min(Math.max(progressWithinSection, 0), 1) * Math.PI
        );
      }
      const translateY = height * 0.45 - (progressWithinSection - 0.5) * height * 0.3;

      for (let i = 0; i < lineCount; i++) {
        ctx!.beginPath();

        const progress = i / (lineCount - 1);
        const baseAlpha = Math.pow(Math.sin(progress * Math.PI), 1.8) * (isMobile ? 0.65 : 0.55);
        const finalAlpha = baseAlpha * gapVisibility;
        if (finalAlpha <= 0.01) continue;

        ctx!.strokeStyle = `rgba(235, 60, 20, ${finalAlpha})`;
        ctx!.lineWidth = isMobile ? 1.5 : 1.2;

        for (let x = 0; x <= width; x += xStep) {
          const waveY = getPatternY(currentPatternIdx % 3, x, i, step);
          const y = translateY + waveY;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
    }

    function animate() {
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

      ctx!.fillStyle = "#050202";
      ctx!.fillRect(0, 0, width, height);

      if (!isMobile) {
        ctx!.globalCompositeOperation = "lighter";
      }
      drawSegmentedWaves(currentScrollY);
      if (!isMobile) {
        ctx!.globalCompositeOperation = "source-over";
      }

      step += 0.008;
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
}