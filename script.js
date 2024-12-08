"use strict";
// Відкриття та закриття модального вікна
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const header = document.getElementById("header");
const postsContainer = document.getElementById("posts");
const modalContent = document.querySelector(".modal-content");
if (openModalButton && modal && closeModalButton && header && postsContainer && modalContent) {
    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
        generateRandomEmojis(5); // Генеруємо 5 рандомних емодзі при відкритті модального вікна
    });
    closeModalButton.addEventListener("click", () => {
        var _a;
        modal.style.display = "none";
        (_a = modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення попередніх емодзі при закритті
    });
    window.addEventListener("click", (event) => {
        var _a;
        if (event.target === modal) {
            modal.style.display = "none";
            (_a = modalContent.querySelector(".emojis")) === null || _a === void 0 ? void 0 : _a.remove(); // Видалення емодзі при закритті
        }
    });
    // Анімація зміни кольору хедера при скролі
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "#555";
        }
        else {
            header.style.backgroundColor = "#333";
        }
    });
    // Завантаження даних через fetch та відображення
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
        .then((response) => response.json())
        .then((posts) => {
        postsContainer.innerHTML = "";
        posts.forEach((post) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            postsContainer.appendChild(postElement);
        });
    })
        .catch((error) => {
        postsContainer.innerHTML = "Помилка завантаження даних.";
        console.error(error);
    });
}
// Функція для генерації рандомних емодзі
function generateRandomEmojis(count) {
    if (!modalContent)
        return;
    const emojiRange = [0x1F600, 0x1F64F]; // Діапазон емодзі
    const emojiContainer = document.createElement("div");
    emojiContainer.className = "emojis";
    for (let i = 0; i < count; i++) {
        const randomCodePoint = Math.floor(Math.random() * (emojiRange[1] - emojiRange[0] + 1)) + emojiRange[0];
        const emoji = String.fromCodePoint(randomCodePoint);
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = emoji;
        emojiSpan.style.fontSize = "24px";
        emojiSpan.style.margin = "5px";
        emojiContainer.appendChild(emojiSpan);
    }
    modalContent.appendChild(emojiContainer);
}
