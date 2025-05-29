const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // Додано вказівку на кодування
      res.end('<h1>Ласкаво просимо на головну сторінку!</h1>');
    } else if (req.url === '/about') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end('<p>Це сторінка "Про нас".</p>');
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Сторінка не знайдена');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Сервер слухає на порту ${port}`);
});

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Тут ми можемо щось відправити');
// });

// const readFile = require('./readFile');

// readFile();

// Виведемо текст у консоль
// console.log("Хто тут?!");