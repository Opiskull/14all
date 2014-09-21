var mongoose = require('mongoose');
var restify = require('restify');


function load(Model){
    return function(req,res,next) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new restify.ResourceNotFoundError(Model.modelName + " with id " + req.params.id));
        }
        Model.findOne({'_id': new mongoose.Types.ObjectId(req.params.id)}, function (err, item) {
            if (err)
                return next(err);
            if (!item)
                return next(new restify.ResourceNotFoundError(Model.modelName + " with id " + req.params.id));
            req.model = item;
            return next();
        });
    }
}

function get(Model){
    return function (req, res, next) {
        if (req.model) {
            res.json(req.model);
        }
        return next();
    }
}

function create(Model){
    return function(req,res,next) {
        var item = new Model(req.params);
        item.user = req.user._id;
        item.save(function (err) {
                if (err)
                    return next(err);
                res.json(item);
                return next();
            }
        );
    };
}

function del(Model){
    return function (req, res, next) {
        req.model.remove(function (err) {
            if (err)
                return next(err);
            res.send();
            return next();
        });
    }
}

function update(Model){
    return function (req, res, next) {
        require('util')._extend(req.model, req.body);
        req.model.save(function (err, item) {
            if (err)
                return next(err);
            res.json(item);
            return next();
        });
    }
}

function list(Model) {
    return function (req, res, next) {
        Model.find({user: new mongoose.Types.ObjectId(req.user.id)}, function (err, items) {
            if (err)
                return next(err);
            res.json(items);
            return next();
        });
    }
}

module.exports = {
    load: load,
    get: get,
    create: create,
    del: del,
    update: update,
    list: list
};

