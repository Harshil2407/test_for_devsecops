/* ==========================================================================
   SECUREOPS // Modal & Toast Generator (`components/modal.js`)
   ========================================================================== */

function showModal({ title, bodyHtml, confirmText = "Confirm Action", onConfirm, showCancel = true }) {
    const container = document.getElementById('modal-container');
    const contentEl = document.getElementById('modal-content');
    if (!container || !contentEl) return;

    contentEl.innerHTML = `
        <div class="flex-between" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 16px; margin-bottom: 20px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: #FFF;">${title}</h3>
            <button class="btn btn-secondary btn-sm" id="modal-close-icon" style="padding: 4px 10px; font-size: 1rem;">✕</button>
        </div>

        <div style="margin-bottom: 28px; color: var(--text-primary); line-height: 1.6;">
            ${bodyHtml}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--glass-border); padding-top: 20px;">
            ${showCancel ? `<button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>` : ''}
            ${onConfirm ? `<button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>` : ''}
        </div>
    `;

    container.classList.remove('hidden');

    const closeIcon = document.getElementById('modal-close-icon');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const backdrop = document.getElementById('modal-backdrop');

    const closeModal = () => {
        container.classList.add('hidden');
        contentEl.innerHTML = '';
    };

    if (closeIcon) closeIcon.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (confirmBtn && onConfirm) {
        confirmBtn.addEventListener('click', () => {
            onConfirm();
            closeModal();
        });
    }
}

function showToast(message, type = "info") {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toastId = `tst-${Date.now()}`;
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    toastEl.id = toastId;

    let icon = "💡";
    if (type === "critical" || type === "error") icon = "🚨";
    if (type === "success") icon = "✅";
    if (type === "warning") icon = "⚠️";

    toastEl.innerHTML = `
        <span style="font-size: 1.2rem;">${icon}</span>
        <div style="display: flex; flex-direction: column; gap: 2px; flex: 1;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">${type}</span>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">${message}</span>
        </div>
        <button onclick="document.getElementById('${toastId}')?.remove()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem;">✕</button>
    `;

    container.appendChild(toastEl);

    // Auto dismiss
    setTimeout(() => {
        const el = document.getElementById(toastId);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            el.style.transition = 'all 0.4s ease';
            setTimeout(() => el.remove(), 400);
        }
    }, 4500);
}

window.showModal = showModal;
window.closeModal = () => document.getElementById('modal-container')?.classList.add('hidden');
window.showToast = showToast;
