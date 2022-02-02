const DURATION = 200;

let isCollapsed = true;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");
const btnTextEl = document.createElement('span');

btnTextEl.innerHTML = getBtnText(isCollapsed);
btn.appendChild(btnTextEl);

toggleClass(btn, "collapsed", isCollapsed);

function getBtnText (collapsed) {
    return collapsed ? "collapsed" : "expanded";
}

function toggleClass(element, className, collapsed) {
    if (collapsed) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

function toggleCollapsed(value) {
    return !value;
}


function incrementHeight(el, progress) {
    el.style.height = `${progress * el.scrollHeight}px`;
}

function decrementHeight(el, progress) {
    height = el.scrollHeight - progress * el.scrollHeight;
    el.style.height = `${el.scrollHeight - progress * el.scrollHeight}px`;
    el.style.overflow = "hidden";
}

function slideDown() {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / DURATION;
    
        const process = Math.min(relativeProgress, 1);
    
        if (process < 1) {
            incrementHeight(el, process);
            requestAnimationFrame(animate);
        }

        if (process === 1) {
            el.style.height = "auto";
            el.style.overflow = "initial";
        }
    });
}

function slideUp() {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / DURATION;
        const process = Math.min(relativeProgress, 1);

        if (process < 1) {
            decrementHeight(el, process);
            requestAnimationFrame(animate);
        }

        if (process === 1) {
            el.style.height = "";
            el.style.overflow = "";
        }
    });
}

function showHide(element, c) {
    toggleClass(element, "collapsed", c);
    if (c) {
        slideUp();
    } else {
        slideDown();
    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    isCollapsed = toggleCollapsed(isCollapsed);
    btnTextEl.innerHTML = getBtnText(isCollapsed);
  
    toggleClass(e.target, "collapsed", isCollapsed);
    showHide(e.target, isCollapsed);
});