document.querySelectorAll("a").forEach(link => link.onmouseover = (e) => {
	const link = e.target.getBoundingClientRect();
	const height = `${link.bottom - link.top}px`;
	const width = `${link.right - link.left}px`;
	const translate = `translate(${link.x}px, ${link.y}px)`;
	const slider = document.querySelector(".underline");
	slider.style.transform = translate;
	slider.style.width = width;
	slider.style.height = height;
});