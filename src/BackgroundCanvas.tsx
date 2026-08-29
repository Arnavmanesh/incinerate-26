import { useEffect, useRef } from "react";

/**
 * Scroll-driven fiery ribbon background.
 * Renders behind everything (fixed, full-viewport canvas) and cycles
 * through 3 wave patterns as the user scrolls — one pattern per
 * viewport-height, with a smooth bell-curve fade between them.
 *
 * Usage: render once, near the top of <main>, before your other
 * background layers (or in place of them — see notes in chat).
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

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

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
      const lineCount = 45;
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
      const translateY = height * 0.5 - (progressWithinSection - 0.5) * height * 0.6;

      for (let i = 0; i < lineCount; i++) {
        ctx!.beginPath();

        const baseAlpha = Math.sin((i / lineCount) * Math.PI) * 0.45 + 0.1;
        const finalAlpha = baseAlpha * gapVisibility;
        if (finalAlpha <= 0.01) continue;

        ctx!.strokeStyle = `rgba(235, 60, 20, ${finalAlpha})`;
        ctx!.lineWidth = 1.2;

        for (let x = 0; x <= width; x += 12) {
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

      ctx!.globalCompositeOperation = "lighter";
      drawSegmentedWaves(currentScrollY);
      ctx!.globalCompositeOperation = "source-over";

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