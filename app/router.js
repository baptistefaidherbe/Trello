const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');
const cardLabelController = require('./controllers/cardLabelController');

const router = express.Router();


router.get('/lists', listController.lists);
router.get('/lists/:id', listController.list);

router.get('/cards', cardController.cards);
router.get('/cards/:id', cardController.card);

router.get('/tags', tagController.labels);
router.get('/tags/:id', tagController.label);


router.post('/lists', listController.addList);
router.post('/cards', cardController.addCard);
router.post('/tags', tagController.addLabel);


router.patch('/lists', listController.updateLists);
router.patch('/lists/:id', listController.updateList);

router.patch('/cards', cardController.updateCards);
router.patch('/cards/:id', cardController.updateCard);


router.patch('/tags', tagController.updateLabels);
router.patch('/tags/:id', tagController.updateLabel);

router.delete('/lists', listController.deleteLists);
router.delete('/lists/:id', listController.deleteList);

router.delete('/cards', cardController.deleteCards);
router.delete('/cards/:id', cardController.deleteCard);

router.delete('/tags', tagController.deleteLabels);
router.delete('/tags/:id', tagController.deleteLabel);


router.post('/card/:card_id/label/:label_id', cardLabelController.asscocier);
router.delete('/card/:card_id/label/:label_id', cardLabelController.dissocier);

router.get('/lists/:id/cards', cardController.cardByList);

module.exports = router;