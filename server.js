require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
const newRelic = require("newrelic");

// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/loaderio-6981f2e3cf3c0b995343aa1a6351ca50', (req, res) => {
        res.sendFile(__dirname + '/loaderio-6981f2e3cf3c0b995343aa1a6351ca50.txt');
})

app.get('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/${req.params.productId}`)
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then(json => res.send(json));
});

app.post('/api/reviews/:productId', (req, res) => {
  fetch(`http://ec2-18-144-29-61.us-west-1.compute.amazonaws.com/api/reviews/new`, {
    method: 'POST'
  })
    .then((res) => {
      // do nothing
    })
    .then(json => res.status(202).send());
});

// Matt
app.get('/checkout/:productId', (req, res) => {
  fetch(`http://ec2-18-212-122-128.compute-1.amazonaws.com:7777/checkout/${req.params.productId}`)
    .then(res => res.json())
    .then(json => res.send(json));
});

// Sonia

  app.get('/product', (req, res) => { //will be sent to my component 
    // console.log("here", req.query.id) 
      fetch(`http://ec2-52-53-250-252.us-west-1.compute.amazonaws.com:4043/product/?id=${req.query.id}`) //will proxy to my component server 
        .then((res) => {
          return res.json();
        })
        .then(json => res.send(JSON.stringify(json)));
    })

// Michelle
// http://ec2-13-57-32-246.us-west-1.compute.amazonaws.com/?id=2
app.get('/get', (req, res) => {
  fetch(`http://ec2-54-153-66-98.us-west-1.compute.amazonaws.com:9001/get/?id=${req.query.id}`)
    .then(response => {
      return response.json()
    }).then(json => {
      res.send(json)
    })
    .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`AVH proxy server listening on port ${port}...`);
});