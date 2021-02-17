# pdf-generator
Gerar um pdf com dados vindo diretamente do banco de dados, com a lib pdfMake.

## Introduction

My problem was create a pdf directly from the backend of my application and send it by email at an exactly time of the day.
So after searching on the internet, i found some ways to do it, utilizing puppeter and other, but, i found more complex than it should for what
i wanted to do.
Then i found the lib [pdfMake](http://pdfmake.org/#/), and made a script with Node.js that generates a pdf in the file createPdf.js
and another script in the file checkTimeToSend.js to check the time of the day that i'm suposted to send the pdf by email
