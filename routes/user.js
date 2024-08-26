const express = require('express')

const Controller = require('../controllers/user');

const router = express.Router();

router.post('/create', Controller.Create);
router.get('/:id', Controller.Read);
router.delete('/:id', Controller.Delete);
router.patch('/:id', Controller.Update);
router.get('/', Controller.List);

module.exports = router;
