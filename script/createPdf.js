const pdfMake = require('pdfmake');
const fs = require('fs');
const fakeData = require('../db.json');

module.exports = () => {
    const fonts = {
        Calibri: {
            normal: 'fonts/Calibri Regular.ttf',
            bold: 'fonts/Calibri Bold.TTF',
        },
    };
    
    const columnsName = [
        {text: 'Nº', style: 'header'},
        {text: 'DATA', style: 'header',},
        {text: 'MODELO', style: 'header',},
        {text: 'COR', style: 'header',},
        {text: 'PLACA', style: 'header',},
        {text: 'CIDADE', style: 'header',},
        {text: 'UF', style: 'header',},
        {text: 'H.ENT', style: 'header',},
        {text: 'H.SAI', style: 'header',},
        {text: 'APT', style: 'header',},
    ];
    
    // tem q ser os nomes das props q tá vindo do json
    const propsFromDB = [
        'ID',
        'DATA',
        'MODELO',
        'COR',
        'PLACA',
        'CIDADE',
        'UF',
        'ENTRADA',
        'SAIDA',
        'APT',
    ];
    
    const pdf = new pdfMake(fonts);
    
    function headerData() {
        const date = new Date();
        const day = String(date.getDate()).length === 2 ? date.getDate() : `0${date.getDate()}`;
        const month = String(date.getMonth()).length === 2 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const year = date.getFullYear();
    
        const moment = `${day}/${month}/${year}`
    
        return {
            text: `EDEN MOTEL Movimento do dia: ${moment}`,
            style: 'normal'
        }
    }
    
    function buildTableBody(data, columns) {
        const body = [];
    
        body.push(columnsName);
        
        data.forEach((row, index) => {
            const dataRow = [];
            
            columns.forEach((column) => {
                const count = Number(Object.keys(data)[index]) + 1
                if (column === 'ID') dataRow.push(count.toString())
                else dataRow.push(row[column].toString())
            })
    
            body.push(dataRow);
        })
        return body;
    }
    
    function tableConstructor(data, columns) {
        return {
            margin: [0, 40, 0, 30],
            table: {
                widths: [14, 50, 80, 50, 50, 70, 13, 28, 25, 18],
                headerRows: 1,
                body: buildTableBody(data, columns)
            },
            layout: {
                hLineWidth: function (i, node) {
                    return 1;
                },
                vLineWidth: function (i, node) {
                    return  1;
                },
                hLineColor: function (i, node) {
                    return 'black';
                },
                vLineColor: function (i, node) {
                    return (i !== 0 || i !== node.table.widths.length) && 'black';
                },
                paddingTop: function(i, node) { return 4;},
            },
        };
    }
    
    const docDefinition = {
        defaultStyle: {
            font: 'Calibri',
            lineHeight: 1.3,
            fontSize: 9.5,
            alignment: 'center',
        },
    
        pageSize: 'A4',
    
        pageMargins: 54,
    
        styles: {
            normal: {
                fontSize: 11.7,
                alignment: 'left',
            },
            big: {
                fontSize: 15,
                bold: true,
                alignment: 'left',
            },
            small: {
                fontSize: 10,
                bold: true,
                alignment: 'left',
            },
            header: {
                fontSize: 11,
                bold: true,
            }
        },   
    
        content: [
            {
                columns: [
                    {
                        image: 'images/logo.png',
                        width: 46,
                        height: 46,
                        margin: [0, 0, 0, 8]
                    },
                    [
                        {
                            text: 'GOVERNO DO ESTADO DA PARAÍBA',
                            style: 'big',
                            margin: [10, 2, 0, 0],
                        },
                        {
                            text: 'SECRETARIA DE SEGURANÇA PÚBLICA',
                            style: 'small',
                            margin: [10, 0, 0, 0],
                        },
                        {
                            text: 'DIVISÃO DE POLICIA ADMINISTRATIVA',
                            style: 'normal',
                            margin: [10, 2, 0, 0],
                        },
                    ],
                ],
            },
            {
                text: 'MAPA DEMONSTRATIVO DE ENTRADA E SAÍDA DE HÓSPEDES',
                style: 'normal',
            },
            headerData(),
            tableConstructor(fakeData, propsFromDB),
            {
                columns: [
                    [
                        {
                            text: 'Visto do Proprietário ou Gerente',
                            style: 'normal',
                        },
                        {
                            text: '____/____/_______',
                            margin: [0, 0, 160, 0]
                        }
                    ],
                    [
                        {
                            text: 'Recebido em ____/____/_______',
                            style: 'normal',
                            margin: [80, 0, 0, 0]
                        },
                        {
                            text: 'Chefe ou Funcionário do D.P.A',
                            style: 'normal',
                            margin: [98, 0, 0, 0]
                        }
                    ]
                ]
            }
        ]
    };
    
    const pdfDoc = pdf.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('report.pdf'));
    pdfDoc.end();
}
