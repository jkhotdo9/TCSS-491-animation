class Background {
    constructor(game, image) {
        this.game = game;
        this.image = image;
        this.x = 0;
    }

    update() {
        
        this.x += (this.game.bgScroll || 0);

        const w = this.image.width;

        this.x = ((this.x % w) + w) % w;
    }

    draw(ctx) {
        const w = this.image.width;
        const h = ctx.canvas.height;

        const xInt = Math.floor(this.x);

        let startX = -xInt;

        const overlap = 1;

        for (let dx = startX; dx < ctx.canvas.width; dx += (w - overlap)) {
            ctx.drawImage(this.image, dx, 0, w, h);
        }
    }
}
