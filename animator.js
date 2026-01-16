class Animator {
    constructor(spritesheet, startX, startY, frameWidth, frameHeight, frameCount, frameDuration) {
        this.spritesheet = spritesheet;
        this.startX = startX;
        this.startY = startY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameDuration = frameDuration;

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    }

    drawFrame(tick, ctx, x, y, scale = 1) {
        if (!this.spritesheet) return;

        this.elapsedTime += tick;
        if (this.elapsedTime >= this.totalTime) this.elapsedTime = 0;

        const frameIndex = Math.floor(this.elapsedTime / this.frameDuration);

        const sx = this.startX + frameIndex * this.frameWidth;
        const sy = this.startY;

const crop = 1;
const sx2 = sx + crop;
const sy2 = sy;
const sw2 = this.frameWidth - crop * 2;
const sh2 = this.frameHeight;

ctx.drawImage(
  this.spritesheet,
  sx2, sy2, sw2, sh2,
  Math.floor(x), Math.floor(y),
  this.frameWidth * scale, this.frameHeight * scale
);

    }
}
