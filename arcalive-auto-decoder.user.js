// ==UserScript==
// @name arcalive-auto-decoder
// @version 1.0.1
// @author green1052
// @description 아카라이브 base64 내용을 자동으로 디코딩합니다.
// @match https://arca.live/b/*/*
// @namespace arcalive-auto-decoder
// @rut-at document-end
// @noframes
// @license GPLv3
// @downloadURL https://raw.githubusercontent.com/green1052/arcalive-auto-decoder/main/arcalive-auto-decoder.user.js
// @homepageURL https://github.com/green1052/arcalive-auto-decoder
// @require https://unpkg.com/url-regex-safe
// ==/UserScript==

(() => {
    "use strict";

    const content = document.querySelector("div.article-content");
    const matches = content.innerHTML.match(/(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})/g);

    for (const match of matches) {
        try {
            const decode = atob(match);

            if (!decode || !urlRegexSafe().test(decode)) continue;

            content.innerHTML = content.innerHTML.replace(match, `<a href="${decode}" target="_blank">${decode}</a>`);
        } catch {
        }
    }
})();
