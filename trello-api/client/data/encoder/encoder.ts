export class excoder {

    encodedstring(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    decode(str: string) {
        return decodeURIComponent(escape(window.atob(str)));
    }
}
