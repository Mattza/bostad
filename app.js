'use strict'
const express = require('express');
const app = express();
app.use(express.static('public'))
app.get('/api/bostad/:id?', (req, res) => {
    const id = req.params.id || 'f6f24a077a4a46c9faa778854487aa59344772bb';
    get(id, data => {
        if (data) {
            console.log(data)
            var mappedData = data.map(obj => {
                return {
                    "address": obj.address,
                    "ongoingBidding": obj.ongoing_bidding,
                    "imageUrl": obj.medium_image_url,
                    "url": obj.url
                }
            })
            res.send(mappedData);
        } else {
            res.status(500);
            res.send('Ingen data');
        }
    })
    //res.send('Welcome');
});
app.listen(80);

var get = (id, cb) => {
    require('http').get({
        host: 'www.hemnet.se',
        path: '/bostader/search/' + id,
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.20 (KHTML, like Gecko) Chrome/11.0.672.2 Safari/534.20'
        }
    }, response => {
        let datas = ''
        response.on('data', data => {
            datas += data.toString();
        });
        response.on('end', () => {
            const json = JSON.parse(datas);
            cb(json.properties);
            //console.log(json.properties.length);
            //json.properties.forEach(obj => console.log(obj.address))
        })
    });
}