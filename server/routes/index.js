const express = require('express');
const router = express.Router();
const parse_transactions = require('../services/parse/smartcontract')
const process_transactions = require('../services/process/transactions')
const aggregate_transactions = require('../services/aggregate/transactions')

/* GET home page. */
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


  res.send({ transactions: transactions });
});

module.exports = router;
