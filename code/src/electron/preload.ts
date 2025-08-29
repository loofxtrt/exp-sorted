import { contextBridge } from 'electron';
import { listLocalPlaylists } from '../interact/youtube.js';

contextBridge.exposeInMainWorld('soapi', {
    listLocalPlaylists: (dirYtPlaylists: string) => listLocalPlaylists(dirYtPlaylists)
});