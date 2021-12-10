const svg = document.querySelector("#Triangles")
svg.onclick = (e) => {
    const colors = ["red", "green", "blue", "orange", "pink", "purple"];
    const randColor = () => colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.cssText = `
        --dark-color: ${randColor()}; 
        --light-color: ${randColor()};
    `;
}