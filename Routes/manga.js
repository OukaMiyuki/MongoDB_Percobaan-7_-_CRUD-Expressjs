const Joi = require('joi'); //capitalize the first letter of the variable name means it is a class (Joi)
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Manga = mongoose.model('Manga',  new mongoose.Schema({
        name:{
            type: String,
            required: true,
            minlength: 5,
            maxlength: 100
        }
    })
);

function validateInput(masukan){ //a function to validate the input
    const skema = Joi.object({ //validation schema
        name: Joi.string().min(3).required()
     });
    return skema.validate(masukan);
}

router.get('/', async (request, response) => { //to fetch all data
    const manga = await Manga.find().sort('name');
    response.send(manga);
});

router.post('/', async (request, response) => { //insert data
    const { error } = validateInput(request.body); //using object destructing
    if(error) return response.status(400).send(error.details[0].message);

    let postingManga = new Manga({
        name: request.body.name
    });

    postingManga = await postingManga.save();
    const manga = await Manga.find().sort('name');
    console.log(manga);
    response.send(postingManga);
});

router.put('/:id', async (request, response) => { //edit data
    const { error } = validateInput(request.body); 
    if (error) return response.status(400).send(error.details[0].message);//inpout validation based on validateInput function

    const searchUpdateManga = await Manga.findByIdAndUpdate(request.params.id, {
        name: request.body.name
    }, { new: true });

    if (!searchUpdateManga) return response.status(404).send('Manga not found');
    
    response.send(searchUpdateManga); //show all data
  });

  router.delete('/:id', async (request, response) => { //delete data
    const searchDeleteManga = await Manga.findByIdAndRemove(request.params.id);

    if (!searchDeleteManga) return response.status(404).send('Manga not found');

    response.send(searchDeleteManga);
  });

router.get('/:id', async (request, response) => { //get particular data based on id parameter
    const searchManga = await Manga.findById(request.params.id);

    if (!searchManga) return response.status(404).send('Manga not found');
    response.send(searchManga);
});

module.exports = router;