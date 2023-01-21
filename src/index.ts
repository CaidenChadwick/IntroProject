/**
 *  index.ts
 *  Project: First Exercise
 * 
 *  Author: Your Name
 *  Created on: Jan 19, 2023
 */

type Candidate = {
    name: string;
    votes: Array<number>;
    funding: number;
};

function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
    let retArr: Array<number> = [];
    let smallArr: Array<number>;
    let bigArr: Array<number>;

    if (arr1.length > arr2.length) {
        smallArr = arr2;
        bigArr = arr1;
    }
    else {
        smallArr = arr1;
        bigArr = arr2;
    }

    for (let i = 0; i < smallArr.length; i += 1)
        retArr.push(arr1[i], arr2[i]);

    for (let i = smallArr.length; i < bigArr.length; i += 1)
        retArr.push(bigArr[i]);

    return retArr;
}

function checkWord(att: string, sec: string): string[] {
    let retStr = [];
    for (let i = 0; i < att.length; i += 1) {
        if (sec.includes(att[i])) {
            if (sec[i] === att[i])
                retStr.push("c");
            else
                retStr.push("p");
        }
        else
            retStr.push("a");
    }
    return retStr;
}

function canVotes(candidate: Candidate): number {
    let total = 0;
    for (let i = 0; i < candidate.votes.length; i += 1)
        total += candidate.votes[i];
    return total;
}

function totalVotes(candidates: Array<Candidate>): number {
    let total = 0;
    for (let i = 0; i < candidates.length; i += 1)
        total += canVotes(candidates[i]);
    return total;
}

function votesPercent(candidate: Candidate, candidates: Array<Candidate>): number {
    return (canVotes(candidate) / totalVotes(candidates)) * 100;
}

function precinctVotes(candidate: Candidate, precInd: number): number {
    return candidate.votes[precInd];
}

function precintVotesTotal(candidates: Array<Candidate>, precInd: number): number {
    let total = 0;
    for (let i = 0; i < candidates.length; i += 1) {
        total += precinctVotes(candidates[i], precInd);
    }
    return total;
}

function precintVotesPercent(candidate: Candidate, candidates: Array<Candidate>, precInd: number): number {
    return ((precinctVotes(candidate, precInd)) / precintVotesTotal(candidates, precInd)) * 100
}

function costPerVote(candidate: Candidate) {
    return candidate.funding / canVotes(candidate);
}

function findWinner(candidates: Array<Candidate>): void {
    let won: boolean = false;
    for (let i = 0; i < candidates.length && !won; i += 1) {
        if (votesPercent(candidates[i], candidates) > 50) {
            won = true;
            console.log(`The winner is ${candidates[i].name}!\n`);
        }
    }
}

// Array Merge Test
const arr1: Array<number> = [1, 3, 5, 7, 9];
const arr2: Array<number> = [2, 4, 6, 8, 10];

const mergedArray1: Array<number> = merge(arr1, arr2);
console.log(mergedArray1);

const arr3: Array<number> = [4, 5, 23, 18, 9, -5, 31];
const arr4: Array<number> = [18, 74, 88, 3];

const mergedArray2: Array<number> = merge(arr3, arr4);
console.log(mergedArray2);

const arr5: Array<number> = [18, 74, 88, 3];
const arr6: Array<number> = [4, 5, 23, 18, 9, -5, 31];

const mergedArray3: Array<number> = merge(arr5, arr6);
console.log(mergedArray3);
console.log("\n");

// Secret Word Check Test
const str1 = "spoke";
const str2 = "scope";
const str3 = "scale";
const str4 = "spoke";

const attempts = ['rains', 'shout', 'scope', 'spoke'];

for (const word of attempts) {
    const result = checkWord(word, 'spoke');
    console.log(`${result}`);
}
console.log("\n");

// Elections
const edward: Candidate = {
    name: "Edward Underwood",
    votes: [192, 147, 186, 114, 267],
    funding: 58182890
};

const rose: Candidate = {
    name: "Rose Olson",
    votes: [48, 90, 12, 21, 13],
    funding: 78889263
};

const leonard: Candidate = {
    name: "Leonard Willis",
    votes: [206, 312, 121, 408, 382],
    funding: 36070689
};

const nathaniel: Candidate = {
    name: "Nathaniel Taylor",
    votes: [37, 21, 38, 39, 29],
    funding: 6317921937
};

const candidates: Array<Candidate> = [edward, rose, leonard, nathaniel];

// Election Analysis
for (let i = 0; i < candidates.length; i += 1) {
    let numVotes = canVotes(candidates[i]);
    let percVotes = votesPercent(candidates[i], candidates);
    console.log(`${candidates[i].name} -- ${numVotes} votes -- ${percVotes.toFixed(2)}%`);
}
console.log("\n");

for (let i = 0; i < candidates.length; i += 1) {
    console.log(`${candidates[i].name}: `);
    for (let j = 0; j < candidates[i].votes.length; j += 1) {
        let precVotesPerc = precintVotesPercent(candidates[i], candidates, j);
        console.log(`Precinct ${j + 1} -- ${precVotesPerc.toFixed(2)}%\n`);
    }
}

for (let i = 0; i < candidates.length; i += 1) {
    console.log(`${candidates[i].name} spent $${costPerVote(candidates[i]).toFixed(2)} per vote\n`);
}

findWinner(candidates);