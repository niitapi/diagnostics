var CustomError = require('../errorhandling/customerror');
var Q = require("q");
const updateItemHealthLearnercheckDetails = function (db, req, res, next) {
  var deferred = Q.defer();
  db.getConnection(function (err, connection) {

    let updateStmt = 'update systemlearnerhealthcheckdetails set Issue=?, SystemInformation=? where learnerhealthitemid=? and checkid=? and userid=?';
    let updateValues = [req.body.Issue,req.body.SystemInformation,req.body.id,req.body.CheckID,req.body.UserID]
   

    connection.query(updateStmt, updateValues, function (error, results, fields) {
        
      if (!error) {
        deferred.resolve();
      }
      else
      {
        deferred.reject(error);
      }
    })
  });

  return deferred.promise;
}

// var Q = require("q");
// const updateItemHealthLearnercheckDetails=function(db, req,res,next) {
//   var deferred = Q.defer();
//         db.none('update systemlearnerhealthcheckdetails set Issue=$1, SystemInformation=$5 where learnerhealthitemid=$2 and checkid=$3 and userid=$4',
//         [ req.body.Issue,req.body.id,req.body.CheckID,req.body.UserID,req.body.SystemInformation])
//         .then(function () {
//           deferred.resolve();
//         },function(err){
//           deferred.reject(err);
//         })
//         .catch(function (err) {
//           deferred.reject(err);
//         });
//         return deferred.promise;
//     }

      // if (!error) {
      //   res.status(200)
      //     .json({
      //       status: 'success',
      //       message: 'Updated learner health check details',
      //     });
      //   connection.release();
      // }
      // else {
      //   var err = new CustomError("Error", {
      //     "line no": 10,
      //     "severity": "ERROR",
      //     "file": "updateitemhealthlearnercheckdetails",
      //     "routine": error.message
      //   });
      // return next(err);
      //   connection.release();
      // }


module.exports = updateItemHealthLearnercheckDetails