const utils = require('./utils');
const modulList = require('./list');
const modulCard = require('./card');
// const Sortable = require('sortablejs');


var app = {


  init: function () {
    console.log('app.init !');
    app.addListenerToActions();
  },


  addListenerToActions: () => {
    const addListButton = document.getElementById('addListButton');
    addListButton.addEventListener('click', modulList.showAddListModal);
    const closeBtns = document.querySelectorAll('.close');

    for (closeBtn of closeBtns) {
      closeBtn.addEventListener('click', utils.hideModals);
    }
    modulList.getListsFromAPI();
    document.querySelector('#addListModal > .modal-card > form').addEventListener('submit', modulList.handleAddListForm);

    const addCards = document.querySelectorAll('.addCard')

    for (addCard of addCards) {
      addCard.addEventListener('click', modulCard.showAddCardModal);
    }
   
  },
 
};

// on accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);