var CustomError = require('../errorhandling/customerror');
const updateHealthlearnercheck=function(db, req,res,next) {
    db.getConnection(function (err, connection) {

      let updateStmt = 'update systemlearnerhealthcheck set Issue=? where id=?';
      let updateValues = [req.body.Issue, req.body.id];

      connection.query(updateStmt, updateValues, function (error, results, fields) {

          if (!error) {
              res.status(200)
                  .json({
                      status: 'success',
                      message: 'Updated complete learner health check '
                  });
                  connection.release();
          }
          else {
            var err = new CustomError("error", {
                "line no": 10,
                "severity": "ERROR",
                "file": "updatehealthlearnercheckitem",
                "routine": error.message
              });
            return next(err);
              connection.release();
          }
      });
  });



    // console.log(req.body);
    //     db.none('update systemlearnerhealthcheck set Issue=$1 where id=$2',
    //     [req.body.Issue,req.body.id])
    //     .then(function () {
    //       res.status(200)
    //         .json({
    //           status: 'success',
    //           message: 'Updated complete learner health check '
    //         });
    //     })
    //     .catch(function (err) {
    //       return next(err);
    //     });




    }
    module.exports= updateHealthlearnercheck