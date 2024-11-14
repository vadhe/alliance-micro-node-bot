import fetch from 'node-fetch';
import randomMillisecond from "random-millisecond"
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
    let payload = {
        "tgId": Number(tgId),
        "initData": initData,
        "hash": hash,
        "milliseconds": randomMillisecond({ max: 42331 }),
    
    };
    const main = async () => {
        while (true) {
            try {
                const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(payload) })
                const data = await res.json()
                console.log('Points:', data.data.points);
            } catch {
                console.log("error")
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    main()
})();
