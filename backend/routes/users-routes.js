const express = require('express');


const router = express.Router();
const usersController = require('../controllers/users-controller');

router.get('/', usersController.getUsers);

router.post('/signup', usersController.signup)

router.post('/login', usersController.login );


module.exports = router;





// router.get('/:pid', (req, res, next) => {
//     const placeId = req.params. pid;
//     const place = DUMMY_PLACES.find(p => {
//         return p.id === place.Id;
//     })
//     res.json({place});
// });