
//helper methods
app.get('/getQuestion', function(req, res){

	question.find({}).exec(function(err, result) {
	  if (!err) {
	   console.log(result);
	  } else {
	    console.log('Error occured');
	  };
	});

});

app.get('/getQuestion', function(req, res){

	question.find({}).exec(function(err, result) {
	  if (!err) {
	   console.log(result);
	  } else {
	    console.log('Error occured');
	  };
	});

});


app.get('/getAnswers', function(req, res){

	answer.find({}).exec(function(err, result) {
	  if (!err) {
	   console.log(result);
	  } else {
	    console.log('Error occured');
	  };
	});

});


app.get('/removeQuestions', function(req, res){

	mongoose.connection.db.dropCollection('questioncollection', function(err, result) {
		console.log('all questions dropped');
	});
	res.render('login.jade',{username: ""});
});


app.get('/removeAnswers', function(req, res){

	mongoose.connection.db.dropCollection('answercollection', function(err, result) {
		console.log('all answers dropped');
	});
	res.render('login.jade',{username: ""});

});

//end helper methods