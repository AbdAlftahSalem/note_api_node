const {ApiError} = require("../utils/error_handeler");

class CrudOperations {

    static async getAllData(req, res, next, model) {


        const page = req.query["page"] * 1 || 1
        const limit = req.query.limit * 1 || 5
        const skip = (page - 1) * limit
        let docCount = 0
        let numberOfPages = 0
        model.countDocuments().then(count => {
            docCount = count
            numberOfPages = docCount / limit
            numberOfPages = (numberOfPages | 0) + 1
        })

        const data = await model.find({}).select('-__v').sort("-createdAt").skip(skip).limit(limit);
        return {
            "data": data, "statusCode": 200, "message": "successfully request"
        }


    }

    static async getOneElement(req, res, next, model) {

        const id = req.params.id


        const data = await model.findById(id).select('-__v')
        if (!data) {
            return {"data": [], "statusCode": 200, "message": "no item found"}
        }
        return {
            "data": data, "statusCode": 200, "message": "successfully request"
        }
    }

    static async addElement(req, res, next, model) {

        const data = await model.create(req.body);
        if (!data) {
            return {"statusCode": 400, "message": "Some this error , try again"}
        } else {
            return {
                "data": data, "statusCode": 200, "message": "successfully request"
            }
        }

    }

    static async deleteElement(req, res, next, model) {
        const {id} = req.params

        return await model.deleteOne({_id: id}).then((v) => {
            if (v == null) {
                res.status(200).json({"res": `not found item with id ${id}`})
            } else {
                res.status(200).json({"status": true, "message": `deleted item with id ${id}`})
            }
        }).catch((e) => next(new ApiError(e, 404)))

    }

    static async deleteAllElement(req, res, next, model) {

        return await model.deleteMany({}).then((v) => {
            if (v == null) {
                res.status(200).json({"res": `empty`})
            } else {
                res.status(200).json({"status": true, "message": `deleted items successfully`})
            }
        }).catch((e) => next(new ApiError(e, 404)))


    }

    static async updateOneElement(req, res, next, model) {
        const {id} = req.params.id

        return await model.updateOne(id, req.body, {returnOriginal: false}).then((v) => {
            res.status(200).json({"status": true, "itemUpdatedId": id, "data": v})
        }).catch((e) => next(new ApiError(e, 400)))

    }

}


module.exports = CrudOperations;