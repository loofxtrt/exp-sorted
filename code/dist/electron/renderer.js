function clearContentList(contentListElement) {
    const children = document.querySelectorAll(`#${contentListElement.id}>*`);
    children.forEach(child => {
        contentListElement.removeChild(child);
    });
}
function loadDirectoryView(directory) {
    const contentUl = document.querySelector('ul#content-list');
    if (!contentUl) {
        console.error('Error while fetching content list');
        return;
    }
    // listar o id de todas as playlists obtidas via api
    let playlistIds = null;
    try {
        playlistIds = window.soapi.CALL_listLocalPlaylistsIds(directory);
    }
    catch (err) {
        console.error(err);
    }
    if (!playlistIds) {
        console.error('Error while loading directory');
        clearContentList(contentUl);
        return;
    }
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
    // carregar o diretório inicial onde ficam todas as playlists
    const playlistDirectory = window.soapi.CONFIG_DIR_YT_PLAYLISTS;
    loadDirectoryView(playlistDirectory);
    // exibir o nome da pasta
    const currentPathInput = document.querySelector('#current-path');
    if (currentPathInput) {
        currentPathInput.value = playlistDirectory;
    }
    // escutar novos inputs do usuário mudando de diretório
    currentPathInput.addEventListener('change', () => {
        loadDirectoryView(currentPathInput.value);
    });
};
export {};
//# sourceMappingURL=renderer.js.map