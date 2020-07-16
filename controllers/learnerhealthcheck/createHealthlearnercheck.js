var CustomError = require('../errorhandling/customerror');
const createHealthlearnercheck=function(db, req,res,next) {



    db.getConnection(function (err, connection) {

        let insertStmt = 'INSERT INTO systemlearnerhealthcheck(organizationid,buid,applicationid,userid,useremailid,issue)VALUES(?,?,?,?,?,?)';
        let insertValues = [req.body.OrganizationID, req.body.BUID, req.body.ApplicationID, req.body.UserID, req.body.UserEMailID, req.body.Issue];

        connection.query(insertStmt, insertValues, function (error, results, fields) {

            if (!error) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: {id:results.insertId} ,
                    });
                    connection.release();
            }
            else {
                var err = new CustomError("error", {
                    "line no": 10,
                    "severity": "ERROR",
                    "file": "createhealthlearnercheckitem",
                    "routine": error.message
                  });
                return next(err);
                connection.release();
            }
        });
    });




    // db.one('insert into systemlearnerhealthcheck(OrganizationID, BUID, ApplicationID, UserID,UserEMailID,Issue)' +
    //     'values(${OrganizationID}, ${BUID}, ${ApplicationID}, ${UserID},${UserEMailID},${Issue}) returning id',
    //     req.body)
    //     .then(function (result) {
    //         console.log("data",result);
    //         res.status(200)
    //             .json({
    //                 status: 'success',
    //                 message: result,
    //             });
    //     })
    //     .catch(function (err) {
    //         return next(err);
    //     });
}
module.exports= createHealthlearnercheck