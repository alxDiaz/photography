var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Meeting = require('../model/meeting');
const upload = require('../config/multer');
const passport = require('../config/passport');

/* GET meeting listing. */
router.get('/', (req, res, next) => {
  Meeting.find({})
    .exec((err, Meetings) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Meetings);
    });
});

/* GET a single Meeting. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  
  Meeting.findById(req.params.id, (err, Meetings) => {
      if (err) {
        return res.send(err);
      }

      return res.json(Meetings);
    });
});

/* EDIT a Meeting. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  //Modify for pic not updated and fix the locations params
  Meeting.findByIdAndUpdate(req.params.id, {
    date: req.body.date,
    description: req.body.description,
    picture: req.body.picture,
    neighborhood: req.body.neighborhood,
    location: req.body.location
  }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Meeting updated successfully'
    });
  });
})

/* DELETE a Meeting. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  
  Meeting.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Meeting has been deleted!'
    });
  })
});

// picture: `/uploads/${req.file.filename}`,
router.post('/:id',upload.single('file'), function(req, res) {
  const meeting = new Meeting({
    owner: req.body.userId,
    date: req.body.date,
    description: req.body.description,
    picture: "Nopicture",
    neighborhood: req.body.neighborhood,
    status: true,
    location: req.body.location,
    party: []
  });

  meeting.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Meeting created!',
      meeting: meeting
    });
  });
});

module.exports = router;