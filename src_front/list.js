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