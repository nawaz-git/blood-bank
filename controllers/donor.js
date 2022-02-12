const DDModel = require('../models/donorform')


exports.getdonors =  async(req, res) => {
    const donors = await DDModel.find()
    res.status(200).json(donors);
}

exports.postdonorform = async (req, res) => {
    if(!req.body.Gender || !req.body.phone || !req.body.BloodGroup )
    {
        res.json({
            msg:"please enter data"
        })
    }
   const BG = [ 'A+' , 'B+' , 'A-','B-','AB+','AB-','O+', 'O-'];
   if(!BG.includes(req.body.BloodGroup))
   {
       res.status(401).json({
           msg:"please enter valid bloodgroup"
       })
   }
   else
   {
    const form = new DDModel(req.body);
    await form.save();
    res.json(form);
   }
}