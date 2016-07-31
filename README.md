# spikefinder

> benchmarking challenge for spike detection in imaging data

This repo contains the code for the web app (for displaying and submitting results) and the server (for storing and fetching results in a database). This document describes how to download the data, develop algoritms in your favorite computing environment, and submit your results for evaluation!

# web app

To run this web app locally for testing, clone this repo, then call

```js
npm install
npm start
```

To run in production, call

```js
npm run build
npm run server
```

To see debug statements, call `export DEBUG=spikefinder` before starting.

You need to specify a mongo database inside `server/config.js`, and also set the environmental variables `MONGO_USER` and `MONGO_PASSWORD`. A script for fetching datasets is included in `server/fetch.js`, and also requires that `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY`, because the data is fetched from S3.
