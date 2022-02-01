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