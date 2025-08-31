import { contextBridge } from 'electron';
import { getPlaylistDataValueById, listLocalPlaylistsIds } from '../interact/youtube.js';
import { CONFIG_DIR_YT_PLAYLISTS } from '../data.js';
contextBridge.exposeInMainWorld('soapi', {
    // listar aqui as variáveis e funções que o renderer deve ter acesso
    // também devem ser definidas no global.d.ts
    // * a maioria das funções aqui não recebem args prontos, o renderer que tem que passar pra elas
    // * o prefixo call é atribuido a elas pra que elas nao sejam confundidas com as funções originais
    CONFIG_DIR_YT_PLAYLISTS,
    CALL_listLocalPlaylistsIds(dirYtPlaylists) {
        return listLocalPlaylistsIds(dirYtPlaylists);
    },
    CALL_getPlaylistDataValueById(dirYtPlaylists, playlistId, objectKey) {
        return getPlaylistDataValueById(dirYtPlaylists, playlistId, objectKey);
    }
});
//# sourceMappingURL=preload.js.map