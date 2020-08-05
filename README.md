# GrowStocks Pay API Wrapper

This is a GrowStocks Pay API wrapper. <br>

API Application Form: [Apply Here](https://auth.growstocks.xyz/user/developer)<br>
Working Example: [Growrr Website](https://growrr.xyz)<br>
Documentation: [Read Here](https://medium.com/@growstocks/growstocks-pay-api-c9e3e2470742)<br>

## Prerequisite
- Node JS
- GrowStocks Auth (including `balance` as a scope)
- GrowStocks Developer Account

## GrowStocks Auth
- [growstocks-auth](https://npmjs.com/package/growstocks-auth)

# Basic Usages
```js
const GSPay = require("growstocks-pay");
const pay = new GSPay("CLIENT_SECRET");
```

## Creating Transaction
```js
const userID = 737; // You can get this via GS Auth
const amount = 5; // Amount you want to deduct from user's account

await pay.createTransaction(userID, amount); // This will return a transaction ID
```

## Getting Transaction
```js
const transactionID = "XXXXXXXXXXXX"
await pay.getTransaction(transactionID);
/*
    returns 
    {
        id: "XXXXXXXXXXXX",
        party: 737,
        user: 1561,
        status: 0,
        amount: 5,
        datetime: 1596633967
    }

    id - Transaction ID
    party - Developer ID
    user - User ID,
    status - Payment status (integer) Paid = 1, Unpaid = 0
    datetime - Transaction created (in timestamp)
*/
```

## Sending World Locks
```js
const user = 737;
const amount = 5;

await pay.sendWorldLocks(user, amount);
/*
    returns
    {
        text: "5 World Locks has been sent to PapayaShake",
        balanceLeft: 0
    }
*/
```

## Getting your balance
```js
await pay.myBalance(); // returns 0
```
---
# Additional Methods
###  GrowStocksPay.setClientSecret(CLIENT_SECRET);
- Sets the client secret for your GS Pay Object

<br>

---
# Rate Limits
- Create endpoint rate limit: 1 request/user/4 seconds
- Getendpoint rate limit: 1 request/user/2 seconds
- Send endpoint rate limit: 1 request/user/second

## Notes
All unpaid transactions will be automatically deleted 2 days after their creation.