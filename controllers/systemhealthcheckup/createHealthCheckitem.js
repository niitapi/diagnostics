var CustomError = require('../errorhandling/customerror');
const createCheckitem = function (db, req, res, next) {

    db.getConnection(function (err, connection) {

        let insertStmt = 'insert into systemhealthcheck(OrganizationID, BUID, ApplicationID, CheckID,CheckName,CheckDescription,ResolutionText,ResolutionURL,CreatedBy,Active)VALUES(?,?,?,?,?,?,?,?,?,?)';
        let insertValues = [req.body.OrganizationID, req.body.BUID, req.body.ApplicationID, req.body.CheckID, req.body.CheckName, req.body.CheckDescription, req.body.ResolutionText, req.body.ResolutionURL, req.body.CreatedBy, req.body.Active];

        connection.query(insertStmt, insertValues, function (error, results, fields) {

            if (!error) {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted one health check item',
                    });
                    connection.release();
            }
            else {
                var err = new CustomError("error", {
                    "line no": 10,
                    "severity": "ERROR",
                    "file": "createhealthcheckitem",
                    "routine": error.message
                  });
                return next(err);
                connection.release();
            }
        });
    });



    //console.log("dataaaaaaaaaa:", req.body.OrganizationID);
    // db.none('insert into systemhealthcheck(OrganizationID, BUID, ApplicationID, CheckID,CheckName,CheckDescription,ResolutionText,ResolutionURL,CreatedBy,Active)' +
    //     'values(${OrganizationID}, ${BUID}, ${ApplicationID}, ${CheckID},${CheckName},${CheckDescription},${ResolutionText},${ResolutionURL},${CreatedBy},${Active})',
    //     req.body)
    //     .then(function (result) {
    //         res.status(200)
    //             .json({
    //                 status: 'success',
    //                 message: 'Inserted one health check item',
    //             });
    //     })
    //     .catch(function (err) {
    //         return next(err);
    //     });
}
module.exports = createCheckitem