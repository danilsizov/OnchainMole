require('dotenv').config()
const axios = require('axios')

let api

const scan = async (chain, address) => {
    const offset = 10000;
    let startblock = 0;

    if(chain == 'bsc'){
        api = process.env.BSCSCAN_API
        const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${address}&startblock=${startblock}&endblock=99999999&offset=${offset}&sort=asc&apikey=${api}`
        return await get_history(address, bsc, url)
    }
}

const get_history = async (address, api, url) => {
    let transactions = [];

    while (true) {
        let res = await axios.get(url);
        
        // Check if there's an error or no results
        if (res.data.status === "0" || res.data.result.length === 0) {
            break;
        }

        res.data.result.forEach((tx) => {
            transactions.push({
                block: tx.blockNumber,
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value,
                time: tx.timeStamp,
                token: tx.tokenSymbol,
                decimal: tx.tokenDecimal
            });
        });

        // Check if results are less than the offset, indicating it's the last page
        if (res.data.result.length < offset) {
            break;
        }

        startblock = parseInt(res.data.result[res.data.result.length - 1].blockNumber) + 1;
    }

    return transactions
}