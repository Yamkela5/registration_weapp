module.exports = function(models) {

    var regNumberList = [];

    const index = function(req, res) {
        res.render('regis/add')

    };

    // const filtter = function (req, res) {
    //
    //   res.render('regis/add')
    // };
    const add = function(req, res, next) {

        var regNumber = {
            name: req.body.name
        }

        if (!regNumber || !regNumber.name) {
            req.flash('error', 'Registration Number should not be blank')
            res.redirect('registration')
        } else {

            models.RegNumberSchema.create({
                name: regNumber.name
            }, function(err, results) {
                if (err) {

                    if (err.code === 11000) {
                        req.flash('error', 'Registration Number already exist!')
                        res.redirect('registration')
                      
                    }
                    return next(err)
                } else {
                    res.render('regis/add', {
                        message: results
                    });
                }
            })
        }
        // regNumberList.push(regNumber);
        //
        //
        // res.render('regis/add', {message : regNumberList})
    }
    return {
        index,
        add,
        // filtter
    }
}
