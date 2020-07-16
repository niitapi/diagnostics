var CustomError = require('../errorhandling/customerror');
const createHealthlearnercheckdetails=function(db, req,res,next) {

  db.getConnection(function (err, connection) {

    let updateStmt = 'update systemlearnerhealthcheckdetails set ResolveClicked=?, ResolveClickedDate=? where learnerhealthitemid=? and checkid=? and userid=?';
    let updateValues = [req.body.ResolveClicked, new Date(),req.body.id,req.body.CheckID,req.body.UserID]
  

    connection.query(updateStmt,updateValues, function (error, results, fields) {

        if (!error) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated learner health check details',
                });
                connection.release();
        }
        else {
            var err = new CustomError("Error", {
                "line no": 10,
                "severity": "ERROR",
                "file": "updatelearnerhealthcheckdetails",
                "routine": error.message
              });
            return next(err);
            connection.release();
        }
    });
});

    // db.none('update systemlearnerhealthcheckdetails set ResolveClicked=$1, ResolveClickedDate=$2 where learnerhealthitemid=$3 and checkid=$4 and userid=$5',
    // [req.body.ResolveClicked, new Date(),req.body.id,req.body.CheckID,req.body.UserID])
    // .then(function () {
    //   res.status(200)
    //     .json({
    //       status: 'success',
    //       message: 'Updated learner health check details'
    //     });
    // })
    // .catch(function (err) {
    //   return next(err);
    // });
}
module.exports= createHealthlearnercheckdetails