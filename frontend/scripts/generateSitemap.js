const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const xmlFormat = require('xml-formatter');

async function generateSitemap() {
    // Define your routes/URLs here
    const links = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/projects', changefreq: 'monthly', priority: 0.8 },
        { url: '/contact', changefreq: 'monthly', priority: 0.7 },
        // Add more routes as needed
    ];

    // Create a stream to write to
    // TODO: Replace 'https://your-domain.com' with your actual domain
    // This is important for generating absolute URLs in the sitemap
    if (!process.env.SITE_URL) {
    const stream = new SitemapStream({ hostname: 'https://your-domain.com' });

    // Return a promise that resolves with your XML string
    const sitemap = await streamToPromise(Readable.from(links).pipe(stream));

    // Format the XML to make it readable
    const formattedXml = xmlFormat(sitemap.toString(), {
        indentation: '  ',
        collapseContent: true,
    });

    // Write the sitemap to a file
    fs.writeFileSync('./public/sitemap.xml', formattedXml);
    
    console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);