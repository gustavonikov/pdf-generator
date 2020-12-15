const createPdf = require('./createPdf');

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours == '11' && minutes == '05') {
        createPdf();
        console.log('Done!');
        // Só colocar a função do nodemailer pra enviar o arquivo que é criado no dir raiz,
    }
}

setInterval(getTime, 60000);
