import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import logger from './logger.js';
export let dirYoutubeRoot = '';
export let dirYoutubePlaylists = '';
function getConfigs(configFilePath) {
    logger.info({ msg: 'Loading configs' });
    try {
        // ler o arquivo
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file);
        // obter seus valores hardcodeds (tipo o diretório root)
        // e montar os relativos (tipo ytroot/@playlists)
        dirYoutubeRoot = dataObject['youtube-directory'];
        dirYoutubePlaylists = path.join(dirYoutubeRoot, '@playlists');
        logger.success({
            msg: 'Successfully loaded configs',
            details: [
                `youtube root: ${dirYoutubeRoot}`,
                `youtube playlists: ${dirYoutubePlaylists}`
            ]
        });
    }
    catch (err) {
        console.error(err);
    }
}
getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');
//# sourceMappingURL=configs.js.map