var client = require("socket.io-client");
var socket = client.connect("http://localhost:3000");
const sampledata = require('../data');
const encryptionService = require("./encryption");

const EMITTERINTERVAL = 10000;
const emitterService = () => {
    const startEmitter = (KEY, IV) => {
        try {
            setInterval(() => {
                const numMessages = getRandomInt(49, 499);
                let encryptedMessage = '';
                for (var i = 0; i < numMessages; i++) {
                    const originalMessage = {
                        name: sampledata['names'][getRandomInt(0, sampledata['names'].length)],
                        origin: sampledata['cities'][getRandomInt(0, sampledata['cities'].length)],
                        destination: sampledata['cities'][getRandomInt(0, sampledata['cities'].length)]
                    }
                    const sumCheckMessage = Object.assign(originalMessage, {
                        secret_key: encryptionService().createSHA256Hash(JSON.stringify(originalMessage))
                    });
                    encryptedMessage += encryptionService().encrypt(KEY, IV, JSON.stringify(sumCheckMessage)).encryptedData + '|';
                }
                socket.emit('message', encryptedMessage);
            }, EMITTERINTERVAL);
        } catch (err) {
            console.log(err);
        }
    };

    const emitToFrontend = (data) => {
        socket.emit('chart_data', JSON.stringify(data));
    }
    return {
        startEmitter,
        emitToFrontend
    };
}





const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
     //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = emitterService;
