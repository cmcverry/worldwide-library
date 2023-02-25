module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added

    router.get('/', function(req, res) {
        res.render('patron_account')
    });

    // routes creating dynamic interation between web app and database 

    // router.get('/', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     // context.jsscripts = ["deleteperson.js"];
    //     var mysql = req.app.get('mysql');
    //     // helper function calls
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('patron_account', context);
    //         }

    //     }
    // });
    return router;
}();