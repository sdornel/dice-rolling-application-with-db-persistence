const fs = require('fs');

// Function to read and parse coverage percentage from a text report
function parseCoverage(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');
    
    // Assuming the percentage is in the line that starts with 'All files'
    const allFilesLine = lines.find(line => line.startsWith('All files'));
    const columns = allFilesLine.split('|').map(col => col.trim());
    
    // Assuming the % Lines coverage is in the 5th column
    return parseFloat(columns[4]);
}

// Paths to the coverage text files
const targetCoveragePath = 'coverage-target/coverage.txt';
const mainCoveragePath = 'coverage-main/coverage.txt';

// Parse the coverage percentages
const targetCoverage = parseCoverage(targetCoveragePath);
const mainCoverage = parseCoverage(mainCoveragePath);

// Calculate the difference in percentage
const coverageDiff = targetCoverage - mainCoverage;
const percentageDiff = ((coverageDiff / mainCoverage) * 100).toFixed(2);

// Output the result
console.log(`Target Coverage: ${targetCoverage}%`);
console.log(`Main Coverage: ${mainCoverage}%`);
console.log(`Coverage difference: ${percentageDiff}%`);

if (coverageDiff < 0) {
    console.log(`:warning: Coverage decreased by ${percentageDiff}%`);
} else {
    console.log(`:tada: Coverage increased by ${percentageDiff}%`);
}