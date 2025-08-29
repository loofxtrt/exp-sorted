/**
 * arquivo que varre as configurações, e baseado nelas, define os valores globais que o software deve usar
 * toda variável global deve ser escrita em SNAKE_CASE e começar com CONFIG_
 */
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import logger from './logger.js';
export const CONFIG_ID_LENGTH = 32;
export const CONFIG_DIR_VISUAL = '../../visual';
export const CONFIG_FILE_HTML_INDEX = path.join(CONFIG_DIR_VISUAL, 'index.html');
export let CONFIG_DIR_YT_ROOT = '';
export let CONFIG_DIR_YT_PLAYLISTS = '';
function getConfigs(configFilePath) {
    logger.info({ msg: 'Loading configs' });
    try {
        // ler o arquivo
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file);
        // obter seus valores hardcodeds (tipo o diretório root)
        // e montar os relativos (tipo ytroot/@playlists)
        CONFIG_DIR_YT_ROOT = dataObject['youtube-directory'];
        CONFIG_DIR_YT_PLAYLISTS = path.join(CONFIG_DIR_YT_ROOT, '@playlists');
        logger.success({
            msg: 'Successfully loaded configs',
            details: [
                `youtube root: ${CONFIG_DIR_YT_ROOT}`,
                `youtube playlists: ${CONFIG_DIR_YT_PLAYLISTS}`
            ]
        });
    }
    catch (err) {
        console.error(err);
    }
}
getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');
//# sourceMappingURL=data.js.map