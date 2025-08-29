"use strict";
/**
 * anteriormente era main.ts, serve pra fazer testes via script sem usar a interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("./data.js"); // roda a função que carrega as configs assim que é importado
const data_js_1 = require("./data.js");
const dummies_js_1 = require("./dummies.js");
function requireTestPlaylists(playlistCount = 10) {
    // gerar um número x de playlists de teste
    while (playlistCount > 0) {
        (0, dummies_js_1.createTestPlaylist)(data_js_1.CONFIG_DIR_YT_PLAYLISTS, data_js_1.CONFIG_ID_LENGTH);
        playlistCount -= 1;
    }
}
//requireTestPlaylists();
//# sourceMappingURL=headless.js.map