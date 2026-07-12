/* ==========================================================================
   SECUREOPS // 404 Not Found & Glitch Screen (`pages/notFound.js`)
   ========================================================================== */

const NotFoundPage = {
    render() {
        return `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 75vh; padding: 20px; text-align: center;">
                <div class="glass-card" style="max-width: 600px; width: 100%; padding: 40px; border-top: 3px solid var(--alert-red); box-shadow: 0 0 50px rgba(255, 46, 99, 0.25); display: flex; flex-direction: column; gap: 20px; align-items: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255, 46, 99, 0.15); border: 2px solid var(--alert-red); display: flex; align-items: center; justify-content: center; font-size: 2.8rem; box-shadow: 0 0 25px rgba(255, 46, 99, 0.4); animation: pulseGlow 2s infinite;">
                        🚨
                    </div>

                    <span class="badge badge-critical" style="font-family: var(--font-mono); font-size: 0.9rem; padding: 6px 14px;">
                        E R R O R   4 0 4 // R O U T E   N O T   F O U N D
                    </span>

                    <h2 style="font-family: var(--font-heading); font-size: 2.4rem; font-weight: 900; color: #FFF; margin: 0;">
                        Security Perimeter Violation
                    </h2>

                    <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6; max-width: 480px; margin: 0;">
                        The requested path does not exist within the SECUREOPS DevSecOps routing table. This navigation attempt has been recorded into the immutable SHA-256 audit log.
                    </p>

                    <div style="background: #06070B; border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: 16px; width: 100%; font-family: var(--font-mono); font-size: 0.85rem; color: var(--alert-red); text-align: left; line-height: 1.6;">
                        <div><span class="prompt">$</span> secureops router --inspect --path="${window.location.hash}"</div>
                        <div>[WARN] Destination endpoint unregistered or access denied.</div>
                        <div>[AUDIT] IP 192.168.1.104 logged for anomalous URL traversal.</div>
                    </div>

                    <div style="display: flex; gap: 16px; margin-top: 8px;">
                        <a href="#/dashboard" class="btn btn-primary" style="padding: 12px 28px; background: var(--primary-cyan); color: #08090C;">
                            ⚡ Return to Dashboard
                        </a>
                        <a href="#/" class="btn btn-secondary" style="padding: 12px 24px;">
                            🏠 Homepage Story
                        </a>
                    </a>
                </div>
            </div>
        `;
    }
};

window.NotFoundPage = NotFoundPage;
