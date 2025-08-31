window.onload = () => {
    const playlistDirectory = window.soapi.CONFIG_DIR_YT_PLAYLISTS;
    const contentUl = document.querySelector('ul#content-list');
    const contentLabel = document.querySelector('label#content-label');
    if (contentLabel) {
        contentLabel.innerHTML = '@playlists';
    }
    // listar o id de todas as playlists obtidas via api
    const playlistIds = window.soapi.CALL_listLocalPlaylistsIds(playlistDirectory);
    playlistIds.forEach(plId => {
        // obter os valores restantes da playlist atual com base no id dela
        function getValueFromThisPl(targetValue) {
            return window.soapi.CALL_getPlaylistDataValueById(playlistDirectory, plId, targetValue);
        }
        const title = getValueFromThisPl('title');
        const description = getValueFromThisPl('description');
        const videos = getValueFromThisPl('videos');
        const family = getValueFromThisPl('family');
        const videoCount = videos.length;
        // criar o row da playlist
        const newLi = document.createElement('li');
        newLi.innerHTML = `
        <div class="playlist-row" data-playlist-id="${plId}">
            <input type="checkbox" name="select-playlist" id="select-playlist">
            
            <img src="../../assets/thumbnail-placeholder.svg" alt="thumbnail" class="thumbnail">

            <div class="row-contents">
                <p class="title">${title}</p>
                <p class="description">${description}</p>

                <div class="footer-info">
                    <span class="video-count">
                        <span class="material-symbols-outlined">movie</span>
                        ${videoCount} videos
                    </span>

                    <span class="family">
                        <span class="material-symbols-outlined">hard_drive_2</span>
                        ${family}
                    </span>
                </div>
            </div>
        </div>
        `;
        contentUl?.appendChild(newLi);
    });
};
export {};
//# sourceMappingURL=renderer.js.map