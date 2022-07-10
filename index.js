const express = require('express');
const app = express();
const server = require('http').createServer(app)

app.get('/', (req, res) => res.sendFile('index.html', { root: '.' }))
app.get('/editor', (req, res) => res.sendFile('editor.html', { root: '.' }))
app.get('*', (req, res) => res.sendFile('404.html', { root: '.' }))

server.listen(3000, () => {
  console.log('listening on *:3000');
});