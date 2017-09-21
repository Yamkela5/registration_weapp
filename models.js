const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected successfully to the database.")
        }
    });


    var RegNumberSchema = mongoose.model('RegNumberSchema', {
        name: String
    });

    return {
        RegNumberSchema
    }
}
