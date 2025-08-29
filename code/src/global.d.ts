export {};

declare global {
    interface Window {
        soapi: {
            listLocalPlaylists: (dirYtPlaylists: string) => {
                id: string
                title: string;
            }[];
        }
    }
}