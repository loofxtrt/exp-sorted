"use strict";
/**
 * arquivo que varre as configurações, e baseado nelas, define os valores globais que o software deve usar
 * toda variável global deve ser escrita em SNAKE_CASE e começar com CONFIG_
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_DIR_YT_PLAYLISTS = exports.CONFIG_DIR_YT_ROOT = exports.CONFIG_FILE_HTML_INDEX = exports.CONFIG_DIR_VISUAL = exports.CONFIG_ID_LENGTH = void 0;
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const logger = require('./logger.js');
exports.CONFIG_ID_LENGTH = 32;
exports.CONFIG_DIR_VISUAL = '../../visual';
exports.CONFIG_FILE_HTML_INDEX = path.join(exports.CONFIG_DIR_VISUAL, 'index.html');
exports.CONFIG_DIR_YT_ROOT = '';
exports.CONFIG_DIR_YT_PLAYLISTS = '';
function getConfigs(configFilePath) {
    logger.info({ msg: 'Loading configs' });
    try {
        // ler o arquivo
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file);
        // obter seus valores hardcodeds (tipo o diretório root)
        // e montar os relativos (tipo ytroot/@playlists)
        exports.CONFIG_DIR_YT_ROOT = dataObject['youtube-directory'];
        exports.CONFIG_DIR_YT_PLAYLISTS = path.join(exports.CONFIG_DIR_YT_ROOT, '@playlists');
        logger.success({
            msg: 'Successfully loaded configs',
            details: [
                `youtube root: ${exports.CONFIG_DIR_YT_ROOT}`,
                `youtube playlists: ${exports.CONFIG_DIR_YT_PLAYLISTS}`
            ]
        });
    }
    catch (err) {
        console.error(err);
    }
}
getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');
//# sourceMappingURL=data.js.map