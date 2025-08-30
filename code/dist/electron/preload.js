import { contextBridge } from 'electron';
import { listLocalPlaylistsIds } from '../interact/youtube.js';
import { CONFIG_DIR_YT_PLAYLISTS } from '../data.js';
contextBridge.exposeInMainWorld('soapi', {
    // listar aqui as variáveis e funções que o renderer deve ter acesso
    CONFIG_DIR_YT_PLAYLISTS,
    listLocalPlaylistsIds: (dirYtPlaylists) => listLocalPlaylistsIds(dirYtPlaylists)
});
//# sourceMappingURL=preload.js.map