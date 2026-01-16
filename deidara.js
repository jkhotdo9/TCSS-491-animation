class Deidara {
    constructor(game, idleSheet, runSheet, jumpSheet, dashSheet) {
        this.game = game;

        this.animations = {
            idle: new Animator(idleSheet, 0, 0, 124, 180, 2, 0.35),
            run:  new Animator(runSheet,  2, 0, 168, 180, 3, 0.10),
            jump: new Animator(jumpSheet, 0, 0, 94,  180, 3, 0.12),
            dash: new Animator(dashSheet, 0, 0, 125, 180, 3, 0.08),
        };

        this.state = "idle";

        this.scale = 1.0;
        this.speed = 200;
        this.dashSpeed = 600;

        this.x = 100;

        this.groundOffset = 190;
        this.groundY = this.game.ctx.canvas.height - this.groundOffset;
        this.y = this.groundY;

        this.velocityY = 0;
        this.gravity = 1800;
        this.jumpStrength = 650;
        this.isJumping = false;

        this.facingRight = true;

        this.jumpPressed = false;
        this.tryJump = false;

        this.keys = {};
        window.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;

            if (e.key === " " && !this.jumpPressed) {
                this.jumpPressed = true;
                this.tryJump = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;

            if (e.key === " ") {
                this.jumpPressed = false;
            }
        });
    }

    update() {
        const dt = this.game.clockTick;

        this.groundY = this.game.ctx.canvas.height - this.groundOffset;

        let currentSpeed = this.speed;
        if (this.keys["Shift"]) currentSpeed = this.dashSpeed;

        this.game.bgScroll = 0;

if (this.keys["ArrowRight"]) {
    this.x += currentSpeed * dt;
    this.facingRight = true;

    this.game.bgScroll = currentSpeed * dt * 0.5;
}

if (this.keys["ArrowLeft"]) {
    this.x -= currentSpeed * dt;
    this.facingRight = false;

    this.game.bgScroll = -currentSpeed * dt * 0.5;
}

        if (this.tryJump && !this.isJumping) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
        this.tryJump = false;

        this.velocityY += this.gravity * dt;
        this.y += this.velocityY * dt;

        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.velocityY = 0;
            this.isJumping = false;
        }

        const moving = this.keys["ArrowRight"] || this.keys["ArrowLeft"];

        if (this.isJumping) {
            this.state = "jump";
        } else if (this.keys["Shift"] && moving) {
            this.state = "dash";
        } else if (moving) {
            this.state = "run";
        } else {
            this.state = "idle";
        }

        const canvasWidth = this.game.ctx.canvas.width;
        const approxWidth = 150 * this.scale;

        if (this.x < 0) this.x = 0;
        if (this.x > canvasWidth - approxWidth) {
            this.x = canvasWidth - approxWidth;
        }
    }

    draw(ctx) {
        const anim = this.animations[this.state];

        const scaleFix = (this.state === "jump") ? 1.2 : 1;
        const s = this.scale * scaleFix;

        const drawX = Math.floor(this.x);
        const drawY = Math.floor(this.y - anim.frameHeight * s);

        ctx.save();

        if (!this.facingRight) {
            ctx.scale(-1, 1);
            anim.drawFrame(
                this.game.clockTick,
                ctx,
                -drawX - anim.frameWidth * s,
                drawY,
                s
            );
        } else {
            anim.drawFrame(
                this.game.clockTick,
                ctx,
                drawX,
                drawY,
                s
            );
        }

        ctx.restore();

    }
}
