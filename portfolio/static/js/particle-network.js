/**
 * Particle Network Animation
 * Creates an animated constellation/network effect with connecting lines
 */

class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.resizeTimeout = null;

        // Configuration
        this.config = {
            particleCount: 80,
            particleColor: 'rgba(99, 102, 241, 0.8)',      // Primary purple
            lineColor: 'rgba(99, 102, 241, 0.15)',         // Subtle lines
            particleRadius: { min: 1, max: 3 },
            lineMaxDistance: 150,
            speed: 0.5,
            mouseInteraction: true,
            mouseRadius: 120
        };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        const hero = this.canvas.parentElement;
        const oldWidth = this.canvas.width;
        const oldHeight = this.canvas.height;

        // Get the actual display size
        const rect = hero.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size to match display size
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        // Scale canvas CSS to display size
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';

        // Scale context to account for device pixel ratio
        this.ctx.scale(dpr, dpr);

        // Store display dimensions for particle positioning
        this.displayWidth = rect.width;
        this.displayHeight = rect.height;

        // Reposition existing particles proportionally if they exist
        if (this.particles.length > 0 && oldWidth > 0 && oldHeight > 0) {
            const scaleX = rect.width / (oldWidth / (window.devicePixelRatio || 1));
            const scaleY = rect.height / (oldHeight / (window.devicePixelRatio || 1));
            this.particles.forEach(particle => {
                particle.x *= scaleX;
                particle.y *= scaleY;
                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(rect.width, particle.x));
                particle.y = Math.max(0, Math.min(rect.height, particle.y));
            });
        }
    }

    createParticles() {
        this.particles = [];
        const width = this.displayWidth || this.canvas.width;
        const height = this.displayHeight || this.canvas.height;

        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                radius: Math.random() * (this.config.particleRadius.max - this.config.particleRadius.min) + this.config.particleRadius.min
            });
        }
    }

    setupEventListeners() {
        // Debounced resize handler
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
            }, 100);
        });

        if (this.config.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        // Update colors when theme changes
        const observer = new MutationObserver(() => {
            this.updateColors();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    updateColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            this.config.particleColor = 'rgba(129, 140, 248, 0.9)';     // Lighter purple for dark mode
            this.config.lineColor = 'rgba(129, 140, 248, 0.2)';
        } else {
            // Light mode: use darker slate colors
            this.config.particleColor = 'rgba(71, 85, 105, 0.8)';       // Slate gray
            this.config.lineColor = 'rgba(71, 85, 105, 0.15)';
        }
    }

    animate() {
        // Use logic dimensions for calculations
        const width = this.displayWidth || this.canvas.width;
        const height = this.displayHeight || this.canvas.height;

        // Clear using logical dimensions, scaled automatically by ctx
        this.ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges of logical space
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(width, particle.x));
            particle.y = Math.max(0, Math.min(height, particle.y));

            // Mouse interaction - particles move away from cursor
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                    particle.x += dx * force * 0.03;
                    particle.y += dy * force * 0.03;
                }
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.particleColor;
            this.ctx.fill();

            // Draw lines to nearby particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.lineMaxDistance) {
                    const opacity = 1 - (distance / this.config.lineMaxDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = this.config.lineColor.replace(/[\d.]+\)$/, (opacity * 0.3) + ')');
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }

            // Draw lines to mouse
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRadius) {
                    const opacity = 1 - (distance / this.config.mouseRadius);
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = this.config.particleColor.replace(/[\d.]+\)$/, (opacity * 0.5) + ')');
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check initial theme and set colors accordingly
    const network = new ParticleNetwork('particle-canvas');
    if (network.canvas) {
        network.updateColors();
    }
});
