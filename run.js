#!/usr/bin/env node
const { execSync } = require("child_process");
const exec = (command) => execSync(command, { stdio: [0, 1, 2] });
const argv = process.argv.slice(2);
const exit = (code = 0) => process.exit(code);
const argsContains = (flag) => {
    return Array.isArray(flag)
        ? flag.some((val) => argv.includes(val))
        : argv.includes(flag);
};

if (argsContains(["--clean", "-c"])) {
    exec(`docker-compose down --remove-orphans --volumes`);
}

exec(`docker-compose up --build`);
exit();
