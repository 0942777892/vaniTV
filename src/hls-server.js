const express = require("express");
const path = require("path");

const config = require("../config/app");

const app = express();

app.use((req, res, next) => {
    console.log(`[HLS] ${req.method} ${req.url}`);
    next();
});

app.use(
    "/live",
    express.static(
        path.join(process.cwd(), config.relay.output)
    )
);

app.listen(config.relay.port, config.relay.host, () => {

    console.log(
        `HLS server running: http://${config.relay.host}:${config.relay.port}/live/`
    );

});