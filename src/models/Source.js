class Source {

    constructor({
        url,
        protocol,
        source,
        priority = 0,
        score = 0
    }) {

        this.url = url;
        this.protocol = protocol;
        this.source = source;
        this.priority = priority;
        this.score = score;

    }

}

module.exports = Source;