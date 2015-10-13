var express=require('express');

//create an app server
var app = require('express').createServer();
//set path to the views (template) directory
app.set('views', __dirname + '/views');
//app.engine('html', require('ejs').renderFile);
//set path to static files
app.use(express.static(__dirname + '/../public'));
//handle GET requests on /


app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

//Mongoose ODM
var mongoose = require ("mongoose"); 
var db = mongoose.connect('localhost:27017/newnews');
var restful = require("node-restful");

var questionSchema = require('./lab4schema.js').questionSchema
//var question = mongoose.model('questionSchema', questionSchema,'questioncollection')

var answerSchema = require('./lab4schema.js').answerSchema
//var answer = mongoose.model('answerSchema', answerSchema,'answercollection')


//Restful API Implementation
var answer = restful.model('answerSchema', answerSchema, 'answercollection');
var question = restful.model('questionSchema', questionSchema, 'questioncollection');

question.methods(['get', 'put', 'post', 'delete'])
question.register(app, '/api/questions');


answer.route('match', callMatch);
answer.methods(['get', 'put', 'post', 'delete'])
answer.register(app, '/api/answers');


//Restful end
answer.schema.path('answer').validate(function(value){
	console.log('GPA validation check 1');
	console.log(value);
	value = parseFloat(value);
	console.log(value);
	var GPAValue = value;
	if(isNaN(value))
		return true;
	return (GPAValue <= 4.50);
},	'GPA cannot exceed 4.50');

answer.schema.path('answer').validate(function(value){
	console.log('GPA validation check 2');
	console.log(value);
	value = parseFloat(value);
	console.log(value);
	var GPAValue = value;
	if(isNaN(value))
		return true;
	return (GPAValue > 0.00);
},	'GPA cannot be 0');



//Init method
app.get('/insert', function(req, res){

var inserts = require('./lab4init.js');
inserts.questionInsert()

res.render('login.jade',{username: ""});

});


app.get('/', function(req, res){

	var user_name = req.query.username;
	console.log(user_name);
	res.render('login.jade',{username: user_name});
});



app.get('/logon', function (req, res, next){

	console.log(req.query.button + " called");
	console.log("Username = |" + req.query.username +"|");

	var action = req.query.button;
	var userName = req.query.username;
	var qq;
	var answerFile = __dirname + "/answers/"+userName+".json";

	if(action=='Survey'){

		question.find({question_number: "1"}).exec(function(err, result) {
		  if (!err) {
		  console.log(result);
		 
		  qq = result[0]['question'] 	//data.question1['question'];
		  ans = result[0]['answers']	//data.question1['answers'];
		  console.log(qq)


		  if(req.query.username!=""){

		  	answer.find({user:userName, question_number:"1"}).exec(function(err, result) {
			  if (!err) {
			  	console.log(result);
			  	if(result[0]==null){
			  		console.log('No answer yet');
			  		answerForNext = '';
			  	}else{
			  		answerForNext = result[0]['answer']
			  	}
			  	res.render('index.jade', {pageNumber: "1", username: userName, question: qq, options: ans, answerGiven: answerForNext});
			  } else {
			    console.log('Error occured');
			  };
			});		  		

		  }else{
			res.render('login.jade', {error: "Username required"});
		  }

		  } else {
		    console.log('Error occured');
		  };

		});

	}else{
			callMatch (req, res, next);
		}
});


function callMatch(req, res, next){

	var action = req.query.button;
	var userName = req.query.username;
	var qq;
	
	console.log("Match called");
	console.log("***"+userName+"***")

	var dir='./answers/';
	var data={};
	var matchResult = "Here are your matches: \n\n";

	answer.find({}).exec(function(err, result) {
	  if (!err) {
	   console.log(result);

	   var participantCount = result.length/5
	   console.log('There are '+ participantCount+ ' number of survey participants');

	   	var userAnswers = [];
	   	var participants = [];
	   	var allParticipantsAnswers = [];
	   	for (var i = 0; i < result.length; i++) {
	   		
	   		if(result[i]['user']==userName && result[i]['question_number']!='5'){
	   			userAnswers.push(result[i]['answer'])
	   		}else if(result[i]['user']!=userName){
	   			participants.push(result[i]['user'])
	   			allParticipantsAnswers.push(result[i]['answer'])
	   		}
	   	};

	   	console.log(userAnswers);
	   	console.log(participants);
	   	console.log(allParticipantsAnswers);

	   	if(participantCount==1 && result[0]['user']==userName){
	    		matchResult = "Not enough participants have taken the survey to issue matches.";
	    		res.render('match.jade', {result: matchResult, username: userName});
	    		return;
	    	}

    	if(userAnswers.length==0){
    		matchResult = "You haven't taken the Survey yet.";
    		res.render('match.jade', {result: matchResult, username: userName});
    		return;
    	}


    	var nextUsersAnswers = [];
	   	for(var i = 0; i< participants.length; i++){
	   		
	   		if((i+1)%5!=0){
	   			nextUsersAnswers.push(allParticipantsAnswers[i])
	   		}else{
	   			//nextUsersAnswers.push(allParticipantsAnswers[i])
	   			var matchCount = computeScore(userAnswers, nextUsersAnswers);
	   			matchResult = matchResult + "&nbsp;&nbsp;"+ matchCount + " match with user: " + participants[i] +" \n";
	   			nextUsersAnswers = [];
	   		}


	   	};
	   	res.render('match.jade', {result: matchResult, username: userName});

	  } else {
	    console.log('Error occured');
	  };

	});
}


