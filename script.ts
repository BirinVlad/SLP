// Відкриття та закриття модального вікна
const openModalButton: HTMLElement | null = document.getElementById("openModal");
const modal: HTMLElement | null = document.getElementById("modal");
const closeModalButton: HTMLElement | null = document.getElementById("closeModal");
const header: HTMLElement | null = document.getElementById("header");
const postsContainer: HTMLElement | null = document.getElementById("posts");
const modalContent: HTMLElement | null = document.querySelector(".modal-content");

if (openModalButton && modal && closeModalButton && header && postsContainer && modalContent) {
    openModalButton.addEventListener("click", () => {
        modal.style.display = "block";
        generateRandomEmojis(5); // Генеруємо 5 рандомних емодзі при відкритті модального вікна
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalContent.querySelector(".emojis")?.remove(); // Видалення попередніх емодзі при закритті
    });

    window.addEventListener("click", (event: MouseEvent) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modalContent.querySelector(".emojis")?.remove(); // Видалення емодзі при закритті
        }
    });

    // Анімація зміни кольору хедера при скролі
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "#555";
        } else {
            header.style.backgroundColor = "#333";
        }
    });

    // Завантаження даних через fetch та відображення
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
        .then((response: Response) => response.json())
        .then((posts: Array<{ title: string; body: string }>) => {
            postsContainer.innerHTML = "";
            
            posts.forEach((post: { title: string; body: string }) => {
                const postElement: HTMLDivElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                postsContainer.appendChild(postElement);
            });
        })
        .catch((error: any) => {
            postsContainer.innerHTML = "Помилка завантаження даних.";
            console.error(error);
        });
}

// Функція для генерації рандомних емодзі
function generateRandomEmojis(count: number): void {
    if (!modalContent) return;
    const emojiRange: [number, number] = [0x1F600, 0x1F64F]; // Діапазон емодзі
    const emojiContainer: HTMLDivElement = document.createElement("div");
    emojiContainer.className = "emojis";
    
    for (let i = 0; i < count; i++) {
        const randomCodePoint: number = Math.floor(Math.random() * (emojiRange[1] - emojiRange[0] + 1)) + emojiRange[0];
        const emoji: string = String.fromCodePoint(randomCodePoint);
        
        const emojiSpan: HTMLSpanElement = document.createElement("span");
        emojiSpan.textContent = emoji;
        emojiSpan.style.fontSize = "24px";
        emojiSpan.style.margin = "5px";
        
        emojiContainer.appendChild(emojiSpan);
    }

    modalContent.appendChild(emojiContainer);
}
