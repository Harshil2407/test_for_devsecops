/* ==========================================================================
   SECUREOPS // Central Reactive State Store (`assets/js/state.js`)
   ========================================================================== */

class StateStore {
    constructor(initialData) {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.listeners = [];
        this.activeScans = new Map();
        this.theme = localStorage.getItem('secureops_theme') || 'dark';
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => {
            try {
                listener(this.data);
            } catch (err) {
                /* Handled gracefully */
            }
        });
    }

    getState() {
        return this.data;
    }

    // Auth & User Actions
    login(email, password) {
        // Simulated JWT login
        this.data.currentUser.email = email;
        this.addAuditLog("USER_LOGIN", `User authenticated via JWT session (${email})`, "SUCCESS");
        this.notify();
        return true;
    }

    logout() {
        this.addAuditLog("USER_LOGOUT", "User terminated JWT session", "SUCCESS");
        this.notify();
    }

    // Repository Actions
    getRepositories() {
        return this.data.repositories;
    }

    getRepositoryById(id) {
        return this.data.repositories.find(r => r.id === id || r.name === id);
    }

    // Notification Actions
    getNotifications() {
        return this.data.notifications;
    }

    getUnreadCount() {
        return this.data.notifications.filter(n => !n.read).length;
    }

    markAllNotificationsRead() {
        this.data.notifications.forEach(n => n.read = true);
        this.notify();
    }

    addNotification(title, message, type = "info") {
        const newNotif = {
            id: Date.now(),
            title,
            message,
            time: "Just now",
            type,
            read: false
        };
        this.data.notifications.unshift(newNotif);
        this.notify();

        // Trigger Toast popup if toast component is loaded
        if (window.showToast) {
            window.showToast(message, type);
        }
    }

    // Audit Log Actions
    addAuditLog(action, details, status = "SUCCESS") {
        const newLog = {
            id: `aud-${Date.now().toString().slice(-4)}`,
            user: this.data.currentUser.name,
            action,
            details,
            ip: "192.168.1.104",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " UTC",
            status
        };
        this.data.auditLogs.unshift(newLog);
        this.notify();
    }

    // Scanner Actions
    triggerScan(repoName, scannerId, onProgress, onComplete) {
        const scanId = `scn-${Date.now().toString().slice(-4)}`;
        const repo = this.data.repositories.find(r => r.name === repoName || r.id === repoName) || this.data.repositories[0];
        const scanner = this.data.scanners.find(s => s.id === scannerId) || this.data.scanners[0];

        this.addAuditLog("SCAN_TRIGGERED", `Launched ${scanner.name} against repository \`${repo.name}\``, "SUCCESS");
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Update repo score & scan log
                repo.lastScanned = "Just now";
                const isSuccess = Math.random() > 0.3;
                const statusStr = isSuccess ? "PASSED" : "VULNERABILITIES FOUND";
                
                this.data.scanHistory.unshift({
                    id: scanId,
                    repo: repo.name,
                    scanner: scanner.name,
                    triggeredBy: `${this.data.currentUser.name} (Live)`,
                    duration: "38s",
                    timestamp: "Just now",
                    status: statusStr,
                    findings: isSuccess ? "0 Issues Found" : "1 New Medium Finding"
                });

                this.data.metrics.scansToday += 1;
                this.addNotification("Scan Completed", `${scanner.name} finished scanning \`${repo.name}\` — Status: ${statusStr}`, isSuccess ? "success" : "warning");
                this.notify();

                if (onComplete) onComplete({ scanId, status: statusStr });
            } else {
                if (onProgress) onProgress(progress);
            }
        }, 350);
    }

    // Theme Actions
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('secureops_theme', this.theme);
        this.notify();
    }
}

// Global Singleton Instance
const AppState = new StateStore(MOCK_DATA);
