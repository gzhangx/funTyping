const fs = require('fs');
const fsextra = require('fs-extra');
const { exec } = require("child_process");
const url = 'https://gzhangx.github.io/bibletyping.github.io/';
const htmlname = 'build/index.html';
const html = fs.readFileSync(htmlname).toString()
    .replace(new RegExp('href="/', 'g'), `href="${url}`).replace(new RegExp('<script src="/', 'g'), `<script src="${url}`);
    
fs.writeFileSync(htmlname, html);

const outputDir = '../funTypingBuild'
fsextra.removeSync(outputDir + '/static');
fsextra.copySync('build', outputDir); 



async function doCmd(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                resolve(stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

async function commit() {
    process.chdir(outputDir);
    await doCmd('git add .');
    await doCmd('git commit -m "latest"');
    await doCmd('git push');
}

commit();