import './data.js'; // roda a função que carrega as configs assim que é importado
import { dirYoutubePlaylists } from './data.js';
import { generateRandomId } from './helpers.js';
import { videoUrls, words } from './dummies.js';
import { writeLocalPlaylist } from './interact/youtube.js';

function createTestPlaylist(idLength: number = 32) {
    // gerar números aleatórios
    // randomnumber é genérico e serve pra definir a quantidade/length de algo
    // o randomindex serve pra pegar um número aleatório que esteja dentro do limite de um array específico
    const randomNumber = (max: number) => Math.floor(Math.random() * max);
    const randomIndexFromArray = (targetArray: string[]) => Math.floor(Math.random() * targetArray.length);
    
    // definir a quantidade máxima de itens em cada campo
    let titleWordCount = randomNumber(15);
    let descWordCount = randomNumber(60);
    let videoCount = randomNumber(80);

    // inicialização de valores
    let title: string = '';
    let desc: string = '';
    let videos: string[] = [];

    // gerar um index aleatório baseado no tamanho do array que é o target
    // acessar o valor desse index no array, e adicionar o valor a respectiva variável
    while (titleWordCount > 0) {
        const randIndex = randomIndexFromArray(words);
        const word = words[randIndex];

        title += word + ' ';
        titleWordCount -= 1;
    }

    while (descWordCount > 0) {
        const randIndex = randomIndexFromArray(words);
        const word = words[randIndex];

        desc += word + ' ';
        descWordCount -= 1;
    }

    while (videoCount > 0) {
        const randIndex = randomIndexFromArray(videoUrls);
        const url = videoUrls[randIndex];

        if (!url) {
            continue;
        }

        videos.push(url);
        videoCount -= 1;
    }

    // criar uma nova playlist com essas informações
    writeLocalPlaylist(
        dirYoutubePlaylists,
        generateRandomId(idLength),
        title,
        desc,
        videos
    );
}

let testPlaylistCount = 10;
while (testPlaylistCount > 0) {
    createTestPlaylist();
    testPlaylistCount -= 1;
}