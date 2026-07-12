/* ==========================================================================
   SECUREOPS // Terminal Emulator (`components/terminal.js`)
   ========================================================================== */

class TerminalSimulator {
    constructor(containerId, options = {}) {
        this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
        this.speed = options.speed || 30; // ms per char
        this.lineDelay = options.lineDelay || 450; // ms between lines
        this.lines = options.lines || [];
        this.onComplete = options.onComplete || null;
        this.isStopped = false;
    }

    start() {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.isStopped = false;
        this.processNextLine(0);
    }

    stop() {
        this.isStopped = true;
    }

    processNextLine(index) {
        if (this.isStopped || !this.container) return;

        if (index >= this.lines.length) {
            if (this.onComplete) this.onComplete();
            return;
        }

        const lineData = this.lines[index];
        const lineEl = document.createElement('div');
        lineEl.style.marginBottom = '6px';
        
        // Check log level styling
        let typeClass = "";
        if (lineData.type === 'info') typeClass = "log-info";
        if (lineData.type === 'warn') typeClass = "log-warn";
        if (lineData.type === 'critical') typeClass = "log-critical";
        if (lineData.type === 'success') typeClass = "log-success";
        if (typeClass) lineEl.className = typeClass;

        this.container.appendChild(lineEl);
        this.container.scrollTop = this.container.scrollHeight;

        if (lineData.instant || lineData.text.length > 80) {
            lineEl.innerHTML = `<span class="prompt">${lineData.prompt || '>'}</span>${lineData.text}`;
            this.container.scrollTop = this.container.scrollHeight;
            setTimeout(() => this.processNextLine(index + 1), this.lineDelay / 2);
        } else {
            this.typeText(lineEl, lineData.prompt || '>', lineData.text, 0, () => {
                setTimeout(() => this.processNextLine(index + 1), lineData.delayAfter || this.lineDelay);
            });
        }
    }

    typeText(element, promptText, fullText, charIdx, callback) {
        if (this.isStopped) return;

        if (charIdx === 0) {
            element.innerHTML = `<span class="prompt">${promptText}</span><span class="typed-text"></span><span class="terminal-cursor"></span>`;
        }

        const typedSpan = element.querySelector('.typed-text');
        if (!typedSpan) return;

        typedSpan.textContent = fullText.substring(0, charIdx + 1);
        this.container.scrollTop = this.container.scrollHeight;

        if (charIdx < fullText.length - 1) {
            setTimeout(() => this.typeText(element, promptText, fullText, charIdx + 1, callback), this.speed);
        } else {
            // Remove cursor after line finishes unless it's the final line
            const cursor = element.querySelector('.terminal-cursor');
            if (cursor) cursor.remove();
            if (callback) callback();
        }
    }

    appendLine(text, type = 'info', promptText = '>') {
        if (!this.container) return;
        const lineEl = document.createElement('div');
        lineEl.style.marginBottom = '6px';
        if (type) lineEl.className = `log-${type}`;
        lineEl.innerHTML = `<span class="prompt">${promptText}</span>${text}`;
        this.container.appendChild(lineEl);
        this.container.scrollTop = this.container.scrollHeight;
    }
}

window.TerminalSimulator = TerminalSimulator;
