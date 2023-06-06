const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'beginner.txt'), 'utf8', (err, text2) => {
    if (!err) {
        const myArray = text2.split('\r\n');
        fs.writeFile(path.join(__dirname, 'words.js'), JSON.stringify([myArray]), err => {
            if (err) throw err;
            console.log('Bible Created Successfully!')
        });
    }
})