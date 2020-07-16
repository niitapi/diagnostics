var express = require('express');
var CustomError = require('../controllers/errorhandling/customerror');
var learnerhealthcheckdetails = require('../controllers/learnerhealthcheckdetails');
var learnerhealthcheck = require('../controllers/learnerhealthcheck');
var request = require('request'); //added by bharani
const config = require('../config');
var async = require("async");
const Joi = require('joi');
/* GET home page. */
var routes = function (db) {
  var systemhealthcheckrouter = express.Router();
  systemhealthcheckrouter.route('/systemhealthlearnercheckdetails').post(function (req, res, next) {
  
    try {

      const schema = Joi.object().keys({
        OrganizationID: Joi.string().max(36).required(),
        BUID: Joi.string().max(36).required(),
        ApplicationID: Joi.string().max(36).required(),
        learnerhealthitemid: Joi.number().integer().required(),
        UserID: Joi.string().max(20).required(),
        CheckID: Joi.number().integer().required()
      });
      const dataValidate = {
        OrganizationID: req.body.OrganizationID, BUID: req.body.BUID,
        ApplicationID: req.body.ApplicationID,
        learnerhealthitemid: req.body.learnerhealthitemid,
        UserID: req.body.UserID,
        CheckID: req.body.CheckID
      };

      const result = Joi.validate(dataValidate, schema);


      if (result.error != null) {
        var err = new CustomError("bad arguments", {
          "line no": 17,
          "severity": "ERROR",
          "file": "systemhealthlearnercheck",
          "routine": result.error.message
        });
        next(err);
        return;
      }


      // if (!req.body.OrganizationID || !req.body.BUID || !req.body.ApplicationID) {
      //   var err = new CustomError("bad arguments", {
      //     "line no": 10,
      //     "severity": "ERROR",
      //     "file": "systemhealthlearnercheck",
      //     "line": "17",
      //     "routine": "empty check of request object"
      //   });
      //   next(err);
      //   return;
      // }





    } catch (ex) {
      next(ex);
      return;
    }
    learnerhealthcheckdetails.createHealthlearnercheckdetails(db, req, res, next);

  })
    .get(function (req, res, next) {
    

      try {
       
        /*code added by bharani*/
        request.get({
          url: config.tokenApiBaseUrl + "api/v1/validate",
          headers: { 'x-access-token': req.get("Authorization") }
        },
          function (error, response) {
            if (!error) {
              var parsed_body = JSON.parse(response.body);
              if (parsed_body.success == true)





                if (!req.query.startdate) {
                  learnerhealthcheckdetails.getAllData(db, req, res, next);
                }
                else {
                  learnerhealthcheckdetails.getUserSpecificData(db, req, res, next);
                }





              else {
                var err = new CustomError("bad arguments", {
                  "line no": 55,
                  "severity": "ERROR",
                  "file": "systemhealthlearnercheckdetail",
                  "line": "55",
                  "routine": parsed_body.message
                });
                next(err);
                return;
              }
            }
            else {
              var err = new CustomError("bad arguments", {
                "line no": 65,
                "severity": "ERROR",
                "file": "systemhealthlearnercheckdetail",
                "line": "65",
                "routine": "empty check of request object"
              });
              next(err);
              return;
            }
          });

        /**code ended by bharani */

      }

      catch (ex) {
        next(ex);
        return;
      }

    })
    .put(function (req, res, next) {
      try {
        if (!req.body.UserID || !req.body.CheckID || !req.body.id) {
          var err = new CustomError("bad arguments", {
            "line no": 29,
            "severity": "ERROR",
            "file": "systemhealthlearnercheckdetail",
            "line": "29",
            "routine": "empty check of request object"
          });
          next(err);
          return;
        }
        if (!!req.body.Issue) {
          async.series([function (callback) {
                  
        

            learnerhealthcheckdetails.updateItemHealthLearnercheckDetails(db, req, res, next).then(function () {
              callback(null, null)
            })

          }, function (callback) {
            if (req.body.Issue == "Y") {
              learnerhealthcheck.updateHealthlearnercheck(db, req, res, next)
                .then(function () {
                  callback(null, null)
                })
            }
            else {
              callback(null, null);
            }

          }], function (err, result) {
            if (err) {
              res.status(500)
                .json({
                  status: 'error',
                  message: err
                });
            } else {
              res.status(200)
                .json({
                  status: 'success',
                  message: 'Updated complete learner health check and details '
                });
            }

          });



        } else {
          learnerhealthcheckdetails.updateResolveHealthlearnercheckdetails(db, req, res, next);
        }
      } catch (ex) {
        next(ex);
        return;
      }



    })
  return systemhealthcheckrouter;
}


module.exports = routes;
