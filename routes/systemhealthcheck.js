var express = require('express');
var CustomError = require('../controllers/errorhandling/customerror');
var systemhealthcheckitem = require('../controllers/systemhealthcheckup');
const Joi = require('joi');
/* GET home page. */
var routes = function (db) {
  var systemhealthcheckrouter = express.Router();
  systemhealthcheckrouter.route('/systemhealthcheck').post(function (req, res, next) {

    try {

      const schema = Joi.object().keys({
        OrganizationID: Joi.string().max(36).required(),
        BUID: Joi.string().max(36).required(),
        ApplicationID: Joi.string().max(36).required(),
        CheckID: Joi.number().integer().min(1).required(),
        CheckName: Joi.string().max(50).required(),
        CreatedBy: Joi.string().max(25).required(),
        Active: Joi.string().max(1).required()
      });
      const dataValidate = {
        OrganizationID: req.body.OrganizationID, BUID: req.body.BUID, ApplicationID: req.body.ApplicationID, CheckID: req.body.CheckID, CheckName: req.body.CheckName
        , CreatedBy: req.body.CreatedBy, Active: req.body.Active};

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
    

      // if (!req.body.OrganizationID || !req.body.BUID || !req.body.ApplicationID || !req.body.CheckID || !req.body.CheckName || !req.body.CreatedBy || !req.body.Active) {
      //   var err = new CustomError("bad arguments", {
      //     "line no": 10,
      //     "severity": "ERROR",
      //     "file": "systemhealthcheckroute",
      //     "routine": "empty check of request object"
      //   });
      //   next(err);
      //   return;
      // }

    } catch (ex) {
    next(ex);
    return;
  }
  systemhealthcheckitem.createCheckitem(db, req, res, next);
});
return systemhealthcheckrouter;
}


module.exports = routes;
