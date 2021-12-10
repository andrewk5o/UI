const lists = document.querySelectorAll(".list");

const activeLink = (e) => {
    lists.forEach(item => item.classList.remove("active"));
    e.currentTarget.classList.add("active")
}

lists.forEach(item => item.onclick = activeLink);