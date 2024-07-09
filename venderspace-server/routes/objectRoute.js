import express from 'express';
import { Object } from '../models/objectModel.js';

const router = express.Router();

// Route for Save a new Object
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.params ||
      !request.body.pid
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, params, pid',
      });
    }
    const newObject = {
      title: request.body.title,
      author: request.body.params,
      publishYear: request.body.pid,
    };

    const object = await Object.create(newObject);

    return response.status(201).send(object);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Object from database
router.get('/', async (request, response) => {
  try {
    const object = await Object.find({});

    return response.status(200).json({
      count: object.length,
      data: object,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Object from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const object = await Object.findById(id);

    return response.status(200).json(object);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an Object
router.put('/:id', async (request, response) => {
  try {
    if (
        !request.body.title ||
        !request.body.params ||
        !request.body.pid
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, params, pid',
      });
    }

    const { id } = request.params;

    const result = await Object.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Object not found' });
    }

    return response.status(200).send({ message: 'Object updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an Object
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Object.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Object not found' });
    }

    return response.status(200).send({ message: 'Object deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
