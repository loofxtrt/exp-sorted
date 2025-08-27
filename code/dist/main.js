import fs from 'fs';
import path from 'path';
import logger from './logger.js';
function extractVideoIdFromUrl(videoUrl) {
    // esse regex obtém tudo que vem depois de 'v=' mas para de obter caracteres se encontrar um '&' ou se chegar ao fim da string
    // o que resta disso é o id do vídeo, que geralmente fica depois de watch?v=
    // e o & pode aparecer na url caso o link do vídeo tenha sido copiado a partir de uma playlist ou tenha um timestamp na url
    const urlRegex = /v=(.*?)(&|$)/;
    const match = videoUrl.match(urlRegex);
    if (match) {
        // retornar o id obtido
        const videoId = match[1];
        if (videoId) {
            logger.success(`Successfully extracted video ID`, videoId);
            return videoId;
        }
        else {
            logger.error('Matches were found but something went wrong while extracing video ID');
            return null;
        }
    }
    else {
        logger.error('Error while extracting video ID', 'no matches');
        return null;
    }
}
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
function generateLocalYoutubePlaylistJson(outputDir, id, title, description, videoUrls) {
    // formatar o id com prefixo que indica uma playlist local
    if (!id.startsWith('LOC')) {
        id = 'LOC' + id;
    }
    // limpar a url dos vídeos pra remover modificadores
    // e adiciona-las a um novo array
    let cleanUrls = [];
    videoUrls.forEach(url => {
        const videoId = extractVideoIdFromUrl(url);
        if (videoId) {
            cleanUrls.push(videoId);
        }
    });
    // criar o objeto javascripte que representa os dados da playlist
    // e logo depois converter pra um json com 4 espaços de indentação
    const plDataObject = {
        'id': id,
        'type': 'local',
        'title': title,
        'description': description,
        'videos': cleanUrls
    };
    const plDataString = JSON.stringify(plDataObject, null, 4);
    // escrever o arquivo final
    const savePath = path.join(outputDir, `youtube.playlist.local.${id}.json`);
    fs.writeFileSync(savePath, plDataString, 'utf-8');
}
function addVideoToExistingLocalYoutubePlaylist(allYoutubePlaylistsDir, localPlaylistId, videoUrl) {
    const videoId = extractVideoIdFromUrl(videoUrl);
    const plPath = path.join(allYoutubePlaylistsDir, `youtube.playlist.local.${localPlaylistId}.json`);
    // ler o arquivo passado e converter os dados de string pra objeto
    const plDataString = fs.readFileSync(plPath, 'utf-8');
    const plDataObject = JSON.parse(plDataString);
    // ignorar a requisição de adição caso o vídeo já esteja na playlist
    if (plDataObject.videos.includes(videoId)) {
        logger.info('Ignored video inclusion on playlist', 'video already exists');
        return;
    }
    // adicionar o id do video no array dos dados e escrever eles de volta no mesmo arquivo
    plDataObject.videos.push(videoId);
    fs.writeFileSync(plPath, JSON.stringify(plDataObject, null, 4), 'utf-8');
    logger.success('Added video ID to playlist', videoId);
}
generateLocalYoutubePlaylistJson('./output', generateRandomId(32), 'Lorem Ipsum', 'Hello, World!', [
    'https://www.youtube.com/watch?v=1JOnihp4tHI',
    'https://www.youtube.com/watch?v=SmUloGNpFGY',
    'https://www.youtube.com/watch?v=yiWQ2E9MWm8&t=7371s',
    'https://www.youtube.com/watch?v=SmUloGNpFGY&list=PLqIOCEYgBP5Gej7nFzDknWFEdruxnXkqS&index=10'
]);
addVideoToExistingLocalYoutubePlaylist('/mnt/seagate/workspace/coding/sandbox/sorted-tests/output', 'LOCbYSy1Uc5E8WRSQAThfbS1NAf3FGgdGr4', 'https://www.youtube.com/watch?v=w30zWauuoGw');
//console.log(generateRandomId(32));
//# sourceMappingURL=main.js.map