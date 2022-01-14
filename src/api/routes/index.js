import { Router } from 'express';
import User from '../models/User';
import Event from '../models/Event';
import mongoose  from 'mongoose';

const router = Router();

router.get('/status', (req, res) => res.send('OK'));

router.post("/users", async (req, res) => {
  try {
      const user = await new User(req.body).save();
      res.send(user);
  } catch (error) {
      res.send(error);
  }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

router.get("/users", async (req, res) => {
  try {
      const users = await User.find();
      res.send(users);
  } catch (error) {
      res.send(error);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body
      );
      res.send(user);
  } catch (error) {
      res.send(error);
  }
});

router.post("/users/validation", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.body.email },
            { validation: req.body.validation },
            { new: true}
        );
        res.send(user);
    } catch (error) {
        res.send(error);
    }
  });

router.delete("/users/:id", async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.send(user);
  } catch (error) {
      res.send(error);
  }
});

router.post('/events', async (req, res) => {
    try {
        const body = {
            ...req.body,
            organization: mongoose.Types.ObjectId(req.body.organization)
        };

        console.log(body);
        const event = await new Event(body).save();
        res.send(event);
    } catch (error) {
        res.send(error);
    }
})

router.get("/events", (req, res) => {
  Event.find()
      .then(events => res.json(events))
      .catch(err => console.log(err))
});

router.delete("/events/:id", async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        res.send(event);
    } catch (error) {
        res.send(error);
    }
});


module.exports = router;