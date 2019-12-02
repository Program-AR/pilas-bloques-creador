const ExerciseModel = require("../Models/exercise");
const _ = require('lodash');

class ExerciseHome {

  constructor() {
    this.Model = ExerciseModel;
  }

  upsert(entity) {
    if(entity._id){
      return this.Model.findByIdAndUpdateAsync(entity._id, entity);
    }

    return this.Model.createAsync(entity);
  }

  getAll(query) {
    return this.Model.findAsync(query);
  }

  getOne(id) {
    return this.Model.findByIdAsync(id);
  }

  publish(username, {level, categories, difficulty}) {
    return this.Model.findOneAndUpdate({user: username, name: level.name}, { $set: { publishData: { publicationDate: Date.now(), categories, difficulty, downloads: 0 } } });
  }

  getAllPublished() {
    return this.Model.findAsync({publishData: { $exists: true } });
  }

  depublish(_id) {
    return this.Model.updateOneAsync({ _id }, { $unset: { publishData: "" } });
  }

  delete(_id) {
    return this.Model.deleteOneAsync({ _id });
  }

  download(_id) {
    return this.Model.findOneAndUpdate({ _id }, { $inc: { "publishData.downloads": 1 } });
  }

  comment(_id, author, text) {
    return this.Model.findOneAndUpdate({ _id }, { $push: { "publishData.comments": { author, date: new Date(), text } } }, { new: true });
  }

  rate(_id, author, newRate) {
    if(author === "invitado")
     return this.Model.findOneAndUpdate({ _id }, { $push: { "publishData.rates": { author, rate } } }, { new: true });
    else
     return this.Model.findOneAsync({ _id })
         .then(exercise => {
           const rateFound = _.find(exercise.publishData.rates, {author});
           if (!!rateFound) {
             rateFound.rate = newRate;
           } else {
             const rates = exercise.publishData.rates || [];
             rates.push({author,rate: newRate});
             exercise.publishData.rates = rates;
           }
           exercise.save();
         });
  }



}

module.exports = new ExerciseHome();
