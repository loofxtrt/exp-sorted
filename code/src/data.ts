import path from 'path';
import fs from 'fs';

import yaml from 'js-yaml';

import logger from './logger.js';

export let dirYoutubeRoot: string = '';
export let dirYoutubePlaylists: string = '';

interface ConfigsInterface {
    'youtube-directory': string
}

function getConfigs(configFilePath: string) {
    logger.info('Loading configs');

    try {
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file) as ConfigsInterface;

        dirYoutubeRoot = dataObject['youtube-directory'];
        dirYoutubePlaylists = path.

        logger.success('Successfully loaded configs');
    } catch (err) {
        logger.error('Error while loading configs');
        console.error(err);
    }
}

getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');