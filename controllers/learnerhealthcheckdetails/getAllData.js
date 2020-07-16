var CustomError = require('../errorhandling/customerror');
const getAllHealthlearnercheckdetails=function(db, req,res,next) {


  db.getConnection(function (err, connection) {

    let selectStmt = 'select sl2.clickedon,sl1.organizationid,sl1.learnerhealthitemid,sl1.buid,sl1.applicationid,sl1.checkid,sl1.checkname,sl1.userid,sl1.useremailid,sl1.resolveclicked,sl1.resolveclicked,sl1.resolveclickeddate,sl1.issue,sl1.systeminformation from systemlearnerhealthcheckdetails sl1 inner join systemlearnerhealthcheck sl2  on sl1.learnerhealthitemId = sl2.id order by learnerhealthitemid desc,checkid';
  

    connection.query(selectStmt, function (error, results, fields) {

        if (!error) {
            res.status(200)
                .json({
                    status: 'success',
                    message: results,
                });
                connection.release();
        }
        else {
            var err = new CustomError("error", {
                "line no": 10,
                "severity": "ERROR",
                "file": "getalldata",
                "routine": error.message
              });
            return next(err);
            connection.release();
        }
    });
});


        // db.any('select clickedon,systemlearnerhealthcheckdetails.* from systemlearnerhealthcheckdetails inner join systemlearnerhealthcheck  on systemlearnerhealthcheckdetails.learnerhealthitemId = systemlearnerhealthcheck.id order by learnerhealthitemid desc,checkid')
        // .then(function (result) {
        //   res.status(200)
        //     .json({
        //       status: 'success',
        //       message: result
        //     });
        // })
        // .catch(function (err) {
        //   return next(err);
        // });


    }
    module.exports= getAllHealthlearnercheckdetails