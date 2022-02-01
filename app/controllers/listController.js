const {
    List,
    Card

} = require('../models');

const sequelize = require('../database');

const {
    Op
} = require("sequelize");
const listController = {


    lists: async (request, response) => {

        try {

            const listAll = await List.findAll({

                order: [
                    ['position', 'DESC'],
                    
                ],
            });

            response.json({
                listAll
            })

        } catch (error) {
            console.error(error);
        }

    },

    list: async (request, response) => {

        try {

            const list = await List.findByPk(request.params.id);

            response.json({
                list
            })

        } catch (error) {
            console.error(error);
        }

    },

    addList: async (request, response) => {
        try {


            const list = request.body.name

            const result = await List.create({
                name: list
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    updateList: async (request, response) => {

        response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,PATCH");
        try {



            const result = await List.update({
                name: request.body.name,
                position: request.body.position
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


    updateLists: async (request, response) => {
        try {

            const result = await List.update({
                name: request.body.name,
                position: request.body.position
            }, {
                where: {
                    id: {
                        [Op.in]: sequelize.literal('(select id from list)')
                    }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteList: async (request, response) => {
        try {



            const result = await List.destroy({
                where: {
                    id: request.params.id
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },

    deleteLists: async (request, response) => {
        try {

            const result = await List.destroy({
                where: {
                    id: {
                        [Op.in]: sequelize.literal('(select id from list)')
                    }
                }
            });

            response.json(result);

        } catch (error) {
            console.error(error);
        }

    },


}

module.exports = listController;