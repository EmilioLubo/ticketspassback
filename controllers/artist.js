const Artist = require('../models/Artist')

const controller = {
    create: async(req, res) => {
        try {
            let newArtist = await Artist.create(req.body);
            res.status(201).json({
                data: newArtist._id,
                success: true,
                message: 'artist created successfully',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    read: async(req, res) => {
        let query = {}
        if(req.query.name){
            query.name = {$regex : req.query.name, $options: 'i'}
        }
        if(req.query.genre){
            query.genre = {$in: req.query.genre}
        }
        try {
            if(req.params.id){
                let artist = await Artist.findById(req.params.id)
                artist ?
                res.status(200).json({
                    data: artist,
                    success: true,
                    message: 'artist found',
                }) :
                res.status(404).json({
                    success: false,
                    message: 'artist not found',
                });
            } else {
                let artists = await Artist.find(query);
                artists.length > 0 ?
                res.status(200).json({
                    data: artists,
                    success: true,
                    message: 'artist found',
                }) :
                res.status(404).json({
                    success: false,
                    message: 'artists not found',
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    update: async(req, res) => {
        let {id} = req.params
        try{
            let artist = await Artist.findOneAndUpdate({_id: id}, req.body, {new:true})
            artist ?
            res.status(200).json({
                data: artist,
                success: true,
                message: 'artist updated successfully'
            }) :
            res.status(404).json({
                success: false,
                message: 'artist not found'
            })
        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },
    destroy: async(req, res) => {
        let {id} = req.params
        try {
            let artist = await Artist.findOneAndDelete({_id: id})
            artist ?
            res.status(200).json({
                data: artist._id,
                success: true,
                message: 'artist deleted successfully',
            }) :
            res.status(404).json({
                success: false,
                message: 'artist not found',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = controller