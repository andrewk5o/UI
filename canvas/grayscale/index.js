import { imageOne } from "../base64.js";

/** @type {HTMLCanvasElement} */ 
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d", {
    alpha: false,
});
canvas.width = 800;
canvas.height = 450;

const image = new Image();
image.src = imageOne;

image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dataArray = imageData.data
    for (let i = 0; i < dataArray.length; i += 4) {
        const averageColor = (dataArray[i] + dataArray[i+1] + dataArray[i+2]) / 3;
        dataArray[i] = averageColor;
        dataArray[i+1] = averageColor;
        dataArray[i+2] = averageColor;
    }
    ctx.putImageData(imageData, 0, 0)
};
