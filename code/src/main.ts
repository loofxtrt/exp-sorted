import './data.js'; // roda a função que carrega as configs assim que é importado
import { pathYtPlaylists } from './data.js';
import { generateRandomId } from './helpers.js';
import { createTestPlaylist } from './dummies.js';
import { writeLocalPlaylist, addVideoToLocalPlaylist, removeVideoFromLocalPlaylist } from './interact/youtube.js';

function requireTestPlaylists(playlistCount: number = 10) {
    // gerar um número x de playlists de teste
    while (playlistCount > 0) {
        createTestPlaylist(pathYtPlaylists);
        playlistCount -= 1;
    }
}

//requireTestPlaylists();