const Artist = require('../models/Artist')

const controller = {
    create: async(req, res) => {
        try {
            let newArtist = await Artist.create(req.body);
            res.status(201).json({
                id: newArtist._id,
                success: true,
                message: 'Artist created successfully',
                newArtist,
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
        if(req.params.id){
            query._id = req.params.id
        }
        try {
            let artists = await Artist.find(query);
            artists.length > 0 ?
            res.status(200).json({
                artists,
                success: true,
                message: 'artist found',
            }) :
            res.status(404).json({
                success: false,
                message: 'artist/s not found',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },
    update: async(req, res) => {
       
    },
    destroy: async(req, res) => {
        
    }
}

module.exports = controller