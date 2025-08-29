import path from 'path';
import fs from 'fs';

import yaml from 'js-yaml';

import logger from './logger.js';

export let dirYtRoot: string = '';
export let dirYtPlaylists: string = '';

interface ConfigsInterface {
    'youtube-directory': string
}

function getConfigs(configFilePath: string) {
    logger.info({ msg: 'Loading configs' });

    try {
        // ler o arquivo
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file) as ConfigsInterface;

        // obter seus valores hardcodeds (tipo o diretório root)
        // e montar os relativos (tipo ytroot/@playlists)
        dirYtRoot = dataObject['youtube-directory'];
        dirYtPlaylists = path.join(dirYtRoot, '@playlists');

        logger.success(
            {
                msg: 'Successfully loaded configs',
                details: [
                    `youtube root: ${dirYtRoot}`,
                    `youtube playlists: ${dirYtPlaylists}`
                ]
            }
        );
    } catch (err) {
        console.error(err);
    }
}

getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');