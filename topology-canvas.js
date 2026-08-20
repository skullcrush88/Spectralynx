/**
 * SpectraLynx One System Architecture Canvas
 * Renders an interconnected technological layer topology (TELECOM -> NETWORK -> AV -> SECURITY -> ENTERPRISE).
 */

export function initTopologyCanvas(canvasId = 'topology-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, animationFrameId;
  let activeLayerIndex = 0;

  const layers = [
    { label: 'TELECOM & VOICE', sub: 'IP-PBX / SIP / Unified Communications', color: '#0052CC', yPct: 0.18 },
    { label: 'NETWORK INFRASTRUCTURE', sub: 'Fiber / SD-WAN / Core Switching', color: '#0284C7', yPct: 0.36 },
    { label: 'AUDIO VISUAL INTEGRATION', sub: 'AVSI / Video Walls / Auditoriums', color: '#0369A1', yPct: 0.54 },
    { label: 'SURVEILLANCE & SAFETY', sub: 'CCTV Clusters / Biometrics / Fire Alarms', color: '#0052CC', yPct: 0.72 },
    { label: 'ENTERPRISE OPERATIONS', sub: '24/7 SLA Handover / AMC', color: '#38BDF8', yPct: 0.90 }
  ];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('scroll', () => {
    const rect = canvas.getBoundingClientRect();
    const scrollPos = window.innerHeight - rect.top;
    if (scrollPos > 0 && rect.bottom > 0) {
      const progress = Math.min(1, Math.max(0, scrollPos / (window.innerHeight + rect.height)));
      activeLayerIndex = Math.floor(progress * layers.length);
    }
  });

  let pulseTime = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    pulseTime += 0.02;

    const centerX = width / 2;

    // Vertical backbone path
    ctx.beginPath();
    ctx.moveTo(centerX, height * 0.1);
    ctx.lineTo(centerX, height * 0.92);
    ctx.strokeStyle = 'rgba(7, 26, 47, 0.12)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Active illuminated backbone
    const activeY = height * (layers[Math.min(activeLayerIndex, layers.length - 1)].yPct);
    ctx.beginPath();
    ctx.moveTo(centerX, height * 0.1);
    ctx.lineTo(centerX, activeY);
    ctx.strokeStyle = '#0052CC';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pulse signal traveling down backbone
    const pulseY = height * 0.1 + ((pulseTime * 60) % (height * 0.82));
    ctx.beginPath();
    ctx.arc(centerX, pulseY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#38BDF8';
    ctx.shadowColor = '#0052CC';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Render layers
    layers.forEach((layer, i) => {
      const layerY = height * layer.yPct;
      const isActive = i <= activeLayerIndex;

      // Outer ring
      ctx.beginPath();
      ctx.arc(centerX, layerY, isActive ? 12 : 8, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? layer.color : '#CBD5E1';
      ctx.fill();

      if (isActive) {
        ctx.beginPath();
        ctx.arc(centerX, layerY, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 82, 204, 0.12)';
        ctx.fill();
      }

      // Horizontal indicator branch
      const isEven = i % 2 === 0;
      const branchX = isEven ? centerX + 40 : centerX - 40;
      const cardX = isEven ? centerX + 60 : centerX - 240;

      ctx.beginPath();
      ctx.moveTo(centerX, layerY);
      ctx.lineTo(branchX, layerY);
      ctx.strokeStyle = isActive ? 'rgba(0, 82, 204, 0.4)' : 'rgba(203, 213, 225, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Layer Title & Sub
      ctx.font = `${isActive ? '700' : '600'} 13px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = isActive ? '#071A2F' : '#64748B';
      ctx.textAlign = isEven ? 'left' : 'right';
      ctx.fillText(layer.label, isEven ? centerX + 50 : centerX - 50, layerY - 4);

      ctx.font = '400 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = isActive ? '#475569' : '#94A3B8';
      ctx.fillText(layer.sub, isEven ? centerX + 50 : centerX - 50, layerY + 12);
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}
