'use strict'
const express = require('express');
const app = express();
const db = require('./db');
const q = require('q');
app.use(express.static('dist'))
app.use(require('body-parser').json());
app.put('/api/bostad/:id',(req,res)=> {
    db.updateRating(req.params.id,req.body.rating);
    res.send(); 
})
app.get('/api/bostad/:id?', (req, res) => {
    const id = req.params.id || 'f6f24a077a4a46c9faa778854487aa59344772bb';
    getHemnet(id).then(data => {
        if (data) {
            var dfds = [];
            data.forEach(prop => {
                var dfd = db.getRating(prop.id);
                dfds.push(dfd);
                dfd.then((data) => {
                    prop.rating = data && data.rating;
                })
            })
            console.log(dfds.length);
            var resolveds = 0;
            data.forEach(prop => {
                db.getRating(prop.id).then((data) => {
                    prop.rating = data && data.rating;
                });
            });

            q.allSettled(dfds).then(() => {
                var mappedData = data.map(obj => {
                    return {
                        "id": obj.id,
                        "address": obj.address,
                        "ongoingBidding": obj.ongoing_bidding,
                        "imageUrl": obj.medium_image_url,
                        "url": obj.url,
                        "rating": obj.rating
                    }
                })
                res.send(mappedData);
            })

        } else {
            res.status(500);
            res.send('Ingen data');
        }
    })
    //res.send('Welcome');
});
app.listen(process.env.PORT || 8081);

var getHemnet = (id) => {
    var def = q.defer();
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
            def.resolve(json.properties);
        })
    });
    return def.promise;
}