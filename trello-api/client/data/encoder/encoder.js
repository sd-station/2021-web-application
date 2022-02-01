export class excoder {
    encodedstring(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    decode(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
}
//# sourceMappingURL=encoder.js.map