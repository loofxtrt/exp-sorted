import './data.js'; // roda a função que carrega as configs assim que é importado
import { CONFIG_DIR_YT_PLAYLISTS } from './data.js';
import { createTestPlaylist } from './dummies.js';
import { addVideoToLocalPlaylist, removeVideoFromLocalPlaylist } from './interact/youtube.js';
function requireTestPlaylists(playlistCount = 10) {
    // gerar um número x de playlists de teste
    while (playlistCount > 0) {
        createTestPlaylist(CONFIG_DIR_YT_PLAYLISTS);
        playlistCount -= 1;
    }
}
//requireTestPlaylists();
//# sourceMappingURL=main.js.map