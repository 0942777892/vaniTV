const { createStream } = require("../services/streamService");

module.exports = async ({ id }) => {
    return createStream(id);
};