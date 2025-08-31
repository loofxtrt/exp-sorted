import fs, { read } from 'fs';
import path from 'path';

export const getNameFor = {
    youtubeLocalPlaylist(playlistId: string) {
        return `youtube.playlist.local.${playlistId}.json`
    },
    youtubeServicePlaylist(playlistId: string) {
        return `youtube.playlist.service.${playlistId}.json`
    }
}

export function generateRandomId(idLength: number): string {
    // variáveis pra definir quais caracteres vão ser usados e inicializar o id vazio
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let finalId: string = '';

    // ir decrementando o idlength de um em um,
    // adicinando um caractere aleatório no id final
    while (idLength > 0) {
        // número aleatório pra ser um acesso a um índice da string de chars
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        // adicionar no id e passar pro próximo
        finalId += characters.charAt(randomIndex)
        --idLength
    }
    
    return finalId;
}

/* INCOMPLETO
export function readDirAsObject(directory: string) {
    // lê um diretório recursivamente e reconstrói a estrutura dele em um objeto
    const results: any = {};
    const items = fs.readdirSync(directory, { withFileTypes: true });

    
    items.forEach(i => {
        const fileFullPath = path.join(directory, i.name);
        
        if (i.isDirectory()) {
            results[i.name] = readDirAsObject(fileFullPath);
        } else {
            results[i.name] = null;
        }
    });

    return results;
}
*/