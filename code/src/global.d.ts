export {}; // declarar o arquivo como módulo

declare global {
    // acessar a interface já existente de browsers (Window)
    // e adicionar o atributo da api nela, pra que o renderer possa usar window.{nome da api}.{função ou valor}
    interface Window {
        soapi: {
            CONFIG_DIR_YT_PLAYLISTS: string,
            listLocalPlaylists: (dirYtPlaylists: string) => string[];
        }
    }
}