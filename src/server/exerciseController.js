const home = require('./homes/exercise.home');

class ExerciseController {

  create({ user: { username }, body: level }, res) {
    return home.upsert({ user: username, ...level })
      .then(() => res.sendStatus(201))
      .catch(({ message }) => res.status(400).send({ message }))
  }

  getAll({ user: { username } }, res) {
    return home.getAll({ user: username}).then(it => res.json(it))
  }

  getOne({ params: { id } }, res) {
    return home.getOne(id).then(it => res.json(it))
  }

  publish({ user: { username }, body: levelToPublish}, res) {
    return home.publish(username, levelToPublish)
      .then(() => res.sendStatus(200));
  }

  depublish({ params: { id } }, res) {
    return home.depublish(id)
      .then(() => res.sendStatus(200));
  }

  getAllPublished(req, res) {
    return home.getAllPublished().then(it => res.json(it))
  }

  delete({ params: { id } }, res) {
    return home.delete(id).then(() => res.sendStatus(200))
  }

  download({ params: { id } }, res) {
    return home.download(id).then(() => res.sendStatus(200))
  }

  comment({ user: { username }, params: { id }, body: { text } }, res) {
    return home.comment(id, username, text).then(level => res.json(level))
  }

  rate({ user: { username }, params: { id }, body: { rate } }, res) {
    return home.rate(id, username, rate)
        .then(level => res.json(level))
  }

}

module.exports = new ExerciseController();
