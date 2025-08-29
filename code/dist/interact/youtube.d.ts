/**
 * toda vez que algo é referenciado como "playlist" significa o ARQUIVO QUE REPRESENTA AQUELA PLAYLIST, seja ela local ou remota
 */
import type { PlaylistDataObject } from '../data.js';
export declare function extractVideoIdFromUrl(videoUrl: string): string | null;
export declare function writeLocalPlaylist(dirYtPlaylists: string, id: string, title: string, description: string, videoUrls: string[]): void;
export declare function addVideoToLocalPlaylist(filePlaylist: string, videoUrl: string): void;
export declare function writeDataToLocalPlaylist(data: PlaylistDataObject, filePlaylist: string): void;
export declare function removeVideoFromLocalPlaylist(filePlaylist: string, videoUrl: string): void;
export declare function getLocalPlaylistPathFromId(dirYtPlaylists: string, playlistId: string): string | undefined;
export declare function readAndParseLocalPlaylist(filePlaylist: string): PlaylistDataObject;
export declare function listLocalPlaylists(dirYtPlaylists: string): void;
//# sourceMappingURL=youtube.d.ts.map