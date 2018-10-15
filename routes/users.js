var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");

const jsonParser = bodyParser.json();

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({}, (err, users) => {
      if (err) {
          res.send(err);
      }
      res.json(users);
  })
});

router.get('/find', function(req, res, next) {
    userModel.find({"_id": 3}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    })
});

router.post('/update', function(req, res, next) {
    userModel.update({"_id": 3}, {$unset: {scopes: true}}, {}, () => {
        res.json("done");
    })
});

router.post('/insert', function(req, res, next) {
    const newDoc = {"name": "User3", "_id": 3, "scopes": ["x", "y"]};
    userModel.insert(newDoc,  (err, inserted) => {
        if (err) {
            res.send(err);
        }
        res.json(inserted);
    })
});


router.post('/remove', function(req, res, next) {
    userModel.remove({"_id": 3},  (err, removed) => {
        if (err) {
            res.send(err);
        }
        res.json(removed);
    })
});


const fetchPosts = async (req, res, next) => {
    const postCount = 10;
    req.data = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(
            json =>
                json.length && json.length > 0
                    ? json.splice(0, postCount)
                    : json.splice(0, 1)
        );
    next();
};

router.post('/updateField', fetchPosts, ({ data }, res) => {
    res.json(data);
    // res.render("post", { data });
});

module.exports = router;
