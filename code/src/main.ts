import './data.js'; // roda a função que carrega as configs assim que é importado
import { dirYoutubePlaylists } from './data.js';
import { generateRandomId } from './helpers.js';
import {
    generateLocalYoutubePlaylistJson,
    getLocalPlaylistPathFromId,
    readLocalPlaylists
} from './interact/youtube.js';

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

getLocalPlaylistPathFromId(dirYoutubePlaylists, 'leros');
getLocalPlaylistPathFromId(dirYoutubePlaylists, 'LOC5G0LYI5K7ZILnmL6SlZthglNX0aJVPsy');
getLocalPlaylistPathFromId(dirYoutubePlaylists, 'LOCwJcD7kDT0sg09XXCyOILOUJocaLyHREU');

readLocalPlaylists(dirYoutubePlaylists);

/*
addVideoToExistingLocalYoutubePlaylist(
    '/mnt/seagate/workspace/coding/experimental/exp-sorted/output',
    'LOCbYSy1Uc5E8WRSQAThfbS1NAf3FGgdGr4',
    'https://www.youtube.com/watch?v=w30zWauuoGw'
);
*/

//console.log(generateRandomId(32));