const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const INPATH_BASE = "/var/www/mosaic-web/input";
const OUTPATH_BASE = "/var/www/mosaic-web/output";

const startScriptPath = '/mosaic/web-start.sh';
const progressPattern = /^Status: progress (\d{1,3})/;
const completedPattern = /Status: completed/;
const cancelledPattern = /Status: canceled/;

function execMP4toMP4(infile, outfile, ws) {
    const {
        id,
        filename,
        mode,
        performance,
        fps,
        analytics,
    } = ws;

    const inpath = path.join(INPATH_BASE, infile);
    const outpath = path.join(OUTPATH_BASE, outfile);
    
    if (fs.existsSync(outpath)) {
        fs.rmSync(outpath, { force: true });
    }
    
    const procCatCLArgs = [
        '--mode', `${mode}`, 
        '--inpath', `${inpath}`, 
        '--outpath', `${outpath}`, 
        '--zoomRange', `${performance}`,
        '--fps', `${fps}`,
        '--context', 'ui',
        '--wsid', `${ws.id}`
    ];

    const procCatCL = child_process.execFile(startScriptPath, procCatCLArgs);

    procCatCL.stdout.on('data', (data) => {
        let matchResult = data.match(progressPattern);
        if (matchResult) {
            if (ws && ws.readyState === ws.OPEN) {
                ws.send(data);
            }
        } else if (data.match(completedPattern)) {
            if (ws && ws.readyState === ws.OPEN) {
                ws.send('Status: progress 100');
                ws.send(`DOWNLOAD: ${outfile}`);
            }
        } else if (data.match(cancelledPattern)) {
            if (ws && ws.readyState === ws.OPEN) {
                ws.send(data);
            }
        }
    });
    procCatCL.stderr.on('data', (data) => {
        const msg = `catCL stderr: ${data}`;
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(msg);
        }
    });
    procCatCL.on('close', (code) => {
        const msg = `catCL exited with code ${code}`;
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(msg);
        }
    });

    return procCatCL;
}

exports.execMP4toMP4 = execMP4toMP4;