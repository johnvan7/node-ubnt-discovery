function sortByIp(a, b) {
    const num1 = Number(a.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
    const num2 = Number(b.ip.split(".").map((num) => (`000${num}`).slice(-3)).join(""));
    return num1 - num2;
};

module.exports = {
    sortByIp
};