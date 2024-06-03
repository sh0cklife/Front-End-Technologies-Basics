function encodeAndDecodeMessages() {
    let buttons = document.getElementsByTagName('button');
    let encodeButton = buttons[0];
    let decodeButton = buttons[1];

    let textAreas = document.getElementsByTagName('textarea');
    let encodeArea = textAreas[0];
    let decodeArea = textAreas[1]

    function transformText(text, transformationFunction){
        return text.split('').map(transformationFunction).join('');
    }

    function nextChar(char){
        return String.fromCharCode(char.charCodeAt() + 1);
    }

    function previousChar(char){
        return String.fromCharCode(char.charCodeAt() - 1);
    }

    function encodeText(){
        let encodeText = encodeArea.value;
        decodeArea.value = transformText(encodeText, nextChar);
        encodeArea.value = '';
    }

    function decodeText(){
        decodeArea.value = transformText(decodeArea.value, previousChar);
    }

    encodeButton.addEventListener('click', encodeText);
    decodeButton.addEventListener('click', decodeText);
}