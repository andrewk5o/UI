const DURATION = 1000;

let isCollapsed = true;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");
const btnTextEl = document.createElement('span');

btnTextEl.innerHTML = getBtnText(isCollapsed);
btn.appendChild(btnTextEl);

toggleClass(btn, "collapsed", isCollapsed);

btn.addEventListener("click", (e) => {
    e.preventDefault();
    isCollapsed = toggleCollapsed(isCollapsed);
    btnTextEl.innerHTML = getBtnText(isCollapsed);
  
    toggleClass(e.target, "collapsed", isCollapsed);
    showHide(e.target, isCollapsed);
});


// Animation methods
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
    el.style.height = `${el.scrollHeight - progress * el.scrollHeight}px`;
    el.style.overflow = "hidden";
}

function slideDown() {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / DURATION;
    
        if (relativeProgress < 1) {
            incrementHeight(el, relativeProgress);
            requestAnimationFrame(animate);
        }

        if (relativeProgress === 1) {
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

        if (relativeProgress < 1) {
            decrementHeight(el, relativeProgress);
            requestAnimationFrame(animate);
        }

        if (relativeProgress === 1) {
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
