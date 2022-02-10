import { Router } from 'express';
import { User, validate } from '../models/User';
import Event from '../models/Event';
import Token from '../models/Token';
import mongoose  from 'mongoose';
import sendEmail from '../utils/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const router = Router();

router.get('/status', (req, res) => res.send('OK'));

router.post("/users/login", async (req, res) => {
    try {

      const userPwd = req.body.password;
        const user = await User.findOne({
            email: req.body.email,
        });
        
        if(!user) {
          res.send({error: true, message:'User not found!'});
        }

        const match = await bcrypt.compare(userPwd, user.password);
        
        if(match) {
          if(user.verified) {
          res.send(user);
          }
          else {
            res.send({error: true, message: 'Please verify your account!'});
          }
        } else {
          res.send({error: true, message:'User not found!'});
        }


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
            { is_organizer: req.body.is_organizer },
            { new: true}
        );
        res.send(user);
    } catch (error) {
        res.send(error);
    }
  });

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id);
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

router.post("/signup", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.send({error:true, message:'User already exist.'});
  
      user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        is_organizer: false,
        verified: false
      }).save();
  
      let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
      const message = `${process.env.BASE_URL}user/verify/${user.id}/${token.token}`;
      const emailResult = await sendEmail(user.email, user.name, message);
  
      if (emailResult) {
        res.send({success: true, message: 'Verification email has been sent. Please verify your account'});
      } else {
        res.send({error: true, message: 'Account does not verify'});
      }
    } catch (error) {
      res.send({error: true, message: 'Error occured'});
    }
  });
  
router.get("/user/verify/:id/:token", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.send({error:true, message:"Invalid link"});
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.send({error: true, message:"Invalid link"});
  
      await User.updateOne({_id: user._id }, { verified: true });
      await Token.findByIdAndRemove(token._id);
  
      res.redirect('https://deuevent.netlify.app/');
    } catch (error) {
      res.status(400).send(error);
    }
  });


router.post('/events', async (req, res) => {
    try {
        const body = {
            ...req.body,
            organizer: mongoose.Types.ObjectId(req.body.organizer)
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

router.post("/events/featured", async (req, res) => {
  try {
      const event = await Event.findOneAndUpdate(
          { _id: req.body.id },
          { is_featured: req.body.is_featured },
          { new: true}
      );
      res.send(event);
  } catch (error) {
      res.send(error);
  }
});

router.delete("/events/:id", async (req, res) => {
  try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.send(event);
  } catch (error) {
      res.send(error);
  }
});

router.post("/events/:event_id/join/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    const event = await Event.findById(req.params.event_id)

    event.attendees.push(user._id);

    await Event.findByIdAndUpdate(req.params.event_id, event);

    res.send(event);
  } catch(error) {
    res.send(error)
  }
});

module.exports = router;