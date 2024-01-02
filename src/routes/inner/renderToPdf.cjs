   // Import necessary modules
   const fs = require('fs');
   const puppeteer = require('puppeteer');
   const svelte = require('svelte/compiler');
   const sveltePreprocess = require('svelte-preprocess');

async function renderToPdf(filePath) {
    console.log(`Running for file ${filePath}`);
    // Check if file can be read
    const svelteFile = fs.readFileSync(filePath, 'utf-8');
    console.log(`Svelte File content: ${svelteFile.substr(0, 100)}...`);

    try {
        // Preprocess Svelte file
       const preprocessed = await svelte.preprocess(svelteFile, sveltePreprocess());
       
       //Compile Svelte to JS
       const compiledJs = svelte.compile(preprocessed.code);
    
        // Render JS to HTML using Puppeteer (headless browser)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
            ${compiledJs.js.code}
            </script>
        </body>
        </html>
        `;

        await page.setContent(html);

        // Convert HTML to PDF
        const pdfPath = `${filePath}.pdf`;
        await page.pdf({ path: pdfPath, format: 'A4' });
        console.log(`PDF successfully saved to ${pdfPath}`);

        await browser.close();
    } catch (error) {
        console.error(`Failed to generate PDF for ${filePath}: ${error.message}`);
    }
}

(async function run() {
    // Loop through each Svelte file
    const filepaths = process.argv.slice(2);
    console.log(`Processing ${filepaths.length} files.`);
    for (const filepath of filepaths) {
       console.log(`Processing file at ${filepath}`);
       await renderToPdf(filepath); // pass filepath directly
       console.log(`Finished processing file at ${filepath}`);
    }
})();
