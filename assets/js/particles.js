/* ==========================================================================
   SECUREOPS // Particle & Glow Engine (`assets/js/particles.js`)
   ========================================================================== */

class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 55;
        this.maxDistance = 140;
        this.mouse = { x: -1000, y: -1000, radius: 250 };
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * (this.canvas?.width || 1200),
            y: Math.random() * (this.canvas?.height || 800),
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.4 ? 'rgba(0, 240, 255, 0.45)' : 'rgba(138, 43, 226, 0.4)'
        };
    }

    animate() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Render Mouse-Follow Ambient Glow
        if (this.mouse.x >= 0 && this.mouse.y >= 0) {
            const gradient = this.ctx.createRadialGradient(
                this.mouse.x, this.mouse.y, 0,
                this.mouse.x, this.mouse.y, this.mouse.radius
            );
            gradient.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
            gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.03)');
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 2. Render and update particles
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Draw particle dot
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Connect nearby particles with glowing line
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.maxDistance) {
                    let opacity = (1 - dist / this.maxDistance) * 0.18;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }

            // Mouse interaction push/pull
            let mdx = p.x - this.mouse.x;
            let mdy = p.y - this.mouse.y;
            let mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 120 && this.mouse.x >= 0) {
                p.x += (mdx / mDist) * 1.2;
                p.y += (mdy / mDist) * 1.2;
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Automatically start engine on load
window.addEventListener('load', () => {
    new ParticleEngine('particle-canvas');
});
