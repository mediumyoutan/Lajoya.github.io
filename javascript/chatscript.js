function sendMessage() {
    // 从输入框获取用户输入内容，如果输入为空或全是空格，则不进行后续操作。
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    // 创建一个包含用户输入消息的div元素，并添加到聊天框中。
    var chatbox = document.getElementById('chatbox');
    var userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.innerHTML = '<div class="message-content">' + userInput + '</div>';
    chatbox.appendChild(userMessage);

    // 清空输入框内容。
    document.getElementById('user-input').value = '';

    // 显示加载动画，延迟一段时间再调用getAIResponse函数
    setTimeout(function() {
        var loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'ai');
        loadingMessage.innerHTML = '<div class="message-content loading">正在输入中<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>';
        chatbox.appendChild(loadingMessage);
        chatbox.scrollTop = chatbox.scrollHeight;

        // 调用API获取AI回复
        getAIResponse(userInput, loadingMessage);
    }, 500); // 延迟500毫秒
}

function getAIResponse(question, loadingMessage) {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.coze.cn/open_api/v2/chat';
    var token = 'pat_HolcOKf6vOucOxB9Is8i18HBpxwP4Xeoni52gQyARq82fKzc7Cz8OJkiCgPEh9ph';
    var botId = '7391420520581300233';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', '*/*');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // 移除加载动画
            loadingMessage.parentNode.removeChild(loadingMessage);

            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.code === 0 && response.messages && response.messages.length > 1) {
                    var chatbox = document.getElementById('chatbox');
                    var aiMessage = document.createElement('div');
                    aiMessage.classList.add('message', 'ai');
                    aiMessage.innerHTML = '<div class="message-content">' + response.messages[1].content + '</div>';
                    chatbox.appendChild(aiMessage);
                    chatbox.scrollTop = chatbox.scrollHeight; // 滚动到底部
                } else {
                    console.error('Error from API or insufficient messages: ', response.msg);
                }
            } else {
                console.error('Error: ', xhr.status);
            }
        }
    };

    var data = JSON.stringify({
        "conversation_id": "123",
        "bot_id": botId,
        "user": "123333333",
        "query": question,
        "stream": false
    });
    xhr.send(data);
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
