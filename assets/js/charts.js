/* ==========================================================================
   SECUREOPS // Pure SVG & Canvas Charting Library (`assets/js/charts.js`)
   Zero External Dependencies — 100% Handwritten High Performance Charts
   ========================================================================== */

const SecureCharts = {
    /**
     * Renders an animated SVG Line / Area chart
     */
    renderAreaChart(container, options) {
        if (!container) return;
        const { labels, values, color = '#00F0FF', height = 240 } = options;
        const width = container.clientWidth || 600;
        const maxVal = Math.max(...values, 10);
        const minVal = Math.min(...values, 0);
        
        // Calculate points
        const padding = 30;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        const points = values.map((val, idx) => {
            const x = padding + (idx / (values.length - 1)) * chartWidth;
            const y = height - padding - ((val - minVal) / (maxVal - minVal || 1)) * chartHeight;
            return { x, y, val, label: labels[idx] };
        });

        // Build SVG path (Smooth curve approximation)
        let linePath = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cx1 = prev.x + (curr.x - prev.x) * 0.4;
            const cy1 = prev.y;
            const cx2 = curr.x - (curr.x - prev.x) * 0.4;
            const cy2 = curr.y;
            linePath += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
        }

        const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

        const svgId = `chart-gradient-${Date.now()}`;
        container.innerHTML = `
            <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;">
                <defs>
                    <linearGradient id="${svgId}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
                        <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
                    </linearGradient>
                </defs>
                
                <!-- Grid lines -->
                <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4" />
                <line x1="${padding}" y1="${height / 2}" x2="${width - padding}" y2="${height / 2}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4" />
                <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.1)" />

                <!-- Area Fill -->
                <path d="${areaPath}" fill="url(#${svgId})" class="fade-in" />

                <!-- Line Path -->
                <path d="${linePath}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

                <!-- Data Points & Tooltips -->
                ${points.map(p => `
                    <g class="chart-point-group" style="cursor: pointer;">
                        <circle cx="${p.x}" cy="${p.y}" r="5" fill="#08090C" stroke="${color}" stroke-width="2.5">
                            <title>${p.label}: ${p.val}</title>
                        </circle>
                        <text x="${p.x}" y="${height - 8}" fill="#64748B" font-size="11" text-anchor="middle" font-family="Inter">${p.label}</text>
                    </g>
                `).join('')}
            </svg>
        `;
    },

    /**
     * Renders an animated SVG Donut chart for severity distribution or security score
     */
    renderDonutChart(container, options) {
        if (!container) return;
        const { items, centerLabel = "Score", centerValue = "94", size = 200 } = options;
        const strokeWidth = 22;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        
        const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
        let accumulatedOffset = 0;

        const segments = items.map(item => {
            const percentage = item.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference}`;
            const strokeDashoffset = -circumference * accumulatedOffset;
            accumulatedOffset += percentage;
            return { ...item, strokeDasharray, strokeDashoffset };
        });

        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap;">
                <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
                    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
                        <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${strokeWidth}" />
                        ${segments.map(seg => `
                            <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="${seg.color}" stroke-width="${strokeWidth}"
                                stroke-dasharray="${seg.strokeDasharray}" stroke-dashoffset="${seg.strokeDashoffset}"
                                stroke-linecap="round" style="transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
                                <title>${seg.label}: ${seg.value}</title>
                            </circle>
                        `).join('')}
                    </svg>
                    <div style="position: absolute; text-align: center; pointer-events: none;">
                        <div style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: #F8FAFC; line-height: 1;">${centerValue}</div>
                        <div style="font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px;">${centerLabel}</div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${items.map(seg => `
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; font-size: 0.9rem;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="width: 12px; height: 12px; border-radius: 3px; background: ${seg.color}; display: inline-block;"></span>
                                <span style="color: var(--text-secondary);">${seg.label}</span>
                            </div>
                            <span style="font-weight: 700; font-family: var(--font-mono); color: var(--text-primary);">${seg.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    /**
     * Renders a Bar Chart for vulnerability counts by repo or scan frequency
     */
    renderBarChart(container, options) {
        if (!container) return;
        const { items } = options; // [{ label, value, color }]
        const maxVal = Math.max(...items.map(i => i.value), 1);

        container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
                ${items.map(item => {
                    const percentage = Math.round((item.value / maxVal) * 100);
                    return `
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                                <span style="color: var(--text-primary); font-weight: 500;">${item.label}</span>
                                <span style="font-family: var(--font-mono); color: ${item.color || 'var(--primary-cyan)'}; font-weight: 600;">${item.value}</span>
                            </div>
                            <div style="width: 100%; height: 10px; background: rgba(255,255,255,0.06); border-radius: 5px; overflow: hidden;">
                                <div style="width: ${percentage}%; height: 100%; background: ${item.color || 'var(--primary-cyan)'}; border-radius: 5px; transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);"></div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

window.SecureCharts = SecureCharts;
