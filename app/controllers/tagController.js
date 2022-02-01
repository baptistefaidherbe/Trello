const {
    Label,

} = require('../models');



const tagController = {


    labels: async (request, response) => {

        try {

            const labelAll = await Label.findAll();

            response.json({
                labelAll
            })

        } catch (error) {
            console.error(error);
        }

    },

    label: async (request, response) => {

        try {

            const label = await Label.findByPk(request.params.id);

            response.json({
                label
            })

        } catch (error) {
            console.error(error);
        }

    },

    addLabel: async (request, response) => {
        try {

            const label = request.body.name

            const result = await Label.create({
                name: label
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    updateLabel: async (request, response) => {
        try {

            const result = await Label.update({
                name: request.body.name,
                color: request.body.color,


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

    updateLabels: async (request, response) => {
        try {

            const result = await Label.update({
                name: request.body.name,
                color: request.body.color
            }, {
                where: {
                    id:{ [Op.in] : sequelize.literal('(select id from label)')
                }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteLabel: async (request, response) => {
        try {

            const result = await Label.destroy({
                where: {
                    id: request.params.id
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteLabels: async (request, response) => {
        try {

            const result = await Label.destroy({
                where: {
                    id:{ [Op.in] : sequelize.literal('(select id from label)')
                }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

}

module.exports = tagController;