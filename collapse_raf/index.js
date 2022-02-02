const DURATION = 1000;

let isCollapsed = true;
let inProgress = false;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");
const btnTextEl = document.createElement('span');

btnTextEl.innerHTML = getBtnText(isCollapsed);
btn.appendChild(btnTextEl);

toggleClass(btn, "collapsed", isCollapsed);

btn.addEventListener("click", (e) => {
    if (!inProgress) {
        e.preventDefault();
        isCollapsed = toggleCollapsed(isCollapsed);
        btnTextEl.innerHTML = getBtnText(isCollapsed);
      
        toggleClass(e.target, "collapsed", isCollapsed);
        showHide(e.target, isCollapsed);
    }
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

function slide(callback, height = "", overflow = "") {
    const start = performance.now();
    inProgress = true;

    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / DURATION;
        const process = Math.min(relativeProgress, 1);
    
        if (process < 1) {
            callback(el, process);
            requestAnimationFrame(animate);
        }

        if (process === 1) {
            el.style.height = height;
            el.style.overflow = overflow;
            inProgress = false;
        }
    });
}

function showHide(element, collapsed) {
    toggleClass(element, "collapsed", collapsed);
    if (collapsed) {
        slide(decrementHeight);
    } else {
        slide(incrementHeight, "auto", "initial");
    }
}
