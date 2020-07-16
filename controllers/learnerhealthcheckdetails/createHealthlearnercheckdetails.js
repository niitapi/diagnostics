var CustomError = require('../errorhandling/customerror');
const createHealthlearnercheckdetails=function(db, req,res,next) {


    db.getConnection(function (err, connection) {

        let insertStmt = 'insert into systemlearnerhealthcheckdetails(learnerhealthitemid,OrganizationID, BUID, ApplicationID, UserID,UserEMailID,CheckID,CheckName,Issue,SystemInformation)VALUES(?,?,?,?,?,?,?,?,?,?)';
        let insertValues = [req.body.learnerhealthitemid,req.body.OrganizationID, req.body.BUID, req.body.ApplicationID, req.body.UserID, req.body.UserEMailID, req.body.CheckID, req.body.CheckName, req.body.Issue, req.body.SystemInformation];

        connection.query(insertStmt, insertValues, function (error, results, fields) {

            if (!error) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: "Inserted learner system health check",
                    });
                    connection.release();
            }
            else {
                var err = new CustomError("error", {
                    "line no": 10,
                    "severity": "ERROR",
                    "file": "createhealthlearnercheckdetails",
                    "routine": error.message
                  });
                return next(err);
                connection.release();
            }
        });
    });





    // db.none('insert into systemlearnerhealthcheckdetails(learnerhealthitemid,OrganizationID, BUID, ApplicationID, UserID,UserEMailID,CheckID,CheckName,Issue,SystemInformation)' +
    // 'values($(learnerhealthitemid),${OrganizationID}, ${BUID}, ${ApplicationID}, ${UserID},${UserEMailID},${CheckID},${CheckName},${Issue},${SystemInformation})',
    // req.body)
    // .then(function (result) {
    //     res.status(200)
    //         .json({
    //             status: 'success',
    //             message: 'Inserted learner system health check'
    //         });
    // })
    // .catch(function (err) {
    //     return next(err);
    // });
    
}







module.exports= createHealthlearnercheckdetails



