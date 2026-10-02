const { PDFDocument } = require('pdfkit');
const fs = require('fs');
const path = require('path');
const textSize = 12;
const lineGap = 4;
const width = 400;
const first_name = '';
const last_name = '';
const email = '';
const gender = '';
const job_title = '';
const company = '';
const address = '';
const city = '';
const state = '';
const zip = '';

const PersonalInfoJson = fs.readFileSync('data.json');
const PersonalInfo = JSON.parse(PersonalInfoJson);


function generateCoverLetter(first_name, last_name, company, address, city, state, zip) {
    const doc = new PDFDocument({font: 'Courier'});
    const output = path.join(__dirname, 'output');
    const outputFile = path.join(output, 'Cover Letter ' + first_name + ' ' + last_name + '.pdf');
    doc.pipe(fs.createWriteStream(outputFile));

    doc.fontSize(textSize).text(company, {
        width: width,
        align: 'left',
        lineGap: lineGap,
    });

    doc.fontSize(textSize).text(address, {
        width: width,
        align: 'left',
        lineGap: lineGap,
    });

    doc.fontSize(textSize).text(city + ', ' + state + ' ' + zip, {
        width: width,
        align: 'left',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text('I am writing to express my strong interest in the Programmer position at ' + company + '. With a solid background in programming, I am excited about the opportunity to contribute to your teams success and further develop my career', {
        width: width,
        align: 'center',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text('Throughout my academic and professional journey, I have honed my skills in JavaScript, which I believe aligns well with the requirements of the Programmer role.', {
        width: width,
        align: 'center',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text('What excites me most about ' + company + ' is its reputation for solving complex business problems with technological solutions. I am inspired by your innovative approach, and I am eager to contribute my skills to help ' + company + ' achieve its mission.', {
        width: width,
        align: 'center',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text('Thank you for considering my application. I look forward to the possibility of contributing to ' + company + 's ongoing success. ', {
        width: width,
        align: 'center',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text('Sincerely,', {
        width: width,
        align: 'left',
        lineGap: lineGap,
    });

    doc.moveDown();
    doc.fontSize(textSize).text(first_name + ' ' + last_name, {
        width: width,
        align: 'left',
        lineGap: lineGap,
    });



    doc.end();
}


function main() {
    for (const [rowNumber, person] of Object.entries(PersonalInfo)) {
        generateCoverLetter(person.first_name, person.last_name, person.company, person.address, person.city, person.state, person.zip);
    }
}

main();