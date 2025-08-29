import { CONFIG_DIR_YT_PLAYLISTS } from "../data.js";

const playlistUl = document.querySelector('ul#playlist-list');

window.onload = () => {
    const playlistTuples = window.soapi.listLocalPlaylists(CONFIG_DIR_YT_PLAYLISTS);

    playlistTuples.forEach(tuple => {
        const newLi = document.createElement('li');
        newLi.innerHTML = tuple['title'];

        playlistUl?.appendChild(newLi);
    });
};
