# pdf-generator
Generates a pdf directly from the server with data from the database, with the lib pdfMake.

## Introduction

My problem was create a pdf directly from the backend of my application and send it by email at an exactly time of the day.

So after searching on the internet, i found some ways to do it, utilizing puppeter and others, but, i thought it was more complex than it should be.

Then i found the lib [pdfMake](http://pdfmake.org/#/), and made a script with Node.js that generates a pdf in the file createPdf.js
and another script in the file checkTimeToSend.js to check the time of the day that i'm suposted to send the pdf by email.

I left an example already, its not consuming data from any database, i left only a db.json file using [json-server](https://www.npmjs.com/package/json-server),
for you to test if pleases you, but its really to replace with your data from the database.

## Usage

After you clone this repository utilizing ```git clone https://github.com/gustavonikov/pdf-generator.git``` or 
download the ZIP file, run ```npm install```.

Then, to run the file, just run ```node script/createPdf.js``` or ```node script/checkTimeToSend.js```.
