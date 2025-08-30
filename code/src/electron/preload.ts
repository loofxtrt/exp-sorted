import { contextBridge } from 'electron';
import { listLocalPlaylists } from '../interact/youtube.js';
import { CONFIG_DIR_YT_PLAYLISTS } from '../data.js';

contextBridge.exposeInMainWorld('soapi', {
    // listar aqui as variáveis e funções que o renderer deve ter acesso
    CONFIG_DIR_YT_PLAYLISTS,
    listLocalPlaylists: (dirYtPlaylists: string) => listLocalPlaylists(dirYtPlaylists)
});