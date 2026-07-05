class Channel {

    constructor({
        id,
        name,
        group,
        logo,
        epg,
        sources = []
    }) {

        this.id = id;
        this.name = name;
        this.group = group;
        this.logo = logo;
        this.epg = epg;
        this.sources = sources;

    }

}

module.exports = Channel;