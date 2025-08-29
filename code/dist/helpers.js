"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFor = void 0;
exports.generateRandomId = generateRandomId;
exports.getNameFor = {
    youtubeLocalPlaylist(playlistId) {
        return `youtube.playlist.local.${playlistId}.json`;
    },
    youtubeServicePlaylist(playlistId) {
        return `youtube.playlist.service.${playlistId}.json`;
    }
};
function generateRandomId(idLength) {
    // variáveis pra definir quais caracteres vão ser usados e inicializar o id vazio
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let finalId = '';
    // ir decrementando o idlength de um em um,
    // adicinando um caractere aleatório no id final
    while (idLength > 0) {
        // número aleatório pra ser um acesso a um índice da string de chars
        const randomIndex = Math.floor(Math.random() * characters.length);
        // adicionar no id e passar pro próximo
        finalId += characters.charAt(randomIndex);
        --idLength;
    }
    return finalId;
}
//# sourceMappingURL=helpers.js.map