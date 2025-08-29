"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge } = require('electron');
const { listLocalPlaylists } = require('../interact/youtube.js');
contextBridge.exposeInMainWorld('soapi', {
    listLocalPlaylists: (dirYtPlaylists) => listLocalPlaylists(dirYtPlaylists)
});
//# sourceMappingURL=preload.js.map