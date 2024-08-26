const express = require('express')

const Controller = require('../controllers/questionnaire');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/create', auth, Controller.Create);
router.get('/', Controller.List);
router.get('/:id', Controller.Read);
router.put('/:id', Controller.Update);
router.delete('/:id', Controller.Delete);

module.exports = router;
