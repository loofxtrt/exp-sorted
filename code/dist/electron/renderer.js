function loadDirectoryView(directory) {
    const contentUl = document.querySelector('ul#content-list');
    const contentLabel = document.querySelector('label#content-label');
    // exibir o nome da pasta
    if (contentLabel) {
        contentLabel.innerHTML = '@playlists';
    }
    // listar o id de todas as playlists obtidas via api
    const playlistIds = window.soapi.CALL_listLocalPlaylistsIds(directory);
    playlistIds.forEach(plId => {
        // obter os outros valores da playlist atual com base no id dela
        function getValueFromThisPl(targetValue) {
            return window.soapi.CALL_getPlaylistDataValueById(directory, plId, targetValue);
        }
        const title = getValueFromThisPl('title');
        const description = getValueFromThisPl('description');
        const videos = getValueFromThisPl('videos');
        const family = getValueFromThisPl('family');
        const videoCount = videos.length;
        // criar o row da playlist
        const newLi = document.createElement('li');
        newLi.className = 'playlist-row';
        newLi.dataset.playlistId = plId; // adicionar o data-*, nesse caso o id da playlist que fica oculto visualmente
        newLi.innerHTML = `
        <input type="checkbox" name="select-playlist" id="select-playlist">
            
        <img src="../../assets/thumbnail-placeholder.svg" alt="thumbnail" class="thumbnail">

        <div class="row-contents">
            <p class="title">${title}</p>
            <p class="description trivial-text">${description}</p>

            <div class="footer-info">
                <span class="video-count">
                    <span class="material-symbols-outlined">bookmark</span>
                    ${videoCount} videos
                </span>

                <span class="family">
                    <span class="material-symbols-outlined">hard_drive</span>
                    ${family}
                </span>

                <span class="playlist-id">
                    <span class="material-symbols-outlined">content_copy</span>
                    copy id
                </span>
            </div>
        </div>
        `;
        contentUl?.appendChild(newLi);
    });
}
window.onload = () => {
    const playlistDirectory = window.soapi.CONFIG_DIR_YT_PLAYLISTS;
    loadDirectoryView(playlistDirectory);
};
export {};
//# sourceMappingURL=renderer.js.map