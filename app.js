const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/savePage', (req, res) => {
    let pageData = { angel: JSON.parse(req.body.pageMetadata) }
    let eventData = { angel: JSON.parse(req.body.eventMetadata) }
    let exists = fs.existsSync('./export')
    if (!exists) {
        fs.mkdirSync('./export')
    }
    fs.open('./export/page-metadata.json', 'a+', (err, data) => {
        if (err) {
            return res.send("fail")
        } else {
            fs.writeFileSync('./export/page-metadata.json', JSON.stringify(pageData));
        }
    });
    fs.open('./export/event-metadata.json', 'a+', (err, data) => {
        if (err) {
            return res.send("fail")
        } else {
            fs.writeFileSync('./export/event-metadata.json', JSON.stringify(eventData));
        }
    });
    res.send(true)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))