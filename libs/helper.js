import { WORDS_LIST } from "./constant.js"

export const dottedWord = (word, dashedWord) => {
    let ans = ''
    if (dashedWord == '-1') {
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) != ' ') {
                ans += '_ ';
            } else {

                ans += '  ';
            }
        }
    } else {

        let randomIndex = Math.floor(Math.random() * word.length) * 2;

        while (dashedWord.charAt(randomIndex) != '_') {
            randomIndex = Math.floor(Math.random() * word.length) * 2;
        }
        for (let i = 0; i < dashedWord.length; i++) {
            if (i != randomIndex) {
                ans += dashedWord.charAt(i);
            } else {
                ans += word.charAt(i / 2);
            }
        }
    }
    return ans;
}


export const getRandomWord = () => {
    let num = Math.random();
    let index = Math.floor(num * WORDS_LIST.length);
    return WORDS_LIST[index];
}
