document.addEventListener('DOMContentLoaded', function () {
    const assistantMessage = document.getElementById('ai-assistant-message');
    const summonButton = document.getElementById('summon-assistant');
    const sections = document.querySelectorAll('.section');
    let assistantActive = false;
    let isTyping = false;
    let introTimer = null;

    summonButton.addEventListener('click', function () {
        assistantActive = !assistantActive;
        if (assistantActive) {
            assistantMessage.textContent = ''; // 清空内容
            assistantMessage.classList.add('show');
            assistantMessage.classList.remove('hide');
            flashCursor();

            typeWriter('智能助手已激活！', assistantMessage, function() {
                setTimeout(function() {
                    assistantMessage.classList.add('hide');
                    assistantMessage.classList.remove('show');

                    setTimeout(function() {
                        assistantMessage.classList.add('show');
                        assistantMessage.classList.remove('hide');
                        typeWriter('这里是AI小助理的介绍内容', assistantMessage);
                    }, 300); // 淡出效果完成后显示介绍信息
                }, 3000); // 3秒后显示介绍信息
            });
        } else {
            assistantMessage.classList.add('hide');
            assistantMessage.classList.remove('show');
        }
    });

    sections.forEach(section => {
        section.addEventListener('mouseenter', function (event) {
            if (assistantActive) {
                const introText = section.getAttribute('data-intro');
                if (introText) {
                    clearTimeout(introTimer); // 清除之前的定时器
                    introTimer = setTimeout(() => {
                        if (!isTyping) {
                            introQueue.push({
                                text: introText,
                                x: event.clientX,
                                y: event.clientY
                            });
                            processQueue();
                        }
                    }, 3000); // 延迟3秒显示介绍信息
                }
            }
        });

        section.addEventListener('mouseleave', function () {
            clearTimeout(introTimer); // 鼠标离开时清除定时器
        });
    });

    let introQueue = [];

    function processQueue() {
        if (introQueue.length > 0 && !isTyping) {
            isTyping = true;
            const { text, x, y } = introQueue.shift();
            assistantMessage.textContent = ''; // 清空内容
            assistantMessage.style.top = `${y}px`;
            assistantMessage.style.left = `${x}px`;
            assistantMessage.classList.add('show');
            assistantMessage.classList.remove('hide');
            typeWriter(text, assistantMessage, function() {
                setTimeout(() => {
                    assistantMessage.classList.add('hide');
                    assistantMessage.classList.remove('show');
                    isTyping = false;
                    processQueue();
                }, 3000); // 在显示完成后停留3秒
            });
        }
    }

    function typeWriter(text, element, callback) {
        let index = 0;
        const typing = setInterval(function() {
            element.textContent += text[index];
            index++;
            if (index >= text.length) {
                clearInterval(typing);
                if (callback) callback();
            }
        }, 100); // 打字速度，可以根据需要调整
    }

    function flashCursor() {
        const originalCursor = document.body.style.cursor;
        let flashing = true;

        const cursorFlashInterval = setInterval(() => {
            document.body.style.cursor = flashing ? 'none' : originalCursor;
            flashing = !flashing;
        }, 500); // 光标闪烁速度

        setTimeout(() => {
            clearInterval(cursorFlashInterval);
            document.body.style.cursor = originalCursor;
        }, 3000); // 停止光标闪烁时间
    }

    document.addEventListener('mousemove', function(event) {
        if (assistantActive) {
            assistantMessage.style.top = `${event.clientY + 10}px`;
            assistantMessage.style.left = `${event.clientX + 10}px`;
        }
    });
});
