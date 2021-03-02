const express = require('express');
const app = express();
const desepesasRoute = express.Router();

// Student model
let Student = require('../models/article');
var table;

// Add Student
desepesasRoute.route('/despesas').post((req, res, next) => {
    Student.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(req.body);
            res.json(data)
        }
    })
});

// Get all student
desepesasRoute.route('/despesas').get((req, res) => {
    Student.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('retorno get id');
            res.json(data)
        }
    })
})

// Get single student
desepesasRoute.route('/despesas/:id').get((req, res) => {
    Student.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('retorno get id');
            res.json(data)
        }
    })
})


// Update student
desepesasRoute.route('/despesas/:id').put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
    })
})

// Delete student
desepesasRoute.route('/despesas/:id').delete((req, res, next) => {
    Student.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = desepesasRoute;