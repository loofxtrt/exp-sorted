/**
 * toda vez que algo é referenciado como "playlist" significa o ARQUIVO QUE REPRESENTA AQUELA PLAYLIST, seja ela local ou remota
 */
import fs from 'fs';
import path from 'path';
import logger from '../logger.js';
import { getNameFor } from '../helpers.js';
export function extractVideoIdFromUrl(videoUrl) {
    // esse regex obtém tudo que vem depois de 'v=', mas para de obter caracteres se encontrar um '&' ou chegar ao fim da string
    // o que resta disso é o id do vídeo, que geralmente fica depois de watch?v=
    // o & pode aparecer na url caso o link do vídeo tenha sido copiado a partir de uma playlist ou tenha um timestamp na url
    const urlRegex = /v=(.*?)(&|$)/;
    const match = videoUrl.match(urlRegex);
    if (match) {
        // retornar o id obtido
        const videoId = match[1];
        if (videoId) {
            logger.success({ msg: `Successfully extracted video ID`, details: videoId });
            return videoId;
        }
        else {
            logger.error({ msg: 'Matches were found but something went wrong while extracing video ID' });
            return null;
        }
    }
    else {
        logger.error({ msg: 'Error while extracting video ID', details: 'no matches' });
        return null;
    }
}
export function writeLocalPlaylist(dirOutput, id, title, description, videoUrls) {
    /**
     * gera e escreve o arquivo que vai representar uma playlist
     *
     * @param dirOutput - onde essa playlist vai ser escrita
     *  normalmente, é no diretório global de playlists do youtube definido nas configurações
     */
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
    // criar o objeto js que representa os dados da playlist
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
    const savePath = path.join(dirOutput, getNameFor.youtubeLocalPlaylist(id) // gerar o nome com a convenção correta definida pelo software
    );
    fs.writeFileSync(savePath, plDataString, 'utf-8');
}
export function addVideoToLocalPlaylist(filePlaylist, videoUrl) {
    const videoId = extractVideoIdFromUrl(videoUrl);
    if (!videoId) {
        logger.error({ prefix: videoUrl, msg: `Error while extracting video ID`, details: `video ID not found` });
        return;
    }
    // ler o arquivo passado e converter os dados de string pra objeto
    const plDataObject = readAndParseLocalPlaylist(filePlaylist);
    // ignorar a requisição de adição caso o vídeo já esteja na playlist
    if (plDataObject['videos'].includes(videoId)) {
        logger.info({ msg: 'Ignored video inclusion on playlist', details: 'video already exists' });
        return;
    }
    // adicionar o id do video no array dos dados e escrever eles de volta no mesmo arquivo
    plDataObject['videos'].push(videoId);
    writeDataToLocalPlaylist(plDataObject, filePlaylist);
    logger.success({ prefix: videoId, msg: 'Added video ID to playlist' });
}
export function writeDataToLocalPlaylist(data, filePlaylist) {
    /**
     * sobreescreve os dados dentro de uma playlist
     * usadas principalmente pra adicionar e remover vídeos
     *
     * @param data - os dados, JÁ CONVERTIDOS PRA OBJETO, e não texto
     */
    const formattedData = JSON.stringify(data, null, 4); // passar o objeto pra formato de texto e usar 4 espaços pra indentação
    fs.writeFileSync(filePlaylist, formattedData, 'utf-8'); // sobreescrever o arquivo com as novas informações
}
export function removeVideoFromLocalPlaylist(filePlaylist, targetVideoId) {
    const plData = readAndParseLocalPlaylist(filePlaylist);
    // remover todas as ocorrências que sejam iguais a url do vídeo passado pra função
    // e depois reescrever esse array atualizado no arquivo da playlist
    const updatedVideos = plData['videos'].filter(id => id !== targetVideoId);
    plData['videos'] = updatedVideos;
    writeDataToLocalPlaylist(plData, filePlaylist);
}
export function getLocalPlaylistPathFromId(dirYtPlaylists, playlistId) {
    // primeiro, tentar obter o arquivo da playlist apenas pelo nome
    // isso pode falhar caso o usuário tenha mudado manualmente o nome do arquivo ou caso ele só não exista
    let plPath = path.join(dirYtPlaylists, getNameFor.youtubeLocalPlaylist(playlistId));
    if (fs.existsSync(plPath)) {
        logger.success({ prefix: playlistId, msg: `Found playlist ID in the file name of the playlist` });
        return plPath;
    }
    else {
        // se não achar a playlist pelo nome, zera o plpath e tenta achar o id dentro do conteúdo de cada arquivo de playlist existente
        // se ainda assim não achar, dá erro e para a busca, deixando plpath vazio pra indicar o erro
        plPath = undefined;
        const allPlaylistFiles = fs.readdirSync(dirYtPlaylists, { withFileTypes: true }); // ler o dir mantendo os tipos dos arquivos
        for (const plFile of allPlaylistFiles) {
            if (!plFile.isFile())
                return;
            // converter o arquivo pra um path completo e ler ele
            const thisPlaylist = path.join(dirYtPlaylists, plFile.name);
            const plObject = readAndParseLocalPlaylist(thisPlaylist);
            // verificar se o id que está sendo procurado tá no conteúdo
            // for tradicional ao invés de foreach pra poder usar o break
            if (plObject['id'] === playlistId) {
                plPath = thisPlaylist;
                logger.success({ prefix: playlistId, msg: `Found playlist ID inside the contents of ${plFile.name}` });
                break;
            }
        }
    }
    // se o plpath for uma string e não estiver vazio, significa que o arquivo da playlist foi encontrado
    if (typeof plPath === 'string' && plPath.trim() != '') {
        return plPath;
    }
    else {
        logger.error({ prefix: playlistId, msg: `Could not find any playlists with this ID` });
    }
}
export function readAndParseLocalPlaylist(filePlaylist) {
    /**
     * lê o conteúdo de um arquivo que representa uma playlist
     * e retorna o texto convertido em um objeto
     */
    try {
        // tentar ler o arquivo e transformar o conteúdo de texto em json
        const stringData = fs.readFileSync(filePlaylist, 'utf-8');
        const objectData = JSON.parse(stringData);
        return objectData;
    }
    catch (err) {
        // throw err necessário pra que a função possa continuar
        // não precisano aceitar undefined ou outros falsies
        console.error(err);
        throw err;
    }
}
export function listLocalPlaylists(dirYtPlaylists) {
    logger.info({ msg: 'Reading local playlists' });
    // ler o diretório e inicializar um array de tuplas vazio pra guardar as playlists obtidas
    const allPlaylists = fs.readdirSync(dirYtPlaylists, { withFileTypes: true });
    const onlyLocalPlaylists = [];
    allPlaylists.forEach(filePl => {
        // adicionar apenas as playlists definidas como locais no array final
        const fullPlPath = path.join(dirYtPlaylists, filePl.name);
        const plContents = readAndParseLocalPlaylist(fullPlPath);
        const plType = plContents['type'];
        if (plType == 'local') {
            onlyLocalPlaylists.push([plContents['id'], plContents['title']]);
        }
    });
    // retornar os resultados
    if (onlyLocalPlaylists.length > 0) {
        // obter apenas a coluna com os títulos das playlists
        const playlistTitles = onlyLocalPlaylists.map(tuple => tuple[1]);
        logger.success({
            msg: `Finished reading local playlists. You have ${onlyLocalPlaylists.length} of them`,
            details: playlistTitles
        });
    }
    else {
        logger.success({ msg: 'Finished reading local playlists. You don\'t have any of them' });
    }
}
//# sourceMappingURL=youtube.js.map