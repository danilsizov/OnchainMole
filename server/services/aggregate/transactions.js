const formatDate = require('../../helper/formatData')

const preprocess_transactions = (transactions) => {
    let deposit = transactions.transactions.deposit
    let withdrawal = transactions.transactions.withdrawal

    let firstTime = parseInt(deposit[0].time);
    let lastTime = parseInt(deposit[deposit.length - 1].time);
    let timeStep = (lastTime - firstTime) / 100;

    let aggregatedLabels = [];
    let aggregatedDepositData = [];
    let aggregatedWithdrawalData = [];

    for (let i = 0; i < 100; i++) {
        let startTime = firstTime + (i * timeStep);
        let endTime = startTime + timeStep;

        // 3. Sum the values of transactions within the current interval
        let sumDeposit = 0;
        let sumWithdrawal = 0;
        for (let tx of deposit) {
            if (parseInt(tx.time) >= startTime && parseInt(tx.time) < endTime) {
                sumDeposit += tx.value;
            }
        }

        for (let tx of withdrawal) {
            if (parseInt(tx.time) >= startTime && parseInt(tx.time) < endTime) {
                sumWithdrawal += tx.value;
            }
        }

        aggregatedDepositData.push(sumDeposit);
        aggregatedWithdrawalData.push(sumWithdrawal);
        aggregatedLabels.push(formatDate(startTime)); // Convert timestamp to date string for labeling
    }

    return { 
        deposit: { 
            aggregatedLabels, 
            aggregatedDepositData 
        },
        withdrawal: { 
            aggregatedLabels, 
            aggregatedWithdrawalData 
        }  
    }
}

module.exports = preprocess_transactions