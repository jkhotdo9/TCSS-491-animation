const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/deidara_idle.png");
ASSET_MANAGER.queueDownload("./sprites/deidara_run.png");
ASSET_MANAGER.queueDownload("./sprites/deidara_jump.png");
ASSET_MANAGER.queueDownload("./sprites/deidara_dash.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = 600; 
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;

    gameEngine.init(ctx);

    const bg   = ASSET_MANAGER.getAsset("./sprites/background.png");
    const idle = ASSET_MANAGER.getAsset("./sprites/deidara_idle.png");
    const run  = ASSET_MANAGER.getAsset("./sprites/deidara_run.png");
    const jump = ASSET_MANAGER.getAsset("./sprites/deidara_jump.png");
    const dash = ASSET_MANAGER.getAsset("./sprites/deidara_dash.png");


	gameEngine.addEntity(new Deidara(gameEngine, idle, run, jump, dash));

	gameEngine.addEntity(new Background(gameEngine, bg));




    gameEngine.start();
});
