/**
 * arquivo que varre as configurações, e baseado nelas, define os valores globais que o software deve usar
 * toda variável global deve ser escrita em SNAKE_CASE e começar com CONFIG_
 */
export declare const CONFIG_ID_LENGTH = 32;
export declare let CONFIG_DIR_YT_ROOT: string;
export declare let CONFIG_DIR_YT_PLAYLISTS: string;
export interface PlaylistDataObject {
    id: string;
    type: 'local' | 'service';
    title: string;
    description: string;
    videos: string[];
}
//# sourceMappingURL=data.d.ts.map