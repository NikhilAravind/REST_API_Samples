var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;


var questionSchema = new mongoose.Schema({
  question_number: String,
  question: String,
  answers: [{ type: String }]
  			
});

var answerSchema = new mongoose.Schema({
  user: String,
  question_number: String,
  answer: String
});

module.exports = mongoose.model('questionSchema', questionSchema, 'usercollection');
module.exports = mongoose.model('answerSchema', answerSchema, 'usercollection');