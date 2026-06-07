import { useEffect, useRef } from "react";

// Lightweight canvas sparkline — no chart library needed
const RetentionChart = ({ data }) => {
  const canvasRef = useRef(null);

  // Fallback demo data if none provided
  const points =
    data && data.length > 0
      ? data
      : [72, 75, 80, 78, 84, 82, 88, 85, 91, 90, 95, 94, 98, 100];

  const labels =
    points.length === 14
      ? Array.from({ length: 14 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (13 - i));
          return d.toLocaleDateString("en", { month: "short", day: "numeric" });
        })
      : points.map((_, i) => `Day ${i + 1}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const pad = { top: 10, right: 16, bottom: 28, left: 36 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;
    const min = Math.min(...points) - 10;
    const max = 105;

    const px = (i) => pad.left + (i / (points.length - 1)) * cW;
    const py = (v) => pad.top + cH - ((v - min) / (max - min)) * cH;

    // Grid lines
    ctx.strokeStyle = "rgba(228,221,213,0.7)";
    ctx.lineWidth = 1;
    [70, 80, 90, 100].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(pad.left, py(y));
      ctx.lineTo(pad.left + cW, py(y));
      ctx.stroke();
      ctx.fillStyle = "#A89E95";
      ctx.font = "10px Sora, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(y + "%", pad.left - 6, py(y) + 3.5);
    });

    // Area fill
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
    grad.addColorStop(0, "rgba(217,119,87,0.15)");
    grad.addColorStop(1, "rgba(217,119,87,0)");
    ctx.beginPath();
    points.forEach((v, i) => {
      i === 0 ? ctx.moveTo(px(i), py(v)) : ctx.lineTo(px(i), py(v));
    });
    ctx.lineTo(px(points.length - 1), pad.top + cH);
    ctx.lineTo(px(0), pad.top + cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = "#D97757";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    points.forEach((v, i) => {
      i === 0 ? ctx.moveTo(px(i), py(v)) : ctx.lineTo(px(i), py(v));
    });
    ctx.stroke();

    // Points
    points.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(px(i), py(v), 3, 0, Math.PI * 2);
      ctx.fillStyle = "#D97757";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // X labels (every ~3)
    ctx.fillStyle = "#A89E95";
    ctx.font = "9.5px Sora, sans-serif";
    ctx.textAlign = "center";
    points.forEach((_, i) => {
      if (i % Math.ceil(points.length / 5) === 0 || i === points.length - 1) {
        ctx.fillText(labels[i], px(i), H - 6);
      }
    });
  }, [points, labels]);

  return (
    <div className="bg-white border border-[#E4DDD5] rounded-[20px] p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[13px] font-semibold text-[#1A1714]">Retention trend</div>
          <div className="text-[11px] text-[#A89E95] mt-0.5">Last 14 days</div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#A89E95]">
          <span className="w-2 h-2 rounded-full bg-[#D97757] inline-block" />
          Retention %
        </div>
      </div>
      <canvas ref={canvasRef} style={{ width: "100%", height: "160px", display: "block" }} />
    </div>
  );
};

export default RetentionChart;