var express = require('express');
var CustomError = require('../controllers/errorhandling/customerror');
var learnerhealthcheck = require('../controllers/learnerhealthcheck');
const Joi = require('joi');
/* GET home page. */
var routes = function (db) {
  var systemhealthcheckrouter = express.Router();
  systemhealthcheckrouter.route('/systemhealthlearnercheck').post(function (req, res, next) {

    try {


      const schema = Joi.object().keys({
        OrganizationID: Joi.string().max(36).required(),
        BUID: Joi.string().max(36).required(),
        ApplicationID: Joi.string().max(36).required(),
        UserID: Joi.string().max(25).required(),
        Issue: Joi.string().max(1).required()
      });
      const dataValidate = {
        OrganizationID: req.body.OrganizationID, BUID: req.body.BUID,
        ApplicationID: req.body.ApplicationID , Issue: req.body.Issue, UserID: req.body.UserID };

      const result = Joi.validate(dataValidate, schema);


      if (result.error != null) {
        var err = new CustomError("bad arguments", {
          "line no": 10,
          "severity": "ERROR",
          "file": "systemhealthcheckroute",
          "routine": result.error.message
        });
        next(err);
        return;
      }



      // if (!req.body.OrganizationID || !req.body.BUID || !req.body.ApplicationID || !req.body.Issue) {
      //   var err = new CustomError("bad arguments", {
      //     "line no": 10,
      //     "severity": "ERROR",
      //     "file": "systemhealthlearnercheck",
      //     "line": "17",
      //     "routine": "empty  check of request object"
      //   });
      //   next(err);
      //   return;



    } catch (ex) {
      next(ex);
      return;
    }
    learnerhealthcheck.createHealthlearnercheck(db, req, res, next);
  });
  return systemhealthcheckrouter;
}


module.exports = routes;
