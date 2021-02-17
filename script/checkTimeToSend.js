const createPdf = require('./createPdf');

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours == '11' && minutes == '05') {
        createPdf();
        console.log('Done!');
        // Put your script of sending an email here.  
        // I made with nodemailer, but i removed to let the liberty for anyone use
        // the library that he wants to
    }
}

setInterval(getTime, 60000);
