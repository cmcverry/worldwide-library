module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // helper functions containing queries to be added


    function getLibrarians(res, mysql, context, complete){
        mysql.pool.query("SELECT `employeeID`, `firstName`, `lastName`, Genres.name as `focus` FROM `Librarians` LEFT JOIN `Genres` ON `focus` = Genres.id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees  = results;
            complete();
        });
    }

    function getGenres(res, mysql, context, complete){
        mysql.pool.query("SELECT `id`, `name` from `Genres`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.genres  = results;
            complete();
        });
    }
    // router.get('/', function(req, res) {
    //     res.render('employees')
    // });

    // routes creating dynamic interation between web app and database 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteLibrarian.js"];
        var mysql = req.app.get('mysql');
        getLibrarians(res, mysql, context, complete);
        getGenres(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('employees', context);
            }

        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Librarians` (`firstName`, `lastName`, `focus`) VALUES (?, ?, ?)";
        var inserts = [req.body.lib_fName, req.body.lib_lName, req.body.focus];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/employees');
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Librarians WHERE employeeID = ?";
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