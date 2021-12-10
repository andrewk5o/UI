import { imageTwo } from "../base64.js";

const image = new Image();
image.src = imageTwo;

image.addEventListener("load", () => {
    /** @type {HTMLCanvasElement} */ 
    const canvas = document.querySelector("#canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 700;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let mappedImage = [];
    let particlesArray = [];

    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [brightness];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt((red * red * 0.299) + (green * green * 0.587) + (blue * blue * 0.114)) / 100;
    }

    const numberOfParticles = 5000;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.5;
            this.size = Math.random() * 1.5 + 1;
            this.positionX = Math.floor(this.x);
            this.positionY = Math.floor(this.y);
        }

        update() {
            this.positionX = Math.floor(this.x);
            this.positionY = Math.floor(this.y);
            this.speed = mappedImage[this.positionY][this.positionX][0];
            let movement = 2.5 - this.speed + this.velocity;
            this.y += movement;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i=0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle);
        }
    }

    function animate () {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        for (let i=0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.5;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
