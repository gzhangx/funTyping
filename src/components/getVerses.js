import verses from './verses.json';

function getRandomNumber(max, min=0) {
    return parseInt((Math.random() * (max - min)) + min);
}
export default function getVerses(max=3) {
    let from = getRandomNumber(verses.length-max);
    return verses.slice(from, from+3).map(s=>s.replace(/’/g,'\''));
}