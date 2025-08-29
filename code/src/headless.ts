/**
 * anteriormente era main.ts, serve pra fazer testes via script sem usar a interface
 */

require('./data.js'); // roda a função que carrega as configs assim que é importado
const { CONFIG_DIR_YT_PLAYLISTS, CONFIG_ID_LENGTH } = require('./data.js');
const { createTestPlaylist } = require('./dummies.js');

function requireTestPlaylists(playlistCount: number = 10) {
    // gerar um número x de playlists de teste
    while (playlistCount > 0) {
        createTestPlaylist(CONFIG_DIR_YT_PLAYLISTS, CONFIG_ID_LENGTH);
        playlistCount -= 1;
    }
}

//requireTestPlaylists();