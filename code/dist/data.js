import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import logger from './logger.js';
export let dirYoutubeRoot = '';
export let dirYoutubePlaylists = '';
function getConfigs(configFilePath) {
    logger.info('Loading configs');
    try {
        const file = fs.readFileSync(configFilePath, 'utf-8');
        const dataObject = yaml.load(file);
        dirYoutubeRoot = dataObject['youtube-directory'];
        dirYoutubePlaylists = path.
            logger.success('Successfully loaded configs');
    }
    catch (err) {
        logger.error('Error while loading configs');
        console.error(err);
    }
}
getConfigs('/mnt/seagate/workspace/coding/experimental/exp-sorted/simulated/config.yaml');
//# sourceMappingURL=data.js.map