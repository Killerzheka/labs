// імпортуємо модуль fs
const fs = require('fs');

const readFile = () => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Помилка читання файлу:', err);
          return;
        }
        console.log('Вміст файлу:', data);
      });
};

module.exports = readFile;
