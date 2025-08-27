import fs from 'fs';
import path from 'path';

import logger from './logger.js';

function extractVideoIdFromUrl(videoUrl) {
    // esse regex obtém tudo que vem depois de 'v=' mas para de obter caracteres se encontrar um '&' ou se chegar ao fim da string
    // o que resta disso é o id do vídeo, que geralmente fica depois de watch?v=
    // e o & pode aparecer na url caso o link do vídeo tenha sido copiado a partir de uma playlist ou tenha um timestamp na url
    const urlRegex = /v=(.*?)(&|$)/
    const match = videoUrl.match();
    
    if (match) {
        // retornar o id obtido
        const videoId = match[1];
        
        logger.success(`Successfully cleaned video URL and got video ID`, videoId);
        return videoId;
    } else {
        logger.error('Error while cleaning video URL', 'no matches');
        return null;
    }
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
            cleanUrls.push(videoId)
        }
    });
    
    // criar o objeto javascripte que representa os dados da playlist
    // e logo depois converter pra um json com 4 espaços de indentação
    const plDataObject = {
        'id': id,
        'title': title,
        'description': description,
        'videos': cleanUrls
    }
    const plDataString = JSON.stringify(
        plDataObject,
        null,
        4
    );

    // escrever o arquivo final
    const savePath = path.join(outputDir, `youtube.playlist.local.${id}.json`);
    
    try {
        fs.writeFileSync(savePath, plDataString, 'utf-8', );
    } catch (err) {
        logger.error(err);
    }
}

generateLocalYoutubePlaylistJson(
    './output', '999999999',
    'Lorem Ipsum', 'Hello, World!',
    [
        'https://www.youtube.com/watch?v=1JOnihp4tHI',
        'https://www.youtube.com/watch?v=SmUloGNpFGY',
        'https://www.youtube.com/watch?v=yiWQ2E9MWm8&t=7371s',
        'https://www.youtube.com/watch?v=SmUloGNpFGY&list=PLqIOCEYgBP5Gej7nFzDknWFEdruxnXkqS&index=10'
    ]);