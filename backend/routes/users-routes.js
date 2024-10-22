const express = require('express');
const bodyParser = require('body-parser');

const app = express();




router.get('/:pid', (req, res, next) => {
    const placeId = req.params. pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === place.Id;
    })
    res.json({place});
});