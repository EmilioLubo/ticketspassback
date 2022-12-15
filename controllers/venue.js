const  Venue = require('../models/Venue')

const controller = {
    create:async(req,res) => {
        try{
            let newName = req.body.name.toLowerCase()
            let alreadyExist = await Venue.find({name: { $regex : new RegExp(`^${newName}$`, 'i') }})
            if(alreadyExist.length > 0){
                res.status(400).json({
                    success: false,
                    message: "venue name already exists"
                })
            } else{
                let newVenue = await Venue.create(req.body)
                res.status(201).json({
                    id: newVenue._id,
                    success: true,
                    message: "new venue created"
                })
            }
        } catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    read:async(req,res) => {
        let {query} = req
        try{
            let venues = await Venue.find(query)
            venues? res.status(200).json({
                response: venues,
                    success:true,
                    message: 'the venues were found'
            }) : res.status(404).json({
                success:false,
                message:'venues not found'
            })
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    update:async(req,res) => {
        let {id} = req.params
        try{
            let venue = await Venue.findOneAndUpdate({_id:id},req.body,{new:true})
            venue? res.status(200).json({
                response: venue,
                    success:true,
                    message: 'the venue was updated'
            }) : res.status(404).json({
                success:false,
                message:'venue not found'
            })
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    destroy:async(req,res) => {
        let {id} = req.params
        try{
            let venue = await Venue.findOneAndDelete({_id:id})
            venue? res.status(200).json({
                response: venue._id,
                    success:true,
                    message: 'the venue was deleted'
            }) : res.status(404).json({
                success:false,
                message:'venue not found'
            })
        }catch(err){
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    },
    show: async(req, res) => {
        let { id } = req.params;
        try {
            let venue = await Venue.findById(id);
            venue? res.status(200).json({
                response: venue,
                success: true,
                message:  "the venue was found"
            }) : res.status(404).json({
                success: false,
                message: "the venue wasn't found"
            })
        } catch(err) {
            res.status(400).json({
                success: false,
                message: err.message
            })
        }
    }

}

module.exports = controller