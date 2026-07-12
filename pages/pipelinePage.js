/* ==========================================================================
   SECUREOPS // CI/CD Pipeline Visualization (`pages/pipelinePage.js`)
   ========================================================================== */

const PipelinePage = {
    render() {
        const state = AppState ? AppState.getState() : { pipelineStages: [] };
        const stages = state.pipelineStages || [];

        return `
            <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Header -->
                <div class="flex-between flex-wrap" style="gap: 16px;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #FFF; margin-bottom: 4px;">
                            Autonomous CI/CD Guardrail Pipeline
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            Step-by-step security verification flow executing prior to Kubernetes zero-downtime rolling deployment.
                        </p>
                    </div>

                    <div style="display: flex; gap: 12px; align-items: center;">
                        <span class="badge badge-secure" style="padding: 8px 14px; font-size: 0.85rem;">Pipeline Status: HEALTHY (98.2%)</span>
                        <button class="btn btn-primary" id="rerun-pipeline-btn">
                            🔄 Re-Trigger Full Pipeline
                        </button>
                    </div>
                </div>

                <!-- Interactive Flowchart Container -->
                <div id="pipeline-page-flow-viewport"></div>

                <!-- Stage Inspector Box -->
                <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                    <div class="flex-between">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 1.4rem;" id="inspector-stage-icon">⚡</span>
                            <div>
                                <h3 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: #FFF;" id="inspector-stage-title">Select a Pipeline Node Above</h3>
                                <span style="font-size: 0.8rem; color: var(--text-muted);" id="inspector-stage-sub">Click any stage in the flowchart above to inspect exact security gate telemetry.</span>
                            </div>
                        </div>
                        <span class="badge badge-secure" id="inspector-stage-status">READY</span>
                    </div>

                    <div style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 20px; font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-primary); line-height: 1.7; min-height: 180px;" id="inspector-stage-logs">
                        <span class="prompt">$</span> Pipeline inspector ready. Click node &lt;code&gt;Run Bandit (SAST)&lt;/code&gt; or &lt;code&gt;Run Trivy&lt;/code&gt; above...
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const inspectorTitle = document.getElementById('inspector-stage-title');
        const inspectorSub = document.getElementById('inspector-stage-sub');
        const inspectorStatus = document.getElementById('inspector-stage-status');
        const inspectorLogs = document.getElementById('inspector-stage-logs');
        const inspectorIcon = document.getElementById('inspector-stage-icon');
        const rerunBtn = document.getElementById('rerun-pipeline-btn');

        if (window.PipelineRenderer) {
            const renderer = new PipelineRenderer('pipeline-page-flow-viewport', {
                activeStageId: 3, // Default active on Bandit SAST
                onStageClick: (stage) => {
                    if (!stage) return;
                    
                    inspectorTitle.textContent = `Stage Inspect // ${stage.name}`;
                    inspectorSub.textContent = `Execution duration: ${stage.duration} // ${stage.info}`;
                    inspectorStatus.textContent = stage.status;
                    inspectorStatus.className = `badge ${stage.status === 'PASSED' ? 'badge-secure' : 'badge-warning'}`;

                    let icon = "⚡";
                    if (stage.name.includes("GitHub")) icon = "🐙";
                    if (stage.name.includes("Build") || stage.name.includes("Docker")) icon = "🐳";
                    if (stage.name.includes("Bandit")) icon = "🐍";
                    if (stage.name.includes("Trivy")) icon = "🛡️";
                    if (stage.name.includes("Gitleaks")) icon = "🔑";
                    if (stage.name.includes("Deploy") || stage.name.includes("Kubernetes")) icon = "🚀";
                    if (inspectorIcon) inspectorIcon.textContent = icon;

                    let logContent = `<div class="log-info"><span class="prompt">$</span> secureops-runner --stage="${stage.name}" --job-id=901a</div>`;
                    if (stage.name.includes("GitHub")) {
                        logContent += `
                            <div class="log-info"><span class="prompt">></span> Received webhook event: pull_request on branch \`main\`</div>
                            <div class="log-info"><span class="prompt">></span> Author: Harshil Architect &lt;harshil@secureops.dev&gt;</div>
                            <div class="log-success"><span class="prompt">></span> Commit hash verified with GPG signature. Payload ready.</div>
                        `;
                    } else if (stage.name.includes("Bandit")) {
                        logContent += `
                            <div class="log-info"><span class="prompt">></span> Launching Bandit v1.7.8 AST static analyzer...</div>
                            <div class="log-info"><span class="prompt">></span> Scanned 142 Python modules in 18 seconds.</div>
                            <div class="log-success"><span class="prompt">></span> [SECURITY GATE PASSED] 0 High/Critical findings detected in diff.</div>
                        `;
                    } else if (stage.name.includes("Trivy")) {
                        logContent += `
                            <div class="log-info"><span class="prompt">></span> Inspecting Alpine Linux container layers (` + `sha256:4a8b9c0d...` + `)...</div>
                            <div class="log-info"><span class="prompt">></span> Checked against 2026 CVE Database. 0 OS package vulnerabilities.</div>
                            <div class="log-success"><span class="prompt">></span> [SECURITY GATE PASSED] Container image signed with Cosign.</div>
                        `;
                    } else if (stage.name.includes("Deploy")) {
                        logContent += `
                            <div class="log-info"><span class="prompt">></span> All upstream AI security gates passed. Requesting EKS rollout...</div>
                            <div class="log-info"><span class="prompt">></span> Updating Kubernetes deployment \`api-gateway\` replicas 3 -> 3 (rolling update)...</div>
                            <div class="log-success"><span class="prompt">></span> [ROLLOUT COMPLETE] Pods healthy in namespace \`secure-prod\`.</div>
                        `;
                    } else {
                        logContent += `
                            <div class="log-info"><span class="prompt">></span> Executing checks... ${stage.info}</div>
                            <div class="log-success"><span class="prompt">></span> Status verified: ${stage.status} (${stage.duration}).</div>
                        `;
                    }

                    if (inspectorLogs) inspectorLogs.innerHTML = logContent;
                }
            });
            renderer.render();

            // Auto select initial node 3 after render
            setTimeout(() => {
                const nodeEl = document.querySelector('.pipeline-node-card[data-stage-id="3"]');
                if (nodeEl) nodeEl.click();
            }, 100);
        }

        if (rerunBtn) {
            rerunBtn.addEventListener('click', () => {
                window.showToast("Re-triggering autonomous CI/CD guardrail pipeline across all stages...", "info");
                setTimeout(() => {
                    window.showToast("✅ Pipeline build #114 completed! All security checks PASSED.", "success");
                }, 1800);
            });
        }
    }
};

window.PipelinePage = PipelinePage;
