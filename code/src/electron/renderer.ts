const playlistUl = document.querySelector('ul#playlist-list');

window.onload = () => {
    const playlistTuples = window.soapi.listLocalPlaylists(window.soapi.CONFIG_DIR_YT_PLAYLISTS);

    playlistTuples.forEach(plId => {
        const newLi = document.createElement('li');
        newLi.innerHTML = plId;

        playlistUl?.appendChild(newLi);
    });
};
