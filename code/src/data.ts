/**
 * arquivo que varre as configurações, e baseado nelas, define os valores globais que o software deve usar
 * toda variável global deve ser escrita em SNAKE_CASE e começar com CONFIG_
 */

import path from 'path';
import fs from 'fs';

import yaml from 'js-yaml';

import logger from './logger.js';

export const CONFIG_ID_LENGTH = 32;
export let CONFIG_DIR_YT_ROOT: string = '';
export let CONFIG_DIR_YT_PLAYLISTS: string = '';

export interface PlaylistDataObject {
    id: string,
    type: 'local' | 'service',
    title: string,
    description: string,
    videos: string[]
}

interface ConfigsObject {
    'youtube-directory': string
}

function getConfigs(configFilePath: string) {
    logger.info({ msg: 'Loading configs' });

    try {
        // ler o arquivo
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file) as ConfigsObject;

        // obter seus valores hardcodeds (tipo o diretório root)
        // e montar os relativos (tipo ytroot/@playlists)
        CONFIG_DIR_YT_ROOT = dataObject['youtube-directory'];
        CONFIG_DIR_YT_PLAYLISTS = path.join(CONFIG_DIR_YT_ROOT, '@playlists');

        logger.success(
            {
                msg: 'Successfully loaded configs',
                details: [
                    `youtube root: ${CONFIG_DIR_YT_ROOT}`,
                    `youtube playlists: ${CONFIG_DIR_YT_PLAYLISTS}`
                ]
            }
        );
    } catch (err) {
        console.error(err);
    }
}

getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');