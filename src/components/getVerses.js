import verses from './verses.json';

function getRandomNumber(max, min=0) {
    return parseInt((Math.random() * (max - min)) + min);
}
export default function getVerses(max=3) {
    let from = getRandomNumber(verses.length-max);
    return verses.slice(from, from + max).map(s => s.replace(/’/g, '\'').replace(/”/g, '"').replace(/[^ -~]+/g, ''));
}