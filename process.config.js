let common = {
    out_file: "/dev/null",
    error_file: "/dev/null",
    instances: "max",
};

let services = [
    {
        name: "client",
        script: "dist/client.js",
    },
    {
        name: "server",
        script: "dist/server.js",
    },
];

module.exports = {
    apps: services.map((service) => ({
        ...service,
        ...common,
    })),
};
