module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added

    router.get('/', function(req, res) {
        res.render('create_patron')
    });

    // routes creating dynamic interation between web app and database 

    router.post('/', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Patrons` (`firstName`, `lastName`) VALUES (?, ?)";
        var inserts = [req.body.fname, req.body.lname];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/patrons');
            }
        });
    });

    return router;
}();