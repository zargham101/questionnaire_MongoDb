const express = require('express')
const auth = require('../middleware/auth');
const Controller = require('../controllers/response');

const router = express.Router();

router.post('/create', auth, Controller.Create);
router.get('/user/:id', Controller.ListByUser);
router.get('/questions/:id', Controller.ListByQuestinonaire);

module.exports = router;