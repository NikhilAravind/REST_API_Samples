var questionInsert = function(){

	var mongoose = require ("mongoose"); 
	var questionSchema = require('./lab4schema.js').questionSchema
	var question = mongoose.model('questionSchema', questionSchema,'questioncollection')
	var answerSchema = require('./lab4schema.js').answerSchema
	var sampleAnswer = mongoose.model('answerSchema', answerSchema,'answercollection')


	var question1 = new question ({
			question_number: "1",
		  	question: "What is your name?",
		  	answers: ["Lancelot","Arthur","Guineviere"]
		});

	question1.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
		});

	var question2 = new question ({
			question_number: "2",
		  	question: "What is your quest?",
		  	answers: ["To find the Grail","To slay the rabbit","To find the Knights who say Ni!"]
		});

	question2.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
		});

	var question3 = new question ({
			question_number: "3",
		  	question: "What is your favorite color?",
		  	answers: ["Blue","Red","I don't know"]
		});

	question3.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
		});

	var question4 = new question ({
			question_number: "4",
		  	question: "What is the capital of Assyria?",
		  	answers: ["I don't know that!"]
		});

	question4.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
		});

	var question5 = new question ({
			question_number: "5",
		  	question: "Enter the GPA of your potentia partner: ",
		  	answers: ["Enter GPA"]
		});

	question5.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
		});


	console.log('retrieving questions')

	question.find({}).exec(function(err, result) {
	  if (!err) {
	   console.log(result);
	  } else {
	    console.log('Error occured');
	  };
	});

	//************************************************************* Survey Entries *************************************

	var answer1 = new sampleAnswer({
		user:"Nikhil",
		question_number:"1",
		answer:"Lancelot"
	})

	var answer2 = new sampleAnswer({
		user:"Nikhil",
		question_number:"2",
		answer:"To find the Grail"
	})

	var answer3 = new sampleAnswer({
		user:"Nikhil",
		question_number:"3",
		answer:"Blue"
	})

	var answer4 = new sampleAnswer({
		user:"Nikhil",
		question_number:"4",
		answer:"I don't know that!"
	})

	var answer5 = new sampleAnswer({
		user:"Nikhil",
		question_number:"5",
		answer:"3.33"
	})

	answer1.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer2.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer3.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer4.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer5.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});


	answer1 = new sampleAnswer({
		user:"Aravind",
		question_number:"1",
		answer:"Lancelot"
	})

	answer2 = new sampleAnswer({
		user:"Aravind",
		question_number:"2",
		answer:"To find the Grail"
	})

	answer3 = new sampleAnswer({
		user:"Aravind",
		question_number:"3",
		answer:"Blue"
	})

	answer4 = new sampleAnswer({
		user:"Aravind",
		question_number:"4",
		answer:"I don't know that!"
	})

	answer5 = new sampleAnswer({
		user:"Aravind",
		question_number:"5",
		answer:"3.33"
	})

	answer1.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer2.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer3.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer4.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer5.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});


	answer1 = new sampleAnswer({
		user:"Mario",
		question_number:"1",
		answer:"Lancelot"
	})

	answer2 = new sampleAnswer({
		user:"Mario",
		question_number:"2",
		answer:"To find the Grail"
	})

	answer3 = new sampleAnswer({
		user:"Mario",
		question_number:"3",
		answer:"Blue"
	})

	answer4 = new sampleAnswer({
		user:"Mario",
		question_number:"4",
		answer:"I don't know that!"
	})

	answer5 = new sampleAnswer({
		user:"Mario",
		question_number:"5",
		answer:"3.33"
	})

	answer1.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer2.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer3.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer4.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});

	answer5.save(function (err) {
			if (err) {
				console.log ('Error on save!')
			}else{
				console.log('Inserted')
			}
	});
}

module.exports.questionInsert = questionInsert;