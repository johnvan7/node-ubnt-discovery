/*
 * Node Ubiquiti Discovery Tool
 * Author: Giovanni Vella (johnvan7)
 * License: GPL-3.0
 * Version: 1.0.0
 */

const dgram = require('dgram');
const { Buffer } = require('node:buffer');

const utils = require('./utils');

const server = dgram.createSocket('udp4');
const port = 10001;

const UBNT_REQUEST_PAYLOAD = Buffer.from('01000000', 'hex');
const UBNT_REPLY_SIGNATURE = '010000';
const UBNT_MAC = '01';
const UBNT_MAC_AND_IP = '02';
const UBNT_FIRMWARE = '03';
const UBNT_UNKNOWN_2 = '0a';
const UBNT_RADIONAME = '0b';
const UBNT_MODEL_SHORT = '0c';
const UBNT_ESSID = '0d';
const UBNT_MODE = '0e';
const UBNT_UNKNOWN_1 = '10';
const UBNT_MODEL_FULL = '14';

const devices = [];

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    const device = {
        ip: '',
        mac: '',
        firmware: '',
        firmwareVersion: '',
        name: '',
        modelShort: '',
        modelFull: '',
        essid: '',
        mode: ''
    };

    const signature = msg.toString('hex', 0, 3);
    if (signature != UBNT_REPLY_SIGNATURE) {
        console.log('INVALID signature');
        return;
    }

    device.ip = rinfo.address;
    let pointer = 4;

    while ((msg.byteLength - pointer) > 0) {
        const fieldType = msg.toString('hex', pointer, pointer + 1);

        pointer += 2;
        const fieldLen = msg.readInt8(pointer);

        pointer += 1;
        const fieldValue = msg.toString('hex', pointer, pointer + fieldLen);

        switch (fieldType) {
            case UBNT_MAC:
                device.mac = fieldValue.toUpperCase().match(/.{1,2}/g).join(':');
                break;
            case UBNT_FIRMWARE:
                device.firmware = Buffer.from(fieldValue, 'hex').toString();
                device.firmwareVersion = device.firmware.match(/v(\d+\.\d+\.\d+)/g)[0].slice(1);
                break;
            case UBNT_RADIONAME:
                device.name = Buffer.from(fieldValue, 'hex').toString();
                break;
            case UBNT_MODEL_SHORT:
                device.modelShort = Buffer.from(fieldValue, 'hex').toString();
                break;
            case UBNT_MODEL_FULL:
                device.modelFull = Buffer.from(fieldValue, 'hex').toString();
                break;
            case UBNT_ESSID:
                device.essid = Buffer.from(fieldValue, 'hex').toString();
                break;
            case UBNT_MODE:
                let mode = msg.readInt8(pointer);
                switch (mode) {
                    case 0:
                        device.mode = 'auto';
                        break;
                    case 1:
                        device.mode = 'adhoc';
                        break;
                    case 2:
                        device.mode = 'sta';
                        break;
                    case 3:
                        device.mode = 'ap';
                        break;
                    case 4:
                        device.mode = 'repeater';
                        break;
                    case 5:
                        device.mode = 'secondary';
                        break;
                    case 6:
                        device.mode = 'monitor';
                        break;
                }
                break;
        }

        pointer += fieldLen;
    }

    if (devices.filter(a => a.ip == device.ip).length == 0) {
        devices.push(device);
    }

});

const getDevices = (timeout = 1000) => new Promise((resolve, reject) => {
    server.bind(() => {
        server.setBroadcast(true);
        devices.length = 0;
        server.send(UBNT_REQUEST_PAYLOAD, 0, 4, port, '255.255.255.255', function (err, bytes) {
            if (err) reject(err);
        });

        setTimeout(() => {
            server.close();
            devices.sort(utils.sortByIp);
            resolve(devices);
        }, timeout);
    })
});

module.exports = {
    getDevices
};


