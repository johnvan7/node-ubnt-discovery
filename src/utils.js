function sortByIp(a, b) {
    const num1 = Number(a.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
    const num2 = Number(b.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
    return num1 - num2;
};

function formatTimestamp(timestamp){
    return timestamp ? `${Math.floor(timestamp / 86400)}d ${Math.floor(timestamp % 86400 / 3600)}h ${Math.floor(timestamp % 3600 / 60)}m` : '';
}

module.exports = {
    sortByIp,
    formatTimestamp
};