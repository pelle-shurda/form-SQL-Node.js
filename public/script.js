const textInput = document.getElementById('text');
const sendButton = document.getElementById('send');
const chatMessages = document.getElementById('chat-messages');


function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


async function sendMessage() {
    const message = textInput.value.trim();
   
    if (message === '') {
        return;
    }
   
    addMessage(message, true);
    textInput.value = '';
   
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    });
   
    const data = await response.json();
    addMessage(data.response, false);
}

sendButton.addEventListener('click', sendMessage);


textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});