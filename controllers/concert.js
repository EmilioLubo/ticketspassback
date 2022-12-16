const Concert = require("../models/Concert");

const controller = {
  create: async (req, res) => {
    let { user, body } = req;
    body.userId = user.id;
    try {
      let newConcert = await Concert.create(body);
      res.status(201).json({
        id: newConcert._id,
        success: true,
        message: "The concert was created successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    let query = {};
    let limit = 0;
    if (req.query.artistId) {
      query.artists = req.query.artistId;
    }

    if (req.query.concertId) {
      query.concertId = req.query.concertId;
    }

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.lte) {
      query["category.price"] = { $lte: req.query.lte };
    }

    if(req.query.type) {
      query.type = req.query.type;
    }

    try {
      allConcerts = await Concert.find(query, "-userId").sort("date").limit(limit).populate("venue", "-_id name");
      if (allConcerts.length) {
        res.status(200).json({
          response: allConcerts,
          success: true,
          message: "The request of concerts was a success",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Couldn't find concerts",
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
      let concert = await Concert.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (concert) {
        res.status(200).json({
          id: concert._id,
          success: true,
          message: "The concert was modified successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "error.message",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  destroy: async (req, res) => {
    let { id } = req.params;
    try {
      let concert = await Concert.findOneAndDelete({ _id: id });
      if (concert) {
        res.status(200).json({
          id: concert._id,
          success: true,
          message: "The concert was deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Couldn't find the concert to delete",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  show: async (req, res) => {
    let { id } = req.params;
    try {
      let concert = await Concert.findById(id).populate("artists").populate("venue");
      if (concert) {
        res.status(200).json({
          response: concert,
          success: true,
          message: "Concert found",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Couldn't find the concert to show",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
