
import UserDiscoverySetup from './userDiscoverySetup.model';

/* --------------------------------- Get Data from DB.---------------------------------*/

exports.GetUserDiscoverySetupDataById = function(req, res) {
 UserDiscoverySetup.findOne({ MobileNumber: req.params.mobileNumber}).select('').exec((err, userDiscoverySetup) => {
      if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
      if (!userDiscoverySetup) return res.status(201).json({ success: false, message: 'Not Found!' });
      return res.status(200).json({ success: true, userDiscoverySetup });
    });

}

/* --------------------------------- Creates a Data in the DB.---------------------------------*/

exports.Create = function(req, res) {
   // Create a new image model and fill the properties
    let newUserDiscoverySetup = new UserDiscoverySetup();
    newUserDiscoverySetup.MobileNumber = req.body.MobileNumber;
    newUserDiscoverySetup.MinDistance = req.body.MinDistance;
    newUserDiscoverySetup.MaxDistance = req.body.MaxDistance;
    newUserDiscoverySetup.MinAge = req.body.MinAge;
    newUserDiscoverySetup.MaxAge = req.body.MaxAge;
    newUserDiscoverySetup.IntrestedInMale = req.body.IntrestedInMale;
    newUserDiscoverySetup.IntrestedInFemale = req.body.IntrestedInFemale;
    newUserDiscoverySetup.Language = req.body.Language;
    // newUserDiscoverySetup.CurrLoc = [req.body.curr_lat, req.body.curr_lng];
    newUserDiscoverySetup.save(err => {
        if (err)return res.sendStatus(400);
        res.status(201).send(newUserDiscoverySetup);
    });
};



/* --------------------------------- Update a Data in the DB.---------------------------------*/

exports.Update = function(req, res, next) {
   UserDiscoverySetup.findOne({ MobileNumber: req.params.mobileNumber}, function(err, userDiscoverySetup) {
    if (err) return handleError(res, err);
      userDiscoverySetup.MinDistance = req.body.MinDistance;
      userDiscoverySetup.MaxDistance = req.body.MaxDistance;
      userDiscoverySetup.MinAge = req.body.MinAge;
      userDiscoverySetup.MaxAge = req.body.MaxAge;
      userDiscoverySetup.IntrestedInMale = req.body.IntrestedInMale;
      userDiscoverySetup.IntrestedInFemale = req.body.IntrestedInFemale;
      userDiscoverySetup.Language = req.body.Language;
      // userDiscoverySetup.CurrLoc = [req.body.curr_lat, req.body.curr_lng];
      userDiscoverySetup.save(function(err) {         
      if (err) return handleError(res, err); 
        return res.status(200).send({message: 'Successfully updated...'});
      });
    });
}
