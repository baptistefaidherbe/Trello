const {
    Card,Label

} = require('../models');

const Cardlabel = require('../models/cardHasLabel');




const cardLabelController = {

    asscocier: async (request, response) => {
        try {


            const result = await Card.addLabel(Label,{
                card_id: request.body.card_id,
                label_id: request.body.label_id

               
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

     dissocier: async (request, response) => {
        try {


            const result = await Cardlabel.destroy({
                where: {
                    card_id: request.params.card_id,
                    label_id: request.params.label_id
                }
            }, {
                include: 'labels'
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

}

module.exports = cardLabelController;