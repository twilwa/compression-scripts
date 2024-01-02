const fs = require('fs');
const svelte = require('svelte/compiler');
const sveltePreprocess = require('svelte-preprocess');
const pdf = require('html-pdf'); // You'll need to install this package

const filePath = process.argv[2];
renderToPdf(filePath)

async function renderToPdf(filePath) {
    console.log(`Running for file ${filePath}`);
    // Check if file can be read
    const svelteFile = fs.readFileSync(filePath, 'utf-8');
    console.log(`Svelte File content: ${svelteFile.substr(0, 100)}...`);

    try {
        // Preprocess Svelte file
        const preprocessed = await svelte.preprocess(svelteFile, sveltePreprocess());

        // Compile Svelte to JS
        const compiledJs = svelte.compile(preprocessed.code);

        // Render JS to HTML using Svelte's SSR
        const { html } = svelte.render(compiledJs.js.code);

        // Convert HTML to PDF
        const pdfPath = `${filePath}.pdf`;
        pdf.create(html).toFile(pdfPath, function(err, res) {
            if (err) return console.log(err);
            console.log(`PDF successfully saved to ${pdfPath}`);
        });
    } catch (error) {
        console.error(`Failed to generate PDF for ${filePath}: ${error.message}`);
    }
}