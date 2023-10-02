// Sample data for chat cards and messages (replace with actual data)
const chatData = [
    {
        name: "Harris Ali Khan(codewithharry)",
        img: "../static/images/profile_images/harry bhai.jpg",
        status: "Online",
        messages: [
            { text: "Aur Adnan kya haal hain bhai ke", isMine: false },
            { text: "Bas badiya hai harry bhai", isMine: true },
        ],
    },
    {
        name: "Ashneer Grover",
        img: "../static/images/profile_images/ashneer.jpg",
        status: "Online",
        messages: [
            { text: "Aur ashneer sir kaisi chal rhi hai crickPe", isMine: true },
            { text: "Bas adnan sab badiya chal rha hai tu suna", isMine: false },
        ],
    },
    {
        name: "Aman Dhattarwal",
        img: "../static/images/profile_images/m2.jpg",
        status: "Last seen yesterday",
        messages: [
            { text: "Hi!", isMine: false },
            { text: "Good to see you.", isMine: true },
        ],
    },
];

// Function to populate chat cards in the sidebar
function populateChatList() {
    const chatList = document.querySelector(".chat-list");

    chatData.forEach((chat, index) => {
        const chatCard = document.createElement("div");
        chatCard.classList.add(
            "chat-card",
            "flex",
            "justify-between",
            "bg-white",
            "p-4",
            "mb-2",
            "cursor-pointer"
        );
        chatCard.innerHTML = `
            <div class="user-info flex">
                <img src="${chat.img}" alt="${chat.name}" width="56" class="pic mr-3 rounded-full">
                <div class="content">
                    <h2 class="text-lg font-bold">${chat.name}</h2>
                    <p class="message text-sm">
                        ${chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].text
                : ""
            }
                    </p>
                </div>
            </div>
            <div class="chat-status flex flex-col items-end">
                <p class="time mb-1 min-w-[72px]">${new Date().toLocaleTimeString()}</p>
                ${chat.messages.filter((msg) => !msg.isMine).length > 0
                ? `<div class="unread bg-green-200 py-1 text-sm px-3 mr-4 rounded-full">${chat.messages.filter((msg) => !msg.isMine).length
                }</div>`
                : ""
            }
            </div>
        `;

        chatCard.addEventListener("click", () => {
            loadChat(chat);
        });

        chatList.appendChild(chatCard);
    });
}

// Function to load chat messages in the chat window
const chatWindow = document.querySelector(".chat-window");
const profilePic = chatWindow.querySelector(".profile-pic");
const onlineStatus = chatWindow.querySelector(".online-status");
const messagesDiv = chatWindow.querySelector(".messages");
const backButton = chatWindow.querySelector("#backButton");
const deleteChatButton = chatWindow.querySelector("#deleteChat");
const messageInput = chatWindow.querySelector("#messageInput");
const sendMessageButton = chatWindow.querySelector("#sendMessage");
let currentChat;
function loadChat(chat) {
    currentChat = chat
    // Clear previous messages
    messagesDiv.innerHTML = "";

    // Set chat header
    const chatHeader = chatWindow.querySelector(".user-info h2");
    chatHeader.innerText = chat.name;
    onlineStatus.innerText = chat.status;
    profilePic.src = chat.img;

    // Populate messages
    chat.messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        let messageWrapper = document.createElement("div");
        messageDiv.classList.add("message", "max-w-[75%]", "mb-2", "rounded-md");

        if (msg.isMine) {
            messageWrapper.className = "flex justify-end";
            messageDiv.className = "right-4 mb-2 bg-white p-2 rounded-md flex-col items-end flex";
            messageWrapper.appendChild(messageDiv);
        } else {
            messageDiv.classList.add("bg-black", "text-white", "p-2", "mb-2", "rounded-md", "flex-col", "items-between", "justify-between", "flex");
        }

        messageDiv.innerHTML = `
            ${msg.text}
            <div class="status right-2">${new Date().toLocaleTimeString()} ${msg.isMine ? "&checkmark;" : ""
            }</div>
        `;
        if (msg.isMine) {
            messagesDiv.appendChild(messageWrapper);
        } else {
            messagesDiv.appendChild(messageDiv);
        }
    });

    const sidebar = document.querySelector("#sidebar");
    const chatSideBar = document.querySelector("main>section");
    let w = window.innerWidth;

    if (w < 768) {
        chatSideBar.classList.remove("hidden");
        sidebar.classList.add("hidden");
    } else {
        chatSideBar.classList.remove("hidden");
    }
}
// Back button click event
backButton.addEventListener("click", () => {
    const sidebar = document.querySelector("#sidebar");
    const chatSideBar = document.querySelector("main>section");
    let w = window.innerWidth;
    if (w < 768) {
        chatSideBar.classList.add("hidden");
        sidebar.classList.remove("hidden");
    } else {
        chatSideBar.classList.add("hidden");
    }
});

// Delete chat button click event (you can implement this)
deleteChatButton.addEventListener("click", () => {
    // Implement chat deletion logic here
});

// Send message button click event
sendMessageButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        // Send message logic here
        const isMine = true; // Assuming the message is sent by the current user
        const newMessage = { text: messageText, isMine };
        currentChat.messages.push(newMessage);
        messageInput.value = "";
        loadChat(currentChat); // Reload the chat to update messages
    }
});

// Initialize chat list
populateChatList();