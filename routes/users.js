const express = require('express');
const router = express.Router();
const usersModel = require('../models/users');

//Get
router.get('/users', async (req, res) => {
  try {
    const users = await usersModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// New User
router.post('/users/new', async (req, res) => {
  const user = new usersModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age
  });

  try {
    const newUser = await user.save();
    res.status(200).send({
      message: 'Utente salvato con successo',
      payload: newUser
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Update User
router.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const userExist = await usersModel.findById(id);

  if (!userExist) {
    return res.status(404).send({
      message: 'Utente inesistente'
    });
  }

  try {
    const userId = id;
    const dataUpdated = req.body;
    const options = { new: true };
    const result = await usersModel.findByIdAndUpdate(userId, dataUpdated, options);
    res.status(200).send({
      message: 'Utente aggiornato con successo',
      payload: result
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

// Delete User
router.delete('/users/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        message: 'Attenzione, nessun utente con questo id'
      });
    }

    res.status(200).send({
      message: `Utente con id ${id} cancellato correttamente dal database`
    });
  } catch (error) {
    res.status(500).send({
      message: 'Errore interno del server'
    });
  }
});

module.exports = router;