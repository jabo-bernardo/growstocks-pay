const request = require("request");

module.exports = (url, param) => {
    return new Promise((resolve, reject) => {
        request.post(url, { form: param }, (err, res, body) => {
            if(err)
                reject(err);
            resolve(JSON.parse(body));
        });
    })
}