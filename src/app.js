const ubntDiscovery = require('./ubnt-discovery');
const { formatTimestamp } = require('./utils');

ubntDiscovery.getDevices().then((devices) => {
    console.log('IP'.padEnd(15), 'MAC'.padEnd(19), 'NAME'.padEnd(23), 'UPTIME'.padEnd(12), 'MODE'.padEnd(6), 'MODEL'.padEnd(22), 'SSID'.padEnd(20), 'FIRMWARE'.padEnd(10), '\n');

    devices.forEach(d => {
        const upTimeFormatted = formatTimestamp(d.uptime);
        console.log(d.ip.toString().padEnd(15), d.mac.padEnd(19), d.name.padEnd(23), upTimeFormatted.padEnd(12), d.mode.toUpperCase().padEnd(6), d.modelFull ? d.modelFull.padEnd(22) : d.modelShort.padEnd(22), d.essid.padEnd(20), d.firmwareVersion.padEnd(10));
    });

    console.log('\nTotal devices:', devices.length);
}).catch(err => {
    console.warn(err);
})