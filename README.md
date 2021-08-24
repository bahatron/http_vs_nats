# HTTP vs NATS server benchmark

## Requirements

-   node:12+
-   `docker` and `docker-compose`

## Run the test

```sh
# start environment
./run.js -c

# run http bench script
npm run test:http

# run nats bench script
npm run test:nats
```
