const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/content/projects');

function encodeURLPath(fullPath) {
    // We only want to encode the path parts, not the protocol or slashes
    return fullPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

function processFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processFiles(fullPath);
        } else if (fullPath.endsWith('.mdx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Replace both /PortFolio/projects and /projects just in case
            content = content.replace(/src="(\/PortFolio)?\/projects\/([^"]+)"/g, (match, p1, p2) => {
                const encodedPath = encodeURLPath(p2);
                return `src="https://federicocolombo12.github.io/PortFolio/projects/${encodedPath}"`;
            });
            
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

processFiles(directoryPath);
console.log('Fixed links in MDX files!');