function computeScore(src, target) {
		var rval = 0;
		if (src != null && target != null) {
			for (i = 0; i < src.length && i < target.length; i++) {
				if (src[i] != null && target[i] != null && src[i]==target[i]) {
					rval++;
				}
			}
		}
		return rval;
	}




app.get('/surveyAnswer', function(req, res){

	console.log(req.query.button);
	var newPageNumber;
	
	var userName = req.query.username;
	var pagenumber = parseInt(req.query.pageNumber);
	var answerChoosen = req.query.answer;
	//var answerFile = __dirname + "/answers/"+userName+".json";

	if(req.query.button=='Next'){
		newPageNumber = pagenumber+1;
	}else{
		newPageNumber = pagenumber-1;
	}

	if(pagenumber==5 && req.query.button=='Next'){

		
		answer.findOne({user:userName, question_number:pagenumber}, function (err, result) {
		  if (err){
		  	// do someting
		  	 return ;
		  }

		  if(result==null){
		  	result = new answer({});
		  }

		  result.user = userName;
		  result.question_number = pagenumber;
		  result.answer = answerChoosen;
		  result.save(function (err) {
		    if (err){
		    	console.log(err.errors.answer.message);
			    console.log(String(err.errors.answer));
			    console.log(err.errors.answer.type);
			    console.log(err.errors.answer.path);
			    console.log(err.errors.answer.value);
			    console.log(err.name);
			    console.log(err.message);

			    console.log('Re trying question 5');
			    res.render('GPA.jade', {pageNumber: "5", username: userName, question: "Enter the GPA of your potential partner", options: "", answerGiven: answerChoosen, errorMessage: err.errors.answer.message});
				return;
				
	    
		    }else{
		    	console.log('Survey has ended');
		    	res.render('survey_end.jade', {username: userName});
				return;
		    }
		  });
		});


		
	}else{
	
		question.find({question_number: newPageNumber}).exec(function(err, result) {
		  if (!err) {
			console.log(result);
		
		  qq = result[0]['question'] 	//data['question'+(newPageNumber)]['question'];
		  ans = result[0]['answers'] 	//data['question'+(newPageNumber)]['answers'];
		  
		  console.log("Next question = " + qq);
		  console.log("Options are = " + ans);
		  
		  console.log("Answer selected for question number " +req.query.pageNumber+" is: " +req.query.answer);

			answer.update({user:userName, question_number: pagenumber}, {$set: {user:userName, question_number: pagenumber, answer: answerChoosen }}, {upsert: true}, function(err){
				if(!err){
					console.log("Answer added");
				}else{
					console.log(err)
				}
			});


		
		    if(pagenumber==5 && req.query.button=='Next'){
				res.render('survey_end.jade', {username: userName});
				return;
			}

			answer.find({user:userName, question_number:newPageNumber}).exec(function(err, result) {
			  if (!err) {
			  	console.log(result);
			  	if(result[0]==null){
			  		answerForNext = '';
			  	}else{
			  		answerForNext = result[0]['answer']
			  	}

			  	if(pagenumber!=4)
			  		res.render('index.jade', {pageNumber: newPageNumber, username: userName, question: qq, options: ans, answerGiven: answerForNext});
			  	else
			  		res.render('GPA.jade', {username: userName, pageNumber: "5", answerGiven: answerForNext});

			  } else {
			    console.log('Error occured');
			  };
			});

		 } else {
			    console.log('Error occured');
		 };

		});
	}
});


//listen on localhost:8008
app.listen(8008);