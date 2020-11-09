const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');  //из http createServer
const app = express();                       //вызываем express
const port = 8005;

mongoose
  .connect('mongodb+srv://Victor:qaz123321@cluster0.ipq0n.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

const UsersSchema = new mongoose.Schema({                     //схема акие поля будут
  name: {
    type: String,
    required: true,                      //обязательное поле
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  }
});

const Users = mongoose.model('Users', UsersSchema);

app.get('/', (req, res) => {
  // Users.create({
  //   name: 'gOGI',
  //   email: 'test@test.com',
  // }, {
  //   name: 'Masha',
  //   email: 'masha@masha.tut.by',
  //   age: 30,
  // })
  //   .then(user => res.send(user))         //res.send(user) - отправим на страничку
  //   .catch(err => res.send(err));
  Users.find()                                 //найти всех
    .then(users => res.send(users))
    .catch(err => res.send(err));
});

const server = createServer(app);
server.listen(port, () => console.log(`server is up. port: ${port}`));         //слушаем сервер listen
