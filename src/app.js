const fs = require('fs');
const path = require('path');
const express = require('express')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const accountData = fs.readFileSync('src/json/accounts.json', 'utf-8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json', 'utf-8');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts
    });
});

app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    });
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
});

app.get('/profile', (req, res) => {
    res.render('profile',{
        user: users[0]
    });
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    const params = req.body;
    accounts[params.from].balance -= parseInt(params.amount);
    accounts[params.to].balance += parseInt(params.amount);
    const accountsJSON =JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf-8');
    res.render('transfer', {
        message: 'Transfer Completed'
    });
});

app.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

app.post('/payment', (req,res) => {
    const params = req.body;
    accounts.credit.balance -= parseInt(params.amount);
    accounts.credit.available += parseInt(params.amount);
    const accountsJSON =JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf-8');
    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit });
});

app.listen(3000, () => console.log('PS project listening on port 3000'))
