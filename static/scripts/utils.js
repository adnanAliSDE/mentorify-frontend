const messageTyper = async (elem, msg, oldColor = 'text-black', color = 'text-black', setColorFirst = false) => {
    if (setColorFirst) {
        elem.classList.remove(oldColor)
        elem.classList.add(color)
    }
    const appendChar = (char) => {
        elem.textContent += char;
    };

    // traversing the message 
    let i = 0;
    let char = msg[i]
    setInterval(() => {
        if (i === msg.length) {
            if (!setColorFirst) {
                elem.classList.remove(oldColor)
                elem.classList.add(color)
            }
            return
        }
        appendChar(char);
        i += 1
        char = msg[i]
    }, 50);

};
