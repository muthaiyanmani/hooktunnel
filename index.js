#!/usr/bin/env node

const { program } = require('commander');
const figlet = require('figlet');
const http = require('http');
const httpProxy = require('http-proxy');
const ngrok = require('@ngrok/ngrok');
const { logInfo, logError } = require('./utils');

console.log(`\n${figlet.textSync('HookTunnel')}`);
console.log(` use --help to see the available options\n`);

program
    .option('--token <token>', 'NGROK auth token. https://dashboard.ngrok.com/get-started/your-authtoken')
    .option('--port <port>', 'Server port')
    .option('--target <target>', 'Target Url')
    .option('--ngrok-domain <domain>', 'NGROK domain')
    .option('--help', 'Display the help information');

program.parse(process.argv);

const options = program.opts();

const ngrokAuthToken = options.token || process.env.HC_NGROK_AUTH_TOKEN;
let serverPort = options.port || process.env.HC_PORT;
const targetUrl = options.target || process.env.HC_TARGET_URL;
const ngrokDomain = options.domain || process.env.HC_NGROK_DOMAIN;

if (!ngrokAuthToken) {
    console.error('❗️ NGROK_AUTH_TOKEN is required.');
    process.exit(1);
}

if (!targetUrl) {
    console.error('❗️ TARGET_URL is required.');
    process.exit(1);
}

if (!serverPort) {
    serverPort = 9000;
    console.log(`Seems like you didn't set the server port. Setting the default server port to ${serverPort}`);
}

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(function (req, res) {
    logInfo(`proxying the request to: ${targetUrl} with headers: ${JSON.stringify(req.headers)}`);
    proxy.web(req, res, {
        target: targetUrl,
        changeOrigin: true,
        secure: false
    });

    proxy.on('proxyRes', function (proxyRes, req, res) {
        logInfo(`response from: ${targetUrl} with status code: ${proxyRes.statusCode}\n`);
    });
}).listen(serverPort, () => {
    logInfo(`server listening on port ${serverPort}\n`);
});

ngrok.connect({ addr: serverPort, authtoken: ngrokAuthToken, ...(ngrokDomain && { domain: ngrokDomain }) })
    .then(listener => logInfo(`ngrok tunneling at: \x1b[33m${listener.url()}\x1b[0m\n`))
    .catch(err => logError(err));



