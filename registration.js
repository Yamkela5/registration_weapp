module.exports = function(models) {

     var regNumberList = [];

     const Index = function(req, res) {
       models.RegNumberSchema.find({}, function(err, results){

         if (err) {
           console.log(err);
         }
         res.render('regis/add')
       })

     };

     const findAll = function (req, res) {
       models.RegNumberSchema.find({},function( err,results){

         if (err) {
           console.log(err);
         }

       res.render('regis/add')
     });
}
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
                 } else {
                   models.RegNumberSchema.find({},function( err,results){

                     if (err) {
                       console.log(err);
                     }
                     else {
                       res.render('regis/add', {
                         message: results

                       });
                   }

                 })

                 }
             })
         }
     }
     const fillter = function(req, res){
       var towns= req.body.NumberPlates
       models.RegNumberSchema.find({
         name:{
           "$regex":'.*'+ towns +'.*'
         }
       },function (err, townPlates) {
         if (err) {
           console.log(err);
         }else{
           res.render('regis/add',{
             results:townPlates
           })
         }
       })
     }
     return {
         Index,
         add,
         findAll,
         fillter
     }
}
