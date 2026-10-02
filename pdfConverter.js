const { PDFDocument } = require('pdfkit');
const fs = require('fs');
const textSize = 12;
const lineGap = 4;
const width = 400;


const doc = new PDFDocument({font: 'Courier'});
doc.pipe(fs.createWriteStream('CoverLetter.pdf'));

doc.fontSize(textSize).text(PersonalInfo.companyName, {
    width: width,
    align: 'left',
    lineGap: lineGap,
});

doc.fontSize(textSize).text(PersonalInfo.address, {
    width: width,
    align: 'left',
    lineGap: lineGap,
});

doc.fontSize(textSize).text(PersonalInfo.cityStateZip, {
    width: width,
    align: 'left',
    lineGap: lineGap,
});

doc.moveDown();
doc.fontSize(textSize).text('I am writing to express my strong interest in the Programmer position at [Company Name]. With a solid background in programming, I am excited about the opportunity to contribute to your teams success and further develop my career', {
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
doc.fontSize(textSize).text('Throughout my academic and professional journey, I have honed my skills in JavaScript, which I believe aligns well with the requirements of the Programmer role.', {
    width: width,
    align: 'center',
    lineGap: lineGap,
});

doc.moveDown();
doc.fontSize(textSize).text('What excites me most about [Company Name] is its reputation for solving complex business problems with technological solutions. I am inspired by your innovative approach, and I am eager to contribute my skills to help [Company Name] achieve its mission.', {
    width: width,
    align: 'center',
    lineGap: lineGap,
});

doc.moveDown();
doc.fontSize(textSize).text('Thank you for considering my application. I look forward to the possibility of contributing to [Company Name]s ongoing success. ', {
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
doc.fontSize(textSize).text('[Your Name]', {
    width: width,
    align: 'left',
    lineGap: lineGap,
});



doc.end();