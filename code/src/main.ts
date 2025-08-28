import fs from 'fs';
import path from 'path';

import logger from './logger.js';
import './data.js'; // roda a função que carrega as configs assim que é importado
import { dirYoutubePlaylists, getNameFor } from './data.js';

function extractVideoIdFromUrl(videoUrl: string): string | null {
    // esse regex obtém tudo que vem depois de 'v=' mas para de obter caracteres se encontrar um '&' ou se chegar ao fim da string
    // o que resta disso é o id do vídeo, que geralmente fica depois de watch?v=
    // e o & pode aparecer na url caso o link do vídeo tenha sido copiado a partir de uma playlist ou tenha um timestamp na url
    const urlRegex = /v=(.*?)(&|$)/
    const match = videoUrl.match(urlRegex);
    
    if (match) {
        // retornar o id obtido
        const videoId = match[1];

        if (videoId) {
            logger.success({ msg: `Successfully extracted video ID`, details: videoId });
            return videoId;
        } else {
            logger.error({ msg: 'Matches were found but something went wrong while extracing video ID' });
            return null;
        }
    } else {
        logger.error({ msg: 'Error while extracting video ID', details: 'no matches' });
        return null;
    }
}

function generateRandomId(idLength: number): string {
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

function generateLocalYoutubePlaylistJson(outputDir: string, id: string, title: string, description: string, videoUrls: string[]) {
    // formatar o id com prefixo que indica uma playlist local
    if (!id.startsWith('LOC')) {
        id = 'LOC' + id;
    }

    // limpar a url dos vídeos pra remover modificadores
    // e adiciona-las a um novo array
    let cleanUrls: string[] = [];

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
        'type': 'local',
        'title': title,
        'description': description,
        'videos': cleanUrls
    }
    const plDataString = JSON.stringify(plDataObject, null, 4);

    // escrever o arquivo final
    const savePath = path.join(
        outputDir,
        getNameFor.youtubeLocalPlaylist(id) // gerar o nome com a convenção correta definida pelo software
    );
    fs.writeFileSync(savePath, plDataString, 'utf-8');
}

function addVideoToExistingLocalYoutubePlaylist(youtubePlaylistsDir: string, localPlayListId: string, videoUrl: string) {
    const videoId = extractVideoIdFromUrl(videoUrl);
    const plPath = path.join(youtubePlaylistsDir, getNameFor.youtubeLocalPlaylist(localPlayListId));
    
    // ler o arquivo passado e converter os dados de string pra objeto
    const plDataString = fs.readFileSync(plPath, 'utf-8');
    const plDataObject = JSON.parse(plDataString);

    // ignorar a requisição de adição caso o vídeo já esteja na playlist
    if (plDataObject.videos.includes(videoId)) {
        logger.info({ msg: 'Ignored video inclusion on playlist', details: 'video already exists' });
        return;
    }

    // adicionar o id do video no array dos dados e escrever eles de volta no mesmo arquivo
    plDataObject.videos.push(videoId);
    fs.writeFileSync(plPath, JSON.stringify(plDataObject, null, 4), 'utf-8');

    logger.success({ prefix: videoId, msg: 'Added video ID to playlist' });
}

function getPlaylistPathFromId(youtubePlaylistsDir: string, playlistId: string): string | null {     
    // primeiro, tentar obter o arquivo da playlist apenas pelo nome
    // isso pode falhar caso o usuário tenha mudado manualmente o nome do arquivo ou caso ele só não exista
    let plPath = path.join(youtubePlaylistsDir, getNameFor.youtubeLocalPlaylist(playlistId));
    
    if (fs.existsSync(plPath)) {
        logger.success({ prefix: playlistId, msg: `Found playlist ID in the name of file` });
        return plPath;
    } else {
        // se não achar pelo nome, tenta ler todas as playlists disponíveis
        // e procurar pelo id dentro do conteúdo dos arquivos

        // ler o diretório listando todos os arquivos com seus devidos tipos
        const allPlaylistFiles = fs.readdirSync(youtubePlaylistsDir, { withFileTypes: true});

        allPlaylistFiles.forEach(plFile => {
            if (!plFile.isFile()) return;

            // converter o dirent pra um path completo e o conteúdo de texto pra um obj javascript
            const plPath = path.join(youtubePlaylistsDir, plFile.name);

            const plData = fs.readFileSync(plPath, 'utf-8');
            const plObject = JSON.parse(plData);

            // verificar se o id que está sendo procurado tá no conteúdo
            if (plObject['id'] === playlistId) {
                logger.success({ prefix: playlistId, msg: `Found playlist ID inside contents of ${plFile.name}` });
                return plPath;
            }
        });

        logger.error({ prefix: playlistId, msg: `Could not find any playlists with this ID` });
        return null;
    }
}

generateLocalYoutubePlaylistJson(
    dirYoutubePlaylists,
    generateRandomId(32),
    'Lorem Ipsum',
    'Hello, World!',
    [
        'https://www.youtube.com/watch?v=1JOnihp4tHI',
        'https://www.youtube.com/watch?v=SmUloGNpFGY',
        'https://www.youtube.com/watch?v=yiWQ2E9MWm8&t=7371s',
        'https://www.youtube.com/watch?v=SmUloGNpFGY&list=PLqIOCEYgBP5Gej7nFzDknWFEdruxnXkqS&index=10'
    ]
);

getPlaylistPathFromId(dirYoutubePlaylists, 'leros');

/*
addVideoToExistingLocalYoutubePlaylist(
    '/mnt/seagate/workspace/coding/experimental/exp-sorted/output',
    'LOCbYSy1Uc5E8WRSQAThfbS1NAf3FGgdGr4',
    'https://www.youtube.com/watch?v=w30zWauuoGw'
);
*/

//console.log(generateRandomId(32));