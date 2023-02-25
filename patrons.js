module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added

    function getPatrons(res, mysql, context, complete){
        mysql.pool.query("SELECT `libraryID`, `firstName`, `lastName`, Rooms.roomNumber as`reservation` FROM `Patrons` LEFT JOIN `Rooms` ON `reservation` = Rooms.roomNumber", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons  = results;
            complete();
        });
    }

    // router.get('/', function(req, res) {
    //     res.render('patrons')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletePatron.js"];
        var mysql = req.app.get('mysql');
        // helper function calls
        getPatrons(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('patrons', context);
            }
        }
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Patrons WHERE libraryID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    return router;
}();