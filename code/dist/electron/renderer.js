"use strict";
//const { CONFIG_DIR_YT_PLAYLISTS } = require('../data.js');
Object.defineProperty(exports, "__esModule", { value: true });
const playlistUl = document.querySelector('ul#playlist-list');
window.onload = () => {
    const playlistTuples = window.soapi.listLocalPlaylists(CONFIG_DIR_YT_PLAYLISTS);
    playlistTuples.forEach(tuple => {
        const newLi = document.createElement('li');
        newLi.innerHTML = tuple['title'];
        playlistUl?.appendChild(newLi);
    });
};
//# sourceMappingURL=renderer.js.map