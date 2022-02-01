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