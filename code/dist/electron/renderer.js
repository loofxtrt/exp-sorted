"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_js_1 = require("../data.js");
const playlistUl = document.querySelector('ul#playlist-list');
window.onload = () => {
    const playlistTuples = window.soapi.listLocalPlaylists(data_js_1.CONFIG_DIR_YT_PLAYLISTS);
    playlistTuples.forEach(tuple => {
        const newLi = document.createElement('li');
        newLi.innerHTML = tuple['title'];
        playlistUl?.appendChild(newLi);
    });
};
//# sourceMappingURL=renderer.js.map