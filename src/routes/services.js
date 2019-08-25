const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
    const params = req.body;
    accounts[params.from].balance -= parseInt(params.amount);
    accounts[params.to].balance += parseInt(params.amount);
    writeJSON();
    res.render('transfer', {
        message: 'Transfer Completed'
    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req,res) => {
    const params = req.body;
    accounts.credit.balance -= parseInt(params.amount);
    accounts.credit.available += parseInt(params.amount);
    writeJSON();
    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit });
});

module.exports = router;
