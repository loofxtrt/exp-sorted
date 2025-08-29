"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const youtube_js_1 = require("../interact/youtube.js");
electron_1.contextBridge.exposeInMainWorld('soapi', {
    listLocalPlaylists: (dirYtPlaylists) => (0, youtube_js_1.listLocalPlaylists)(dirYtPlaylists)
});
//# sourceMappingURL=preload.js.map