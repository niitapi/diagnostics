var CustomError = require('../errorhandling/customerror');
const getUserSpecificHealthlearnercheckdetails=function(db, req,res,next) {
    

  db.getConnection(function (err, connection) {

    let selectStmt = 'select sl2.clickedon,sl1.organizationid,sl1.learnerhealthitemid,sl1.buid,sl1.applicationid,sl1.checkid,sl1.checkname,sl1.userid,sl1.useremailid,sl1.resolveclicked,sl1.resolveclicked,sl1.resolveclickeddate,sl1.issue,sl1.systeminformation from systemlearnerhealthcheckdetails sl1 inner join systemlearnerhealthcheck sl2  on sl1.learnerhealthitemId = sl2.id where sl1.applicationId=? and DATE(clickedon) between ? and ? order by learnerhealthitemid desc,checkid';
    let whereValues = [req.query.applicationId,req.query.startdate, req.query.enddate ]
  

    connection.query(selectStmt,whereValues, function (error, results, fields) {

        if (!error) {
            res.status(200)
                .json({
                    status: 'success',
                    message: results,
                });
                connection.release();
        }
        else {
            var err = new CustomError("Error", {
                "line no": 10,
                "severity": "ERROR",
                "file": "getuserspecficdata",
                "routine": error.message
              });
            return next(err);
            connection.release();
        }
    });
});
    





    //     db.any('select clickedon,systemlearnerhealthcheckdetails.* from systemlearnerhealthcheckdetails inner join systemlearnerhealthcheck  on systemlearnerhealthcheckdetails.learnerhealthitemId = systemlearnerhealthcheck.id where systemlearnerhealthcheckdetails.applicationId=$3 and clickedon between $1 and $2   order by learnerhealthitemid desc,checkid',
    //     [req.query.startdate,req.query.enddate,req.query.applicationId])
    //     .then(function (result) {
    //       res.status(200)
    //         .json({
    //           status: 'success',
    //           message: result
    //         });
    //     })
    //     .catch(function (err) {
    //       return next(err);
    //     });
     }
    module.exports= getUserSpecificHealthlearnercheckdetails