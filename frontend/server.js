const express = require('express');
const next = require('next');
const httpProxy = require('http-proxy');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const apiUrl = `http://${process.env.API_HOST}/${process.env.API_PATH}`;

app
  .prepare()
  .then(() => {
    const server = express();

    const proxy = httpProxy.createProxyServer({
      target: `http://${process.env.API_HOST}`
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    // Proxy to api server
    server.use('/api', (req, res) => {
      proxy.web(req, res, { target: apiUrl })
    })

    // Proxy to Keystone
    server.use('/admin', (req, res) => {
      proxy.web(req, res, { target: apiUrl })
    })

    proxy.on('error', (error, req, res) => {
      if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error)
      }

      if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' })
      }

      const json = { error: 'proxy_error', reason: error.message }
      res.end(JSON.stringify(json))
    })

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
