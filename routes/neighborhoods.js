var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Neighborhood = require('../model/neighborhood');
const passport = require('../config/passport');

/* GET Neighborhoods listing. */
router.get('/', (req, res, next) => {
  Neighborhood.find({})
    .exec((err, Neighborhoods) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Neighborhoods);
    });
});

/* GET a single Neighborhood. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  
  Neighborhood.findById(req.params.id, (err, Neighborhoods) => {
      if (err) {
        return res.send(err);
      }

      return res.json(Neighborhoods);
    });
});

/* EDIT a Neighborhood. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Neighborhood.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Neighborhood updated successfully'
    });
  });
})

/* DELETE a Neighborhood. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  
  Neighborhood.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Neighborhood has been removed!'
    });
  })
});

router.post('/', function(req, res) {
  const neighborhood = new Neighborhood({
    name: req.body.name,
  });

  neighborhood.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Neighborhood created!',
      neighborhood: neighborhood
    });
  });
});

module.exports = router;