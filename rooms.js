module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added

    function getRooms(res, mysql, context, complete){
        mysql.pool.query("SELECT `roomNumber`, `capacity` FROM `Rooms`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.rooms  = results;
            complete();
        });
    }


    // router.get('/', function(req, res) {
    //     res.render('rooms')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteRoom.js"];
        var mysql = req.app.get('mysql');
        getRooms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('rooms', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Rooms` VALUES (?, ?)";
        if (req.body.room_num ==""){
            return;
        }
        var inserts = [req.body.room_num, req.body.capacity];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/rooms');
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Rooms WHERE roomNumber = ?";
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