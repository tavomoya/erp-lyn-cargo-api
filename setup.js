var fs = require('fs');

// Crear directorio de archivos
if (!fs.existsSync('log')) {
    console.log('[*] Creating Log directory');
    fs.mkdirSync('log');
}
