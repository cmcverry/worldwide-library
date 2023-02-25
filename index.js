module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getBooks(res, mysql, context, complete){
        mysql.pool.query("SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.books  = results;
            complete();
        });
    }

    function getRooms(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM Rooms", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getRooms(res, mysql, context, complete);
        getBooks(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('index', context);
            }

        }
    });
    return router;
}();