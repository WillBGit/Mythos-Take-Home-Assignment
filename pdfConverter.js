const { PDFDocument } = require('pdfkit');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const textSize = 12;
const lineGap = 4;
const width = 450;

// Run the python script to read in the csv file and update the data.json file with the relevant data for each person in the csv file. This is done so that the pdfConverter.js script can read in the data.json file and generate a cover letter for each person in the csv file.
execSync('python csvReader.py', (error, stdout, stderr) => {
    if (error) {
        console.error(`error with python script: ${error.message}`);
            return;
    }
});

// Read and parse the data.json file into a dictionary with the relevant data for each person.
const personalInfoJson = fs.readFileSync('data.json');
const personalInfo = JSON.parse(personalInfoJson);

// Generate a cover letter for each peron using the data from the parsed dictionary. Also adds embedded data to each cover letter with time created and the relevant json data. Then, send the generated cover letter to the output folder.
function generateCoverLetter(rowNumber, first_name, last_name, company, address, city, state, zip) {
    const doc = new PDFDocument({font: 'Courier'});
    const output = path.join(__dirname, 'output');
    const embeddedData = {rowNumber, first_name, last_name, company, address, city, state, zip};
    const outputFile = path.join(output, 'Cover Letter ' + first_name + ' ' + last_name + '-' + rowNumber + '.pdf');

    doc.file(Buffer.from(JSON.stringify(embeddedData, null, 2)), {
        name: first_name + ' ' + last_name + ' Cover Letter.json',
        type: 'application/json',
        creationDate: new Date(),
        modifiedDate: new Date(),
        description: 'data for cover letter for ' + first_name + ' ' + last_name + ' to ' + company,
        });
    

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
    doc.fontSize(textSize).text('I am writing to express my strong interest in the Programmer position at ' + company + '. With a solid background in programming, I am excited about the opportunity to contribute to your team' +  "'s " + 'success and further develop my career', {
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
    doc.fontSize(textSize).text('Thank you for considering my application. I look forward to the possibility of contributing to ' + company + "'" + 's ongoing success. ', {
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

// Run the generateCoverLetter function for each person in the personalInfo dictionary.
function main() {
    for (const [rowNumber, person] of Object.entries(personalInfo)) {
        generateCoverLetter(rowNumber, person.first_name, person.last_name, person.company, person.address, person.city, person.state, person.zip);
    }
}

main();