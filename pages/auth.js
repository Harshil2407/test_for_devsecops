/* ==========================================================================
   SECUREOPS // Authentication Suite (`pages/auth.js`)
   ========================================================================== */

const AuthPages = {
    renderLogin() {
        return `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 75vh; padding: 20px;">
                <div class="glass-card" style="max-width: 440px; width: 100%; padding: 36px; display: flex; flex-direction: column; gap: 24px; box-shadow: 0 0 50px rgba(0,0,0,0.8); border-top: 3px solid var(--primary-cyan);">
                    <div style="text-align: center;">
                        <div style="width: 54px; height: 54px; border-radius: 14px; background: linear-gradient(135deg, var(--primary-cyan), var(--cyber-violet)); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 2rem; font-weight: 900; color: #FFF; margin: 0 auto 16px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);">
                            S
                        </div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin-bottom: 6px;">Sign In to SECUREOPS</h2>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">AI Powered DevSecOps Management Portal</p>
                    </div>

                    <!-- SSO Buttons -->
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-secondary" style="justify-content: center; gap: 10px;" onclick="AuthPages.handleSSOLogin('GitHub Enterprise')">
                            <span>🐙</span> Continue with GitHub Enterprise SSO
                        </button>
                        <button class="btn btn-secondary" style="justify-content: center; gap: 10px;" onclick="AuthPages.handleSSOLogin('Okta SAML 2.0')">
                            <span>🔐</span> Continue with Okta / SAML
                        </button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 12px; margin: 4px 0;">
                        <div style="flex: 1; height: 1px; background: var(--glass-border);"></div>
                        <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">or use email credentials</span>
                        <div style="flex: 1; height: 1px; background: var(--glass-border);"></div>
                    </div>

                    <form id="login-form" style="display: flex; flex-direction: column; gap: 16px;" onsubmit="event.preventDefault(); AuthPages.handleFormSubmit();">
                        <div>
                            <label class="form-label">Enterprise Email</label>
                            <input type="email" id="login-email" class="form-input" placeholder="harshil@secureops.dev" required />
                        </div>
                        <div>
                            <div class="flex-between" style="margin-bottom: 6px;">
                                <label class="form-label" style="margin: 0;">Password / JWT Secret</label>
                                <a href="#/forgot-password" style="font-size: 0.75rem; color: var(--primary-cyan); text-decoration: none;">Forgot password?</a>
                            </div>
                            <input type="password" id="login-password" class="form-input" placeholder="••••••••••••••••" required />
                        </div>

                        <button type="submit" class="btn btn-primary" style="justify-content: center; padding: 12px; font-size: 1rem; margin-top: 8px;">
                            ⚡ Authenticate Session
                        </button>
                    </form>

                    <div style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--glass-border); padding-top: 18px;">
                        Need an organization workspace? <a href="#/register" style="color: var(--primary-cyan); text-decoration: none; font-weight: 600;">Create Account</a>
                    </div>
                </div>
            </div>
        `;
    },

    renderRegister() {
        return `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 75vh; padding: 20px;">
                <div class="glass-card" style="max-width: 480px; width: 100%; padding: 36px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 0 50px rgba(0,0,0,0.8); border-top: 3px solid var(--neon-green);">
                    <div style="text-align: center;">
                        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: #FFF; margin-bottom: 6px;">Create Enterprise Organization</h2>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Enroll your team for autonomous pre-commit guardrail scanning</p>
                    </div>

                    <form style="display: flex; flex-direction: column; gap: 14px;" onsubmit="event.preventDefault(); window.showToast('Organization workspace provisioned! Redirecting to dashboard...', 'success'); setTimeout(() => window.location.hash = '#/dashboard', 1200);">
                        <div>
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" placeholder="Harshil Architect" required />
                        </div>
                        <div>
                            <label class="form-label">Work Email Address</label>
                            <input type="email" class="form-input" placeholder="harshil@company.io" required />
                        </div>
                        <div>
                            <label class="form-label">Organization / Startup Name</label>
                            <input type="text" class="form-input" placeholder="SecureOps Technologies Inc." required />
                        </div>
                        <div>
                            <label class="form-label">Primary Role</label>
                            <select class="form-input">
                                <option>Principal DevSecOps Architect</option>
                                <option>Head of Security / CISO</option>
                                <option>Senior DevOps / Platform Engineer</option>
                                <option>Lead Software Engineer</option>
                            </select>
                        </div>
                        <div>
                            <label class="form-label">Create Master Password</label>
                            <input type="password" class="form-input" placeholder="••••••••••••••••" required />
                        </div>

                        <button type="submit" class="btn btn-primary" style="justify-content: center; padding: 12px; font-size: 1rem; margin-top: 8px; background: var(--neon-green); color: #08090C;">
                            🚀 Provision Workspace
                        </button>
                    </form>

                    <div style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--glass-border); padding-top: 16px;">
                        Already have a workspace? <a href="#/login" style="color: var(--primary-cyan); text-decoration: none; font-weight: 600;">Sign In</a>
                    </div>
                </div>
            </div>
        `;
    },

    renderForgot() {
        return `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 70vh; padding: 20px;">
                <div class="glass-card" style="max-width: 440px; width: 100%; padding: 36px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 0 50px rgba(0,0,0,0.8); border-top: 3px solid var(--warning-amber);">
                    <div style="text-align: center;">
                        <span style="font-size: 2.5rem; margin-bottom: 8px; display: inline-block;">🔑</span>
                        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #FFF; margin-bottom: 6px;">Autonomous Password Reset</h2>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Enter your enterprise email to issue a secure recovery token via SMTP webhook</p>
                    </div>

                    <form style="display: flex; flex-direction: column; gap: 16px;" onsubmit="event.preventDefault(); window.showToast('Recovery link sent to your email with a 15-minute JWT expiration.', 'info'); setTimeout(() => window.location.hash = '#/login', 1500);">
                        <div>
                            <label class="form-label">Enterprise Email</label>
                            <input type="email" class="form-input" placeholder="harshil@secureops.dev" required />
                        </div>

                        <button type="submit" class="btn btn-primary" style="justify-content: center; padding: 12px; font-size: 1rem;">
                            📧 Send Recovery Webhook
                        </button>
                    </form>

                    <div style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--glass-border); padding-top: 16px;">
                        Remembered your credential? <a href="#/login" style="color: var(--primary-cyan); text-decoration: none; font-weight: 600;">Back to Sign In</a>
                    </div>
                </div>
            </div>
        `;
    },

    handleSSOLogin(provider) {
        window.showToast(`Initiating OAuth2 handshake with ${provider}...`, "info");
        setTimeout(() => {
            window.showToast(`✅ Authenticated with ${provider}! Session JWT valid for 24 hours.`, "success");
            window.location.hash = '#/dashboard';
        }, 1200);
    },

    handleFormSubmit() {
        const emailInput = document.getElementById('login-email');
        const email = emailInput?.value || "harshil@secureops.dev";
        
        if (AppState) {
            AppState.login(email, "••••••••");
        }
        window.showToast("JWT session token issued. Welcome back, Architect!", "success");
        setTimeout(() => window.location.hash = '#/dashboard', 600);
    }
};

window.AuthPages = AuthPages;
