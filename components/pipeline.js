/* ==========================================================================
   SECUREOPS // Interactive Pipeline Flowchart (`components/pipeline.js`)
   ========================================================================== */

class PipelineRenderer {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.onStageClick = options.onStageClick || null;
        this.activeStageId = options.activeStageId || 1;
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const stages = AppState ? AppState.getState().pipelineStages : [];

        container.innerHTML = `
            <div class="pipeline-flow-container">
                ${stages.map((stage, idx) => {
                    const isLast = idx === stages.length - 1;
                    const isActive = stage.id === this.activeStageId;
                    
                    let statusColor = "var(--primary-cyan)";
                    if (stage.status === "PASSED") statusColor = "var(--neon-green)";
                    if (stage.status === "FAILED") statusColor = "var(--alert-red)";
                    if (stage.status === "READY") statusColor = "var(--warning-amber)";

                    let icon = "⚡";
                    if (stage.name.includes("GitHub")) icon = "🐙";
                    if (stage.name.includes("Build") || stage.name.includes("Docker")) icon = "🐳";
                    if (stage.name.includes("Bandit")) icon = "🐍";
                    if (stage.name.includes("Trivy")) icon = "🛡️";
                    if (stage.name.includes("Gitleaks")) icon = "🔑";
                    if (stage.name.includes("Deploy") || stage.name.includes("Kubernetes")) icon = "🚀";

                    return `
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div class="pipeline-node-card ${isActive ? 'active-step' : ''}" data-stage-id="${stage.id}" style="border-top: 3px solid ${statusColor};">
                                <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(0, 240, 255, 0.1); color: ${statusColor}; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: 0 0 14px rgba(0,0,0,0.4);">
                                    ${icon}
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 4px;">
                                    <span style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${stage.name}</span>
                                    <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${stage.duration}</span>
                                </div>
                                <span class="badge" style="background: rgba(255,255,255,0.06); color: ${statusColor}; border: 1px solid ${statusColor}; font-size: 0.65rem;">${stage.status}</span>
                            </div>

                            ${!isLast ? `
                                <div class="pipeline-connector-line glowing-pipe" style="width: 44px; height: 3px; border-radius: 2px;"></div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Add Click Listeners
        const nodeCards = container.querySelectorAll('.pipeline-node-card');
        nodeCards.forEach(card => {
            card.addEventListener('click', () => {
                const stageId = parseInt(card.getAttribute('data-stage-id'));
                this.activeStageId = stageId;
                
                // Highlight clicked node
                nodeCards.forEach(c => c.classList.remove('active-step'));
                card.classList.add('active-step');

                if (this.onStageClick) {
                    const stage = stages.find(s => s.id === stageId);
                    this.onStageClick(stage);
                }
            });
        });
    }
}

window.PipelineRenderer = PipelineRenderer;
