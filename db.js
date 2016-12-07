const mongoose = require('mongoose');
const q = require('q');
const ratingSchema = mongoose.Schema({
    id: Number,
    rating: Number
})

const ratingModel = mongoose.model('rating', ratingSchema);

mongoose.connect('mongodb://taco:tacos123@ds119548.mlab.com:19548/bostad');
const db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('DB UP!');
});

getRating = (id) => {
    var dfd = q.defer();
    ratingModel.findOne({ 'id': id }, (err, rating) => {
        if (!err) {
            rating && console.log('rating', rating)
            dfd.resolve(rating)
        }
    })
    return dfd.promise;
}
updateRating = (id, rating) => {
    getRating(id).then(
        obj => {
            if(!obj){
                obj = new ratingModel({id,rating});
            }
            obj.rating = rating;
            obj.save();
        },
        err => {
            console.log(err);
        })
}

module.exports = {
    getRating,
    updateRating
}