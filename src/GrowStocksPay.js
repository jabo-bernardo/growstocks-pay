const config = require("../config");
const request = require("../modules/async-request");
const toTimeStamp = require("../modules/to-time-stamp");

class GrowStocksPay {

    constructor(CLIENT_SECRET) {
        this.secret = CLIENT_SECRET;
    }

    async createTransaction(user, amount, notes="") {
        if(!this.secret) throw new Error(`Invalid Secret!`);
        if(notes.length > 50) notes = notes.slice(0, 50);
        let response = await request(`${config.baseURL}/transaction/create`, { secret: this.secret, user: user, amount: amount, notes });
        if(!response.success)
            throw new Error(response.reason);
        return response.transaction;
    }

    async getTransaction(transactionID) {
        if(!this.secret) throw new Error(`Invalid Secret!`);
        let response = await request(`${config.baseURL}/transaction/get`, { secret: this.secret, transaction: transactionID });
        if(!response.success)
            throw new Error(response.reason);
        response = response.transaction;
        response.datetime = toTimeStamp(response.datetime);
        delete response.notes;
        delete response.action;
        return response;
    }

    async sendWorldLocks(user, amount) {
        if(!this.secret) throw new Error(`Invalid Secret!`);        
        let response = await request(`${config.baseURL}/send`, { secret: this.secret, party: user, amount: amount });
        if(!response.success)
            throw new Error(response.reason);
        return { text: response.reason, balanceLeft: response.balance};
    }

    async myBalance() {
        if(!this.secret) throw new Error(`Invalid Secret!`);
        let response = await request(`${config.baseURL}/balance`, { secret: this.secret });
        if(!response.success)
            throw new Error(response.reason);
        return response.balance;
    }

    setClientSecret(secret) {
        this.secret = secret;
    }

}

module.exports = GrowStocksPay;