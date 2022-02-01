const {
    Card,

} = require('../models');



const cardController = {


    cards: async (request, response) => {

        try {

            const cardAll = await Card.findAll();

            response.json({
                cardAll
            })

        } catch (error) {
            console.error(error);
        }

    },

    card: async (request, response) => {

        try {

            const card = await Card.findByPk(request.params.id);

            response.json({
                card
            })

        } catch (error) {
            console.error(error);
        }

    },

    cardByList: async (request, response) => {

        try {

            const card = await Card.findAll({
                where: {
                    list_id: request.params.id
                }
            });

            response.json({
                card
            })

        } catch (error) {
            console.error(error);
        }

    },

    addCard: async (request, response) => {
        try {

            const text = request.body.text
            const list_id = request.body.list_id
            const color = request.body.color

            const result = await Card.create({
                text: text,
                list_id: list_id,
                color: color
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    updateCard: async (request, response) => {
        console.log(request.body.list_id)
        try {

            const result = await Card.update({
                text: request.body.text,
                position: request.body.position,
                color: request.body.color,
                list_id: request.body.list_id

            }, {
                where: {
                    id: request.params.id
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },


    updateCards: async (request, response) => {
        try {

            const result = await Card.update({
                text: request.body.text,
                position: request.body.position
            }, {
                where: {
                    id: {
                        [Op.in]: sequelize.literal('(select id from card)')
                    }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteCard: async (request, response) => {
        try {



            const result = await Card.destroy({
                where: {
                    id: request.params.id
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteCards: async (request, response) => {
        try {
            const result = await Card.destroy({
                where: {
                    id: {
                        [Op.in]: sequelize.literal('(select id from card)')
                    }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

}

module.exports = cardController;