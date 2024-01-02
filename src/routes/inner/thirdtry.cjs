const puppeteer = require('puppeteer');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Replace with the path to your Svelte files
const svelteFilesPath = '/home/anon/active-tools-stack/interpreter/src/routes/inner/**/+page.svelte';

// Generate a list of URLs based on the Svelte files
const urls = glob.sync(svelteFilesPath).map(filePath => {
    // Extract the parent directory and the directory containing the file
    const parentDir = path.basename(path.dirname(path.dirname(filePath)));
    const dirContainingFile = path.basename(path.dirname(filePath));
    // Construct the URL
    return `http://skeleton.dev/${parentDir}/${dirContainingFile}`;
});

async function run() {
    const browser = await puppeteer.launch();

    // Ensure the output directory exists
    const outputDir = path.join(__dirname, 'output');
    fs.mkdirSync(outputDir, { recursive: true });

    for (const url of urls) {
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});

        // Extract the parent directory and the directory containing the file from the URL
        const urlParts = url.replace('http://skeleton.dev/', '').split('/');
        const parentDir = urlParts[0];
        const dirContainingFile = urlParts[1];

        // Define the output path for the PDF
        const outputPath = path.join(outputDir, `${parentDir}_${dirContainingFile}.pdf`);
        await page.pdf({path: outputPath, format: 'A4'});
        console.log(`PDF successfully saved to ${outputPath}`);
        await page.close();
    }

    await browser.close();
}

run().catch(error => {
    console.error('Error running the script:', error);
});