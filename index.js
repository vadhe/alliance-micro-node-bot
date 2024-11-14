import fetch from 'node-fetch';
const url = 'https://api.micro-node.alliancegames.xyz/user/tap';
import * as readline from "readline";

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let headers = {
    'Accept': 'application/json, text/plain, */*',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
};



(async () => {
    function inputPayload(query) {
        return new Promise((resolve) => readLine.question(query, (answer) => resolve(answer)));
    }
    const tgId = await inputPayload("input tgid :")
    const initData = await inputPayload("input initData :")
    const hash = await inputPayload("input hash :")
    const main = async () => {
        while (true) {
            function getRandomTimeInSeconds(min = 3788, max = 4464) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const randomTime = getRandomTimeInSeconds()
            let payload = {
                "tgId": tgId,
                "initData": initData,
                "hash": hash,
                "milliseconds": randomTime,

            };
            try {
                const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(payload) })
                const data = await res.json()
                console.log('Points:', data.data.points);
            } catch {
                console.log("error")
            }
            await new Promise(resolve => setTimeout(resolve, randomTime));
        }
    }
    main()
})();
