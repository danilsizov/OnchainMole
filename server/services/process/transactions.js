const groom_transactions = (transactions, block_addr, track_token, contracts) => {
    let value = 0, users = []
    let groomed_transactions = { all: [], deposit: [], withdrawal: [] }
    transactions.forEach( (tx) => {
        tx.value = tx.value / Math.pow(10, 18)
        if(tx.to == '0x0000000000000000000000000000000000000000'){
            tx.type = 'withdrawal'
            tx.value = tx.value * -1
            value +=  tx.value
            let holder = users.find(obj => obj.addr === tx.from)
            if(!holder){
                users.push({ addr: tx.from, value: tx.value, txs: [tx] })
            } else {
                holder.value += tx.value
                holder.txs.push(tx)
            }
            groomed_transactions.withdrawal.push(tx)
        } else if(tx.from == '0x0000000000000000000000000000000000000000'){
            tx.type = 'deposit'
            value += tx.value
            let holder = users.find(obj => obj.addr === tx.to)
            if(!holder){
                users.push({ addr: tx.to, value: tx.value, txs: [tx]})
            } else {
                holder.value += tx.value
                holder.txs.push(tx)
            }
            groomed_transactions.deposit.push(tx)
        } else {
            tx.type = 'transfer'

            let holder = users.find(obj => obj.addr === tx.to)
            if(!holder){
                users.push({ addr: tx.to, value: tx.value, txs: [tx]})
            } else {
                holder.value += tx.value
                holder.txs.push(tx)
            }

            let sender = users.find(obj => obj.addr === tx.from)
            if(!sender){
                users.push({ addr: tx.from, value: tx.value * -1, txs: [tx]})
            } else {
                sender.value = sender.value - tx.value
                sender.txs.push(tx)
            }

        }

        groomed_transactions.all.push(tx)
    })

    users = users.sort((a, b) => { 
        return b.value - a.value 
    })

    return { users, transactions: groomed_transactions, total_supply: value }
}

module.exports = groom_transactions