module.exports = async (channel, source) => {

    return {

        streams: [
            {

                name: "vaniTV",

                title: channel.name,

                url: source.url

            }
        ]

    };

};