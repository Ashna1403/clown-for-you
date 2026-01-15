const inputBox = document.querySelector("input");
const send = document.querySelector(".send");
const chatBox = document.querySelector(".chat-box");

if (!inputBox || !send || !chatBox) {
  console.error("Required DOM elements not found!");
}


function toggleSendBtn() {
  send.style.display = inputBox.value.trim() ? "block" : "none";
}

send.addEventListener("click", async () => {
  const userMessage = inputBox.value.trim();
  if (!userMessage) return; 

  
  function addMessage(userText, aiText) {
    const usermsg = document.createElement("h4");
    usermsg.className = "user";
    usermsg.textContent = userText;
    chatBox.appendChild(usermsg);

    const aiMsg = document.createElement("h5");
    aiMsg.className = "ai";
    aiMsg.textContent = aiText;
    chatBox.appendChild(aiMsg);

    inputBox.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  if (userMessage.toLowerCase() === "stop") {
    addMessage(userMessage, "Okay, I'll stop here. Take care!");
    return;
  }
  if (userMessage.toLowerCase() === "thank you") {
    addMessage(userMessage, "You're welcome! I'm glad you liked it!");
    return;
  }
  if (userMessage.toLowerCase() === "hey") {
    addMessage(userMessage, "hey are you ready to laugh!");
    return;
  }

  
  const usermsg = document.createElement("h4");
  usermsg.className = "user";
  usermsg.textContent = userMessage;
  chatBox.appendChild(usermsg);
  inputBox.value = "";

  
  const botMsg = document.createElement("h5");
  botMsg.className = "ai";
  botMsg.textContent = "Loading...";
  chatBox.appendChild(botMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    const data = await response.json();
    let joke = data.joke ? data.joke : "I couldn't fetch a joke. Please try again.";
    botMsg.textContent = joke;
  } catch (error) {
    console.error("Error occurred:", error);
    botMsg.textContent = "Sorry, something went wrong. Please try again later.";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

inputBox.addEventListener("input", toggleSendBtn);
inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && inputBox.value.trim()) {
    send.click();
  }
});
toggleSendBtn();