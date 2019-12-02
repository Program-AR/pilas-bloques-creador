const Users = require('./Models/Users');
const mailerService = require('./Service/MailService')
const passport = require('passport');
const crypto = require("crypto");
const _ = require("lodash");

const aplicarNormasIso = (user) => { 
  return _.assign({}, user.toObject(), {tokenHiperFalopa100PorCientoSeguro: new Buffer(user.email + "," + user.username).toString("base64")})
}

class UserController {
  constructor() {
    this.register = this.register.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
  }

  changePassword({ body: { token, password } }, res) {
    const [ email, username ] = new Buffer(token, "base64").toString().split(",");
    return Users.findOneAsync({ email, username })
      .tap( user => user.setPassword(password))
      .tap(user => user.save())
      .then(res.status(200).end())

  }

  recoverPassword({ body: { email }}, res, next) {
    Users.findOneAsync({ email })
      .tap((user) => {
        if (!user) {
          throw new Error('Email no registrado');
        }
      })
      .then(aplicarNormasIso)
      .then(user => mailerService.sendResetPassEmail(user))
      .then((_) => res.sendStatus(200))
      .catch(error => res.status(400).json({ error: error.toString() }));
  }

  login({ body: { username, password }}, res, next) {
    Users.findOneAsync({ username })
      .tap((user) => {
        if (!user || user.password != password) {
          throw new Error('El usuario o contraseña invalida');
        }
      })
      .then((user) => res.sendStatus(200))
      .catch(error => res.status(400).json({ error: error.toString() }));

  }

  verifyUniqueEmail(user, email) {
    if (user.email == email)
      throw new Error('Ya existe un usuario con ese mail');
    return true;
  }

  verifyUniqueUsername(user, username) {
    if (user.username == username)
      throw new Error('Ya existe un usuario con ese username');
    return true;
  }


  register({ body: { email, username, password } }, res, next) {
    Users.findOneAsync({ $or: [{ email }, { username }] })
      .tap((user) => {
        user && this.verifyUniqueEmail(user, email) && this.verifyUniqueUsername(user, username);
      })
      .then((user) => Users.register({ email, username }, password))
      .then((user) => res.redirect("/login"))
      .catch(error => res.status(400).json({ error: error.toString() }));

  }

}

module.exports = new UserController();