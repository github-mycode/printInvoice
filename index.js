console.log('test')
import express from "express";
import ptp from "pdf-to-printer";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;
const dirname = "C:\\My Code\\Anurag\\printTransportInvoice\\invoice1\\"

app.get('', async(req, res) => {
    console.log('printing test page.')
    fs.readdir(dirname, function(err, filenames) {
        filenames.forEach(function(filename) {
            let file = dirname + filename;
            console.log('printing file' + file);
            ptp
            .print(file)
            .then(console.log)
            .catch(console.error);
          });
        });
        

})

app.post('', express.raw({ type: 'application/pdf' }), async(req, res) => {

    const options = {};
    if (req.query.printer) {
        options.printer = req.query.printer;
    }
    const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

    fs.writeFileSync(tmpFilePath, req.body, 'binary');
    await ptp.print(tmpFilePath, options);
    fs.unlinkSync(tmpFilePath);

    res.status(204);
    res.send();
});

app.listen(port, () => {
    console.log(`PDF Printing Service listening on port ${port}`)
});
