// ==UserScript==
// @name arcalive-auto-decoder
// @version 2.0.0
// @author green1052
// @description 아카라이브 base64 내용을 자동으로 디코딩합니다.
// @match https://arca.live/b/*/*
// @namespace arcalive-auto-decoder
// @rut-at document-end
// @noframes
// @license GPLv3
// @downloadURL https://raw.githubusercontent.com/green1052/arcalive-auto-decoder/main/arcalive-auto-decoder.user.js
// @homepageURL https://github.com/green1052/arcalive-auto-decoder
// ==/UserScript==

(() => {
    "use strict";

    const content = document.querySelector("div.article-content");

    function decode(regex) {
        while (regex.test(content.innerHTML)) {
            let decoded = regex.exec(content.innerHTML)[0];

            while (decoded.match(/aHR0c[0-9A-Za-z]{8,}[=]{0,2}/) == null) {
                decoded = atob(decoded);
            }

            decoded = atob(decoded);
            content.innerHTML = content.innerHTML.replace(regex, `<a href="${decoded}" target="_blank" rel="noreferrer">${decoded}</a>`);
        }
    }

    if (content === null) return;

    decode(/aHR0c[0-9A-Za-z]{20,}[=]{0,2}/); //aHR0c:1회인코딩된것.
    decode(/YUhSMGN[0-9A-Za-z]{80,}[=]{0,2}/); //YUhSMGN:2회인코딩된것.
    decode(/[0-9A-Za-z]{30,}[=]{1,2}/); //문자열 30회 + '=' 1~2회
    decode(/[0-9A-Za-z]{200,}[=]{0,2}/); //문자열 200회 + '=' 0~2회
})();
