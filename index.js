import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pages = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html',
};

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost:8080');

  const found = pages[pathname];
  const filename = found ?? '404.html';
  const status = found ? 200 : 404;

  fs.readFile(path.join(__dirname, filename), (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
      return;
    }
    res.writeHead(status, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(8080);
