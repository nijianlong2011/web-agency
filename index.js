const fs = require('fs')
const express = require('express')

const config = JSON.parse(fs.readFileSync('./config.json'))

const app = express()

const sendJson = (res, file) => res.send(fs.readFileSync('./json/' + file + '.json'))

for (const method in config) {
    for (const url in config[method]) {
        const file = config[method][url]
        switch (method) {
            case 'get':
                app.get(url, (req, res) => sendJson(res, file))
                break
            case 'post':
                app.post(url, (req, res) => sendJson(res, file))
                break
            case 'put':
                app.put(url, (req, res) => sendJson(res, file))
                break
            case 'delete':
                app.delete(url, (req, res) => sendJson(res, file))
                break
            default:

        }
    }
}

const server = app.listen(8080, () => {
    console.log('Example app listening at 8080')
})