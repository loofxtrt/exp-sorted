window.onload = () => {
    const contentUl = document.querySelector('ul#content-list');
    const contentLabel = document.querySelector('label#content-label');
    if (contentLabel) {
        contentLabel.innerHTML = '@playlists';
    }
    // listar o id de todas as playlists obtidas via api
    const playlists = window.soapi.listLocalPlaylistsIds(window.soapi.CONFIG_DIR_YT_PLAYLISTS);
    playlists.forEach(plObject => {
        const id = plObject;
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <div class="playlist-row">
            <input type="checkbox" name="select-playlist" id="select-playlist">
            
            <div class="row-content">
                <p class="title">${id}</p>
                <p class="description">Lorem Ipsum</p>
                <p class="type">Local</p>
            </div>
        </div>
        `;
        contentUl?.appendChild(newLi);
    });
};
export {};
//# sourceMappingURL=renderer.js.map