/**
 * toda vez que algo é referenciado como "playlist" significa o ARQUIVO QUE REPRESENTA AQUELA PLAYLIST, seja ela local ou remota
 */
export interface PlaylistDataObject {
    id: string;
    type: 'local' | 'service';
    title: string;
    description: string;
    videos: string[];
}
export declare function extractVideoIdFromUrl(videoUrl: string): string | null;
export declare function writeLocalPlaylist(outputDir: string, id: string, title: string, description: string, videoUrls: string[]): void;
export declare function addVideoToLocalPlaylist(playlistFilePath: string, videoUrl: string): void;
export declare function writeDataToLocalPlaylist(data: PlaylistDataObject, playlistFilePath: string): void;
export declare function removeVideoFromLocalPlaylist(playlistFilePath: string, targetVideoId: string): void;
export declare function getLocalPlaylistPathFromId(youtubePlaylistsDir: string, playlistId: string): string | undefined;
export declare function readAndParseLocalPlaylist(plFilePath: string): PlaylistDataObject;
export declare function listLocalPlaylists(youtubePlaylistsDir: string): void;
//# sourceMappingURL=youtube.d.ts.map