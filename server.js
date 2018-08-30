const _ = require('lodash');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const nodemailer = require('nodemailer');
const moment = require('moment');

const {mongoose} = require('./server/db/mongoose');
const {authenticate} = require('./server/middleware/authenticate');
const {User} = require('./server/models/user');
const {Guests} = require('./server/models/guests');
const {DateOfWedding} = require('./server/models/date_of_wedding');
const {WeddingVenue} = require('./server/models/wedding_venue');
const {WeddingPartyVenue} = require('./server/models/wedding_party_venue');
const {Expenses} = require('./server/models/expenses');
const {Actions} = require('./server/models/actions');
const defaultExpenses = require('./server/default_documents/default_expenses');
const defaultActions = require('./server/default_documents/default_actions');


const app = express();
const port = process.env.PORT || 3004;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(cookieParser());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/main',(req, res) => {
    if (req.cookies.auth !== undefined) {
      res.sendFile('index.html', { root: __dirname });
    }else {
        res.redirect(`https://${req.header('host')}`);
    }
});

app.get('/lista',(req, res) => {
    if (req.cookies.auth !== undefined) {
      res.sendFile('index.html', { root: __dirname });
    }else {
      res.redirect(`https://${req.header('host')}`);
    }
});

app.get('/rozmieszczenie',(req, res) => {
    if (req.cookies.auth !== undefined) {
      res.sendFile('index.html', { root: __dirname });
    }else {
      res.redirect(`https://${req.header('host')}`);
    }
});

app.get('/bud%C5%BCet',(req, res) => {
    if (req.cookies.auth !== undefined) {
      res.sendFile('index.html', { root: __dirname });
    }else {
      res.redirect(`https://${req.header('host')}`);
    }
});

app.get('/kalendarz',(req, res) => {
    if (req.cookies.auth !== undefined) {
      res.sendFile('index.html', { root: __dirname });
    }else {
      res.redirect(`https://${req.header('host')}`);
    }
});

app.get('/logout', (req, res) => {
    res.redirect(`https://${req.header('host')}`);
});

app.get('/get_date_of_wedding', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  DateOfWedding.find({
    _creator: req.user._id
  }).then((date) => {
    if (date.length === 0) {
      let timeUtc = moment.utc().format('YYYY-MM-DD HH');
      let localTime  = moment.utc(timeUtc).toDate();
      localTime = moment(localTime).format('YYYY-MM-DD HH:[00]');
      req.body.date = localTime;
      let date = new DateOfWedding(req.body);
      date.save().then(() => {
          res.send('dataNotSet');
      })
    } else {
      let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      res.send({date,now});
    }
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/update_date_of_wedding', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  DateOfWedding.findOneAndUpdate({_creator:req.body._creator}, {$set:req.body}, {new:true}).then((date) => {
  if (!date) {
    return res.status(404).send;
  }
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    res.send({date,now});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/get_wedding_venue', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  WeddingVenue.find({
    _creator: req.user._id
  }).then((place) => {
    if (place.length === 0) {
      req.body.place = 'New York City';
      let place = new WeddingVenue(req.body);
      place.save().then(() => {
        res.send({place});
      })
    } else {
      res.send({place});
    }
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/update_wedding_venue', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  WeddingVenue.findOneAndUpdate({_creator:req.body._creator}, {$set:req.body}, {new:true}).then((place) => {
  if (!place) {
    return res.status(404).send;
  }
    res.send({place});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/get_wedding_party_venue', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  WeddingPartyVenue.find({
    _creator: req.user._id
  }).then((place) => {
    if (place.length === 0) {
      req.body.place = 'Plac Św. Piotra';
      let place = new WeddingPartyVenue(req.body);
      place.save().then(() => {
        res.send({place});
      })
    } else {
      res.send({place});
    }
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/update_wedding_party_venue', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  WeddingPartyVenue.findOneAndUpdate({_creator:req.body._creator}, {$set:req.body}, {new:true}).then((place) => {
  if (!place) {
    return res.status(404).send;
  }
    res.send({place});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.post('/guests_add', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  const guest = new Guests(req.body);
  guest.save().then(() => {
      res.send('guest added');
  }).catch((e) => {
    res.send('exist');
  })
});

app.post('/guests_edit', authenticate, (req,res) => {
  Guests.findOneAndUpdate({_id:req.body._id, _creator:req.body._creator}, {$set:req.body}, {new:true}).then((guest) => {
  if (!guest) {
    return res.status(404).send;
  }
    res.send({guest});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.post('/guests_delete', authenticate, (req,res) => {
  Guests.findByIdAndRemove(req.body._id).then((guest) => {
  if (!guest) {
    return res.status(404).send;
  }
    res.send({guest});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/guests_list', authenticate, (req,res) => {
  Guests.find({
    _creator: req.user._id
  }).then((guests) => {
    res.send({
      guests
    })
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/arrangement__update', authenticate, (req,res) => {
  req.body.forEach((x)=>{
    Guests.findOneAndUpdate({_id:x._id, _creator:x._creator}, {$set:{table:x.table}}, {new:true}).then((guest) => {
    if (!guest) {
      return res.status(404).send;
    }
    }).catch((e) => {
      res.status(400).send;
    })
  });
  res.send('updated');
});


app.post('/expenses__add', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  const expense = new Expenses(req.body);
  expense.save().then((expense) => {
      res.send(expense);
  }).catch((e) => {
    res.send('exist');
  })
});

app.post('/expenses_edit', authenticate, (req,res) => {
  Expenses.findOneAndUpdate({_id:req.body._id, _creator:req.body._creator}, {$set:req.body}, {new:true}).then((guest) => {
  if (!expense) {
    return res.status(404).send;
  }
    res.send({expense});
  }).catch((e) => {
    res.status(400).send;
  })
});

app.post('/expenses_delete', authenticate, (req,res) => {
  Expenses.findByIdAndRemove(req.body._id).then((expense) => {
  if (!expense) {
    return res.status(404).send;
  }
    res.send(expense);
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/expenses_list', authenticate, (req,res) => {
  Expenses.find({
    _creator: req.user._id
  }).then((expenses) => {
    if (expenses.length === 0) {
        let basicExpenses = defaultExpenses;
        basicExpenses.forEach((x)=> {
          x._creator = req.user._id;
        });
       Expenses.collection.insert(basicExpenses, (err, docs) => {
         if (err){
           return console.error(err);
         } else {
           res.send(docs.ops);
         }
       });
    } else {
      res.send(expenses);
    }
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/actions_add', authenticate, (req,res) => {
  req.body._creator =  req.user._id;
  Actions.find({
    _creator: req.user._id
  }).then((act) => {
      let action = new Actions(req.body);
      action.save().then((action) => {
          res.send(action);
      })
  },(e) => {
    res.status(400).send(e);
  })
});

app.post('/actions_edit', authenticate, (req,res) => {
  Actions.findOneAndUpdate({_id:req.body._id, _creator:req.body._creator}, {$set:req.body}, {new:true}).then((action) => {
  if (!action) {
    return res.status(404).send;
  }
    res.send(action);
  }).catch((e) => {
    res.status(400).send;
  })
});

app.post('/actions_delete', authenticate, (req,res) => {
  Actions.findByIdAndRemove(req.body._id).then((action) => {
  if (!action) {
    return res.status(404).send;
  }
    res.send(action);
  }).catch((e) => {
    res.status(400).send;
  })
});

app.get('/actions_list', authenticate, (req,res) => {
  Actions.find({
    _creator: req.user._id
  }).then((actions) => {
    if (actions.length === 0) {
        let basicActions = defaultActions;
        basicActions.forEach((x)=> {
          x._creator = req.user._id;
        });
       Actions.collection.insert(basicActions, (err, docs) => {
         if (err){
           return console.error(err);
         } else {
           res.send(docs.ops);
         }
       });
    } else {
      res.send(actions);
    }
  },(e) => {
    res.status(400).send(e);
  })
});


app.post('/signUp', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateConfirmationLink();
  }).then((confirmationLink) => {
    res.send('registered');
    const url  = `http://${req.headers.host}/confirmation/${confirmationLink}`;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            user: '7testing7weddingapp7@gmail.com',
            pass: 'weddingapp123'
        },
        tls: {
            rejectUnauthorized: false
         }
    });

    let mailOptions = {
        from: '"weddingApp 👻" <foo@example.com>',
        to: user.email,
        subject: 'Hello ✔',
        text: 'Welcome in weddingApp.',
        html: `Please click this link to confirm your email: <a href = "${url}">${url}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return console.log('User singed up');
    });

  }).catch((e) => {
    res.send(e);
  })
});

app.get('/confirmation/:emailToken', (req, res) => {
  User.findOneAndUpdate({confirmation: req.params.emailToken}, {$set:{confirmed:true}}, {new: true}, function(err, user){
    if(err){
     console.log('Something wrong when updating data!');
     }
  });
  res.redirect(`http://${req.header('host')}`);
});

app.post('/login', (req,res) => {
  let credential = {};
  credential.account = 'doesNotExist';
  credential.token = false;
  User.findByCredentials(req.body.email, req.body.password).then((user)=>{
    if (user.confirmed) {
      return user.generateAuthToken().then((token)=>{
        credential.account = 'confirmed';
        credential.token = token;
        res.send(credential);
      });
    }else  {
      credential.account = 'confirmEmail';
      res.send(credential);
    }
  }).catch((e)=>{
    res.send(credential);
  });
});

app.get('*', function(req, res) {
  res.redirect(`https://${req.header('host')}`);
});

app.listen(port, ()=> {
   console.log(`Starting application on ${port}`);
});
