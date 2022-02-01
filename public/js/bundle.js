(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./card":2,"./list":3,"./utils":4}],2:[function(require,module,exports){
const utils = require('./utils');
const modulCard = {

    getCardsFromAPI: async (id) => {
        const myInit = {
            method: 'GET',
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/lists/' + id + '/cards', myInit);
            const data = await response.json();
            // console.log(data.card)
            for (const card of data.card) {
                modulCard.makeCardInDOM(card.text, card.list_id, card.color, card.id, )
            }
        } catch (error) {
            console.error(error);
        }
    },



    handleTitleCardForm: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('card_id');
        const name = formData.get('text');
        console.log(id);
        const myInit = {
            method: 'PATCH',
            body: formData,
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/cards/' + id, myInit);
            const event = e.target.closest('.box');
            const targetCardId = event.getAttribute('data-card-id');
            document.querySelector(`[data-card-id="${targetCardId}"] #formCard`).classList.add('is-hidden');
            document.querySelector(`[data-card-id="${targetCardId}"] #formCard`).classList.remove('is-active');
            document.querySelector(`[data-card-id="${targetCardId}"] .contentCard`).classList.remove('is-hidden');
            document.querySelector(`[data-card-id="${targetCardId}"] .contentCard`).classList.add('is-active');
            document.querySelector(`[data-card-id="${targetCardId}"] .contentCard`).textContent = name;

            if (response.status == 200) {
                console.log(response)
            } else {
                throw `error with status ${response.status}`
            }
        } catch (error) {
            console.error(error);
        }

    },

    editCard: (e) => {

        const event = e.target.closest('.box');
        const targetCardId = event.getAttribute('data-card-id');
        console.log(targetCardId)
        document.querySelector(`[data-card-id="${targetCardId}"] .contentCard`).classList.add('is-hidden');
        document.querySelector(`[data-card-id="${targetCardId}"] #formCard`).classList.remove('is-hidden');
        document.querySelector(`[data-card-id="${targetCardId}"] #formCard`).classList.add('is-active');
        const formCards = document.querySelectorAll('#formCard')

        for (formCard of formCards) {
            const cardId = formCard.querySelector('input[name="card_id"]').value = targetCardId;
            document.querySelector(`[data-card-id="${cardId}"] #formCard`).addEventListener('submit', modulCard.handleTitleCardForm);
        }
    },

    deleteCard: async (e) => {

        const event = e.target.closest('.box');
        const id = event.getAttribute('data-card-id');

        const myInit = {
            method: 'DELETE',
            body: id,
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/cards/' + id, myInit);


            if (response.status == 200) {
                console.log(response)
            } else {
                throw `error with status ${response.status}`
            }
        } catch (error) {
            console.error(error);
        }
        event.remove();
        // location.reload();

    },



    showAddCardModal: (e) => {
        const addModalCard = document.getElementById('addModalCard');
        document.getElementById('value_card_modal').value = '';
        addModalCard.classList.add('is-active');
        const event = e.target.closest('.panel');
        const targetListId = event.getAttribute('data-list-id');
        document.querySelector('#addCardForm input[name="list_id"]').value = targetListId;
        const addCardForm = document.getElementById('addCardForm')
        addCardForm.addEventListener('submit', modulCard.handleAddCardForm);

    },

    handleAddCardForm: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const myInit = {
            method: 'POST',
            body: formData
        };
        try {
            const response = await fetch(utils.base_url + '/cards', myInit);
            const data = await response.json();
            modulCard.makeCardInDOM(formData.get('text'), formData.get('list_id'), formData.get('color'), data.id)
            if (response.status == 200) {
                console.log(response);
            } else {
                throw `error with status ${response.status}`;
            }
        } catch (error) {
            console.error(error);
        }


        utils.hideModals();
    },




    makeCardInDOM: (data, list_id, color, id) => {
        const content = document.querySelector('#templateCard').content;
        const cloneCard = document.importNode(content, true);
        cloneCard.querySelector('.contentCard').textContent = data;
        const targetListId = list_id;
        const list = document.querySelector(`[data-list-id="${targetListId}"]  .panel-block`);
               
      
        const card = cloneCard.querySelector('.box')
        card.dataset.cardId = id;
        card.style.backgroundColor = color;
        list.appendChild(cloneCard);



        Sortable.create(list, {
            group: 'list',
            animation: 100,
            onChange: () => {
                const myCard = document.querySelector(`[draggable="false"]`);
                const idCard = myCard.closest('.box').getAttribute('data-card-id')
                const mytargetListId = myCard.closest(`[data-list-id="${targetListId}"]`)
                const positionList = mytargetListId.getAttribute('data-list-id');


                modulCard.UpdatePositionCardList(idCard, positionList)
            }
        });



        const edits = document.querySelectorAll('.edit');

        for (edit of edits) {
            edit.addEventListener('click', modulCard.editCard);
        }

        const deleteCards = document.querySelectorAll('.deleteCard');

        for (deleteCard of deleteCards) {
            deleteCard.addEventListener('click', modulCard.deleteCard);
        }


    },

    UpdatePositionCardList: async (idCard, positionList) => {

        const positionListInt = parseInt(positionList, 10);


        const formData = new FormData();
        formData.append('list_id', positionListInt);

        const myInit = {
            method: 'PATCH',
            body: formData
        };
        console.log(formData.get('list_id'))
        try {
            const response = await fetch(utils.base_url + '/cards/' + idCard, myInit);
            const data = await response.json();
            console.log(data)
            // modulCard.makeCardInDOM(formData.get('text'), formData.get('list_id'), formData.get('color'), data.id)
            if (response.status == 200) {
                console.log(response);
            } else {
                throw `error with status ${response.status}`;
            }
        } catch (error) {
            console.error(error);
        }


    }


}

module.exports = modulCard;
},{"./utils":4}],3:[function(require,module,exports){
const utils = require('./utils');
const modulCard = require('./card');

const modulList = {

    handleTitleListForm: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = formData.get('list_id');
        const name = formData.get('name');
        console.log(id);
        const myInit = {
            method: 'PATCH',
            body: formData,
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/lists/' + id, myInit);
            const event = e.target.closest('.panel');
            const targetListId = event.getAttribute('data-list-id');

            document.querySelector(`[data-list-id="${targetListId}"] h2`).classList.remove('is-hidden');
            document.querySelector(`[data-list-id="${targetListId}"] h2`).classList.add('is-active');
            document.querySelector(`[data-list-id="${targetListId}"] #formList`).classList.add('is-hidden');
            document.querySelector(`[data-list-id="${targetListId}"] #formList`).classList.remove('is-active');
            document.querySelector(`[data-list-id="${targetListId}"] h2`).textContent = name
            if (response.status == 200) {
                console.log(response)
            } else {
                throw `error with status ${response.status}`
            }
        } catch (error) {
            console.error(error);
        }

    },

    editList: (e) => {

        const event = e.target.closest('.panel');
        const targetListId = event.getAttribute('data-list-id');
        console.log(targetListId)
        document.querySelector(`[data-list-id="${targetListId}"] h2`).classList.add('is-hidden');
        document.querySelector(`[data-list-id="${targetListId}"] #formList`).classList.remove('is-hidden');
        document.querySelector(`[data-list-id="${targetListId}"] #formList`).classList.add('is-active');
        const formLists = document.querySelectorAll('#formList')

        for (formList of formLists) {
            const listId = formList.querySelector('input[name="list_id"]').value = targetListId;
            document.querySelector(`[data-list-id="${listId}"] #formList`).addEventListener('submit', modulList.handleTitleListForm);
        }
    },


    getListsFromAPI: async () => {
        const myInit = {
            method: 'GET',
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/lists', myInit);
            const data = await response.json();

            for (const list of data.listAll) {

                modulList.makeListInDOM(list.name, list.id)
                modulCard.getCardsFromAPI(list.id)

            }
        } catch (error) {
            console.error(error);
        }

    },


    makeListInDOM: (result, id) => {
        const template = document.querySelector('#templateList');
        const cloneList = document.importNode(template.content, true);
        cloneList.querySelector('h2').textContent = result;
        const list = cloneList.querySelector('.is-one-quarter');
        list.dataset.listId = id
        const btnAddList = document.querySelector('#btnAddList');
        btnAddList.before(cloneList);

        utils.hideModals();
        const addCards = document.querySelectorAll('.addCard')

        for (addCard of addCards) {
            addCard.addEventListener('click', modulCard.showAddCardModal);
        }

        const edits = document.querySelectorAll('h2')

        for (edit of edits) {
            edit.addEventListener('dblclick', modulList.editList);
        }
        const test = document.querySelector('[data-list-id]').value = id

        const deleteLists = document.querySelectorAll('.deleteList');

        for (deleteList of deleteLists) {
            deleteList.addEventListener('click', modulList.deleteList);
        }

       

    },


    deleteList: async (e) => {

        const event = e.target.closest('.panel');
        const id = event.getAttribute('data-list-id');

        const myInit = {
            method: 'DELETE',
            body: id,
            mode: 'cors',
        };
        try {
            const response = await fetch(utils.base_url + '/lists/' + id, myInit);


            if (response.status == 200) {
                console.log(response)
            } else {
                throw `error with status ${response.status}`
            }
        } catch (error) {
            console.error(error);
        }

        event.remove();

    },



    handleAddListForm: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const myInit = {
            method: 'POST',
            body: formData
        };
        try {
            const response = await fetch(utils.base_url + '/lists', myInit);
            const data = await response.json();
            modulList.makeListInDOM(formData.get('name'), data.id);
           
        } catch (error) {
            console.error(error);
        }




        utils.hideModals();
    },

    showAddListModal: () => {
        const addListModal = document.getElementById('addListModal');
        addListModal.classList.add('is-active');
    }


}


module.exports = modulList;
},{"./card":2,"./utils":4}],4:[function(require,module,exports){
const utils ={

    base_url: 'http://54.82.215.243:3000',

    hideModals: () => {
        const addListModal = document.getElementById('addListModal');
        const addModalCard = document.getElementById('addModalCard');
        addListModal.classList.remove('is-active');
        addModalCard.classList.remove('is-active');
      },
    
}

module.exports = utils;
},{}]},{},[1]);
