const queue = require("bull");

const dbQueue = new queue({
    limiter: {
        max: 5,
        duration: 5000,
        bounceBack: true
    }
});

module.exports = dbQueue;
