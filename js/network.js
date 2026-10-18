/**
 * LUCKZDEV // NEXUS PROTOCOL - CISCO NETWORKING TOPOLOGY SIMULATOR
 * Interactive educational packet simulation demonstrating Routing, Switching, Subnetting & VLANs.
 * Developer: Lucky Arlie T. Evangelista (LuckzDev)
 */

export function initNetworkSimulator() {
  const canvas = document.getElementById('network-topology-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || 380);

  // Resize observer for responsive canvas
  const resizeObserver = new ResizeObserver(() => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 380;
      repositionNodes();
    }
  });
  resizeObserver.observe(canvas.parentElement);

  // Educational Node Data
  const nodes = [
    {
      id: 'r1',
      name: 'R1 - Core Gateway',
      type: 'Router (Layer 3)',
      ip: '192.168.1.1 /24',
      subnets: 'Sub-interfaces: Gig0/0.10 (192.168.10.1), Gig0/0.20 (192.168.20.1)',
      role: 'Default Gateway & Inter-VLAN Routing (Router-on-a-Stick)',
      concept: 'Processes Layer 3 IP headers, maintains routing table entries, and routes unicast traffic across separated IEEE 802.1Q sub-interfaces.',
      xPercent: 0.5,
      yPercent: 0.22,
      color: '#00E5FF',
      icon: 'router'
    },
    {
      id: 'sw1',
      name: 'SW1 - Distribution Switch',
      type: 'Switch (Layer 2)',
      ip: '192.168.1.2 /24',
      subnets: 'VLAN 10 (Management), VLAN 20 (Datacenter Servers)',
      role: 'VLAN Segmentation & 802.1Q Trunking',
      concept: 'Performs hardware frame forwarding via MAC address table lookup. Isolates broadcast domains and multiplexes traffic over the trunk uplink to R1.',
      xPercent: 0.5,
      yPercent: 0.55,
      color: '#8B5CF6',
      icon: 'switch'
    },
    {
      id: 'pc1',
      name: 'Admin-PC01',
      type: 'Endpoint Host',
      ip: '192.168.10.15 /24',
      subnets: 'VLAN 10 | Gateway: 192.168.10.1',
      role: 'VLAN 10 (Management & Engineering)',
      concept: 'Generates ICMP Echo Requests and TCP sockets. Uses ARP (Address Resolution Protocol) cache to locate default gateway MAC address.',
      xPercent: 0.18,
      yPercent: 0.82,
      color: '#39FF88',
      icon: 'host'
    },
    {
      id: 'srv1',
      name: 'Server-SRV01',
      type: 'Local Server',
      ip: '192.168.20.50 /24',
      subnets: 'VLAN 20 | Gateway: 192.168.20.1',
      role: 'VLAN 20 (Academic Datacenter)',
      concept: 'Listens for incoming TCP connections on Port 80/443; receives inter-VLAN routed packets filtered through switch access port Fa0/10.',
      xPercent: 0.5,
      yPercent: 0.85,
      color: '#FF3CAC',
      icon: 'server'
    },
    {
      id: 'pc2',
      name: 'IoT-Gateway01',
      type: 'Embedded Node',
      ip: '192.168.10.99 /24',
      subnets: 'VLAN 10 | Gateway: 192.168.10.1',
      role: 'VLAN 10 (Sensor Telemetry Host)',
      concept: 'Transmits telemetry UDP/TCP packets from embedded water monitoring sensors directly across the local engineering subnet.',
      xPercent: 0.82,
      yPercent: 0.82,
      color: '#39FF88',
      icon: 'host'
    }
  ];

  // Links connecting devices
  const links = [
    { from: 'r1', to: 'sw1', label: 'Gig0/0 (802.1Q Trunk)', speed: '1 Gbps' },
    { from: 'sw1', to: 'pc1', label: 'Fa0/1 (Access VLAN 10)', speed: '100 Mbps' },
    { from: 'sw1', to: 'srv1', label: 'Fa0/10 (Access VLAN 20)', speed: '100 Mbps' },
    { from: 'sw1', to: 'pc2', label: 'Fa0/24 (Access VLAN 10)', speed: '100 Mbps' }
  ];

  let selectedNode = nodes[0];
  let packets = [];
  let packetsRoutedCount = 124;

  function repositionNodes() {
    nodes.forEach(n => {
      n.x = width * n.xPercent;
      n.y = height * n.yPercent;
    });
  }
  repositionNodes();

  // Packet class for animated data flow
  class Packet {
    constructor(fromNode, toNode, color = '#00E5FF', label = 'IP') {
      this.from = fromNode;
      this.to = toNode;
      this.progress = 0;
      this.speed = 0.016;
      this.color = color;
      this.label = label;
    }

    update() {
      this.progress += this.speed;
    }

    draw() {
      const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
      const curY = this.from.y + (this.to.y - this.from.y) * this.progress;

      // Glow Aura
      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core Packet Dot
      ctx.beginPath();
      ctx.arc(curX, curY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
    }
  }

  // Routine Background Packets
  function spawnRoutinePacket() {
    if (packets.length < 6) {
      const randLink = links[Math.floor(Math.random() * links.length)];
      const fromNode = nodes.find(n => n.id === randLink.from);
      const toNode = nodes.find(n => n.id === randLink.to);
      if (fromNode && toNode) {
        const forward = Math.random() > 0.5;
        packets.push(new Packet(forward ? fromNode : toNode, forward ? toNode : fromNode));
        packetsRoutedCount++;
        updateTelemetryHeader();
      }
    }
  }
  let isCanvasVisible = false;
  setInterval(() => {
    if (isCanvasVisible && !document.hidden) spawnRoutinePacket();
  }, 1300);

  function updateTelemetryHeader() {
    const el = document.getElementById('network-packets-count');
    if (el) el.textContent = packetsRoutedCount;
  }

  // Educational Ping tracer simulation
  window.simulatePacketPing = function() {
    const pc1 = nodes.find(n => n.id === 'pc1');
    const sw1 = nodes.find(n => n.id === 'sw1');
    const r1 = nodes.find(n => n.id === 'r1');
    const srv1 = nodes.find(n => n.id === 'srv1');

    logTracerMessage('PING 192.168.20.50 (Server-SRV01) 56(84) bytes of data:');

    // Step 1: PC1 to SW1
    packets.push(new Packet(pc1, sw1, '#39FF88', 'ICMP'));
    logTracerMessage('[HOP 1] Admin-PC01 forwards frame via Fa0/1 (Untagged VLAN 10)');

    // Step 2: SW1 to R1 (Trunk)
    setTimeout(() => {
      packets.push(new Packet(sw1, r1, '#00E5FF', '802.1Q'));
      logTracerMessage('[HOP 2] SW1 applies IEEE 802.1Q Tag: VLAN ID 10 -> Transmits on Gig0/0 Trunk');
    }, 450);

    // Step 3: R1 to SW1 (Inter-VLAN Route)
    setTimeout(() => {
      packets.push(new Packet(r1, sw1, '#8B5CF6', 'L3-ROUTE'));
      logTracerMessage('[HOP 3] R1 decapsulates VLAN 10, routes IP payload to sub-interface Gig0/0.20 (VLAN 20)');
    }, 950);

    // Step 4: SW1 to Server
    setTimeout(() => {
      packets.push(new Packet(sw1, srv1, '#FF3CAC', 'REPLY'));
      logTracerMessage('[HOP 4] SW1 delivers frame untagged to Server-SRV01 on port Fa0/10 [SUCCESS: 0% LOSS]');
      packetsRoutedCount += 4;
      updateTelemetryHeader();
    }, 1450);
  };

  function logTracerMessage(msg) {
    const traceEl = document.getElementById('network-tracer-log');
    if (!traceEl) return;
    const line = document.createElement('div');
    line.style.fontSize = '0.72rem';
    line.style.fontFamily = 'var(--font-mono)';
    line.style.color = '#39FF88';
    line.style.marginBottom = '2px';
    line.textContent = `> ${msg}`;
    traceEl.prepend(line);

    // Keep log clean (last 6 entries)
    while (traceEl.children.length > 6) {
      traceEl.removeChild(traceEl.lastChild);
    }
  }

  // Reset topology
  window.resetNetworkTopology = function() {
    packets = [];
    selectedNode = nodes[0];
    updateInspectorPanel(selectedNode);
    const traceEl = document.getElementById('network-tracer-log');
    if (traceEl) traceEl.innerHTML = '<div style="color: #64748B;">> Topology reset. Network simulation ready.</div>';
  };

  // Click on nodes
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    for (let node of nodes) {
      const dist = Math.hypot(node.x - clickX, node.y - clickY);
      if (dist < 28) {
        selectedNode = node;
        updateInspectorPanel(node);
        const sw = nodes.find(n => n.id === 'sw1');
        if (sw && node.id !== 'sw1') {
          packets.push(new Packet(sw, node, node.color));
        }
        break;
      }
    }
  });

  function updateInspectorPanel(node) {
    const panel = document.getElementById('network-inspector-content');
    if (!panel) return;
    panel.innerHTML = `
      <div style="flex: 1;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="display: inline-block; width: 10px; height: 10px; background: ${node.color}; border-radius: 50%; box-shadow: 0 0 8px ${node.color};"></span>
          <strong style="color: #EAF2FF; font-size: 1rem;">${node.name}</strong>
          <span style="color: #00E5FF; font-size: 0.72rem; border: 1px solid rgba(0,229,255,0.3); padding: 2px 8px; border-radius: 2px;">${node.type}</span>
          <span style="color: #39FF88; font-size: 0.72rem; font-family: var(--font-mono);">IP: ${node.ip}</span>
        </div>
        <div style="font-size: 0.75rem; color: #8B5CF6; font-family: var(--font-mono); margin-bottom: 4px;">${node.subnets}</div>
        <p style="color: #94A3B8; font-size: 0.8rem; margin-bottom: 6px;"><strong style="color: #00E5FF;">ROLE:</strong> ${node.role}</p>
        <p style="color: #CBD5E1; font-size: 0.8rem; line-height: 1.5; background: rgba(0,229,255,0.04); padding: 8px; border-left: 2px solid ${node.color}; border-radius: 2px;">
          <strong style="color: #EAF2FF;">CISCO CONCEPT:</strong> ${node.concept}
        </p>
      </div>
    `;
  }
  updateInspectorPanel(selectedNode);

  // Render Loop
  let isSimRunning = !document.hidden;
  let renderFrame = 0;

  function updateSimulationState() {
    const shouldRender = isSimRunning && isCanvasVisible;
    if (shouldRender && !renderFrame) {
      renderFrame = requestAnimationFrame(render);
    } else if (!shouldRender && renderFrame) {
      cancelAnimationFrame(renderFrame);
      renderFrame = 0;
    }
  }

  document.addEventListener('visibilitychange', () => {
    isSimRunning = !document.hidden;
    updateSimulationState();
  });

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
      updateSimulationState();
    }, { rootMargin: '100px' });
    visibilityObserver.observe(canvas);
  } else {
    isCanvasVisible = true;
  }
  updateSimulationState();

  function render() {
    renderFrame = 0;
    if (!isSimRunning || !isCanvasVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Links
    links.forEach(l => {
      const from = nodes.find(n => n.id === l.from);
      const to = nodes.find(n => n.id === l.to);
      if (from && to) {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#64748B';
        ctx.fillText(l.label, midX + 8, midY - 4);
      }
    });

    // Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.update();
      p.draw();
      if (p.progress >= 1) {
        packets.splice(i, 1);
      }
    }

    // Nodes
    nodes.forEach(n => {
      const isSelected = selectedNode && selectedNode.id === n.id;

      if (isSelected) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 25, 0, Math.PI * 2);
        ctx.strokeStyle = n.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#070A12';
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      ctx.font = '11px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#EAF2FF';
      ctx.textAlign = 'center';
      ctx.fillText(n.name, n.x, n.y + 30);

      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText(n.ip, n.x, n.y + 42);
    });

    renderFrame = requestAnimationFrame(render);
  }
}
