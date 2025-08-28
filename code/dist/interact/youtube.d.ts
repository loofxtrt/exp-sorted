export interface PlaylistDataObject {
    id: string;
    type: 'local' | 'service';
    title: string;
    description: string;
    videos: string[];
}
export declare function extractVideoIdFromUrl(videoUrl: string): string | null;
export declare function generateLocalYoutubePlaylistJson(outputDir: string, id: string, title: string, description: string, videoUrls: string[]): void;
export declare function addVideoToExistingLocalYoutubePlaylist(playlistFilePath: string, videoUrl: string): void;
export declare function writeDataObjectToPlaylist(data: PlaylistDataObject, playlistFilePath: string): void;
export declare function removeVideoFromLocalYoutubePlaylist(playlistFilePath: string, videoId: string): void;
export declare function getLocalPlaylistPathFromId(youtubePlaylistsDir: string, playlistId: string): string | undefined;
export declare function readPlaylistFileAndParseContents(plFilePath: string): PlaylistDataObject;
export declare function readLocalPlaylists(youtubePlaylistsDir: string): void;
//# sourceMappingURL=youtube.d.ts.map