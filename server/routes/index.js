const express = require('express');
const router = express.Router();
const parse_transactions = require('../services/parse/smartcontract')
const process_transactions = require('../services/process/transactions')
const aggregate_transactions = require('../services/aggregate/transactions')
const getPoolInvestorsClusters = require('../services/segments/poolInvestors')
const get_addresses_portfolio = require('../services/parse/address')

/* GET smart contract info. */
router.get('/', async function(req, res, next) {
  let contract = req.query.contract
  let transactions = await parse_transactions.get_transactions(contract)
  transactions = await process_transactions(transactions, contract)
  transactions.txGraph = aggregate_transactions(transactions)
  
  let active_users = transactions.users.filter( (user) => {
    if(user.value > 0){
      return user
    }
  })

  transactions.users_amount = { all: transactions.users.length, active: active_users.length }

  let users_shares = { labels: [], data: [], backgroundColor: [] }

  active_users.forEach( (user) => {
    users_shares.labels.push(user.addr)
    users_shares.data.push(user.value)
    users_shares.backgroundColor.push('rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')')
  })
  
  transactions.users_shares = users_shares

  transactions.segments = await getPoolInvestorsClusters(transactions.users)


  res.send({ transactions: transactions });
});

/* POST addresses info. */
router.post('/addresses', async function(req, res, next) {
  let addresses = req.body.addresses
  

  addresses = await get_addresses_portfolio(addresses)


  res.send({ addresses: addresses });
});

module.exports = router;
