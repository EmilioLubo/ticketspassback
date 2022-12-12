const Ticket = require('../models/Ticket');

const controller = {

    create: async (req, res) => {
        try {
            let new_ticket = await Ticket.create(req.body);
            res.status(201).json({
                id: new_ticket._id,
                success: true,
                message: 'Ticket created successfully',
                new_ticket,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    readOne: async (req, res) => {
        let { id } = req.params;

        try {

            let ticket = await Ticket.findById(id)
                .populate('userId')
                .populate('eventId')

            if (ticket) {
                res.status(200).json({
                    success: true,
                    message: 'Ticket found',
                    data: ticket,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Ticket not found',
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    read: async (req, res) => {

        let query = {};
        if (req.query.concertId) {
            query = {
                concertId: req.query.concertId
            };
        }

        try {
            let allTickets = await Ticket.find(query)
                .populate('userId')
                .populate('eventId')

            if (allTickets.lenght > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Tickets found',
                    data: allTickets,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No tickets found',
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

    update: async (req, res) => {
        let { id } = req.params;

        try {
            let ticket = await Ticket.findByIdAndUpdate({ _id: id }, { redeemed : true }, { new: true })
            res.status(200).json({
                success: true,
                message: 'Ticket updated successfully',
                data: ticket,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    },

}

module.exports = controller;
