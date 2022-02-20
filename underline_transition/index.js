const links = document.querySelectorAll("a");
const slider = document.querySelector(".underline");

const getInitialPosition = (element) => {
	return {x, y, width, height} = element.getBoundingClientRect();
} 

const initPosition = getInitialPosition(links[0]);

slider.style.width = `${initPosition.width}px`;
slider.style.height = `${initPosition.height}px`;
slider.style.transform = `translate(${initPosition.x}px, ${initPosition.y}px)`;

links.forEach(link => link.onmouseover = (e) => {
	const link = e.target.getBoundingClientRect();
	const height = `${link.height}px`;
	const width = `${link.width}px`;
	const translate = `translate(${link.x}px, ${link.y}px)`;

	slider.style.transform = translate;
	slider.style.width = width;
	slider.style.height = height;
});