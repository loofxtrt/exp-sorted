const { contextBridge } = require('electron');
const { listLocalPlaylists } = require('../interact/youtube.js');

contextBridge.exposeInMainWorld('soapi', {
    listLocalPlaylists: (dirYtPlaylists: string) => listLocalPlaylists(dirYtPlaylists)
});