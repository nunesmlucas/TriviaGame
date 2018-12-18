
var triviaGame = {

    counter: 0,
    questions:

        [
            {
                question: "What is the capital of United Kingdom?",
                choices: ["Manchester", "Birmingham", "London", "Birmingham"],
                answer: [0, 1, 0, 0]
            },

            {
                question: "What is the capital of United States?",
                choices: ["California", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            }
        ],


    globalIndex: 0,
    correct: 0,
    incorrect: 0,
    noAnswer: 0,

    //  Variable that will hold our setInterval that runs the stopwatch
    intervalId: -1,

    // prevents the clock from being sped up unnecessarily
    clockRunning: false,
    time: 30,


    populateQuestions: function (event) {
        console.log("in Populate questions");
        question = this.questions[this.globalIndex].question;
        answer = this.questions[this.globalIndex].answer;

        var tempholder = document.getElementById("instructions");
        tempholder.textContent = question;

        var options = this.questions[this.globalIndex].choices;

        for (var i = 0; i < options.length; i++) {

            var choiceButton = $("<button>");
            choiceButton.addClass("btn btn-primary");
            choiceButton.text(options[i]);
            choiceButton.attr('id', "choice-button" + [i]);
            choiceButton.attr('value', answer[i]);
            // console.log(choiceButton);
            $("#multiple-choice").append(choiceButton);
            choiceButton.on('click', this.checkAnswers.bind(this));
        }


        this.run();
        this.globalIndex++;
    },

    checkAnswers: function (event) {

        console.log("IN THE CLICK FUNCTION");
        console.log({
            game: this,
            clickedThing: event.target
        })
        console.log($(event.target).val());
        var clickedValue = $(event.target).val();
        if (clickedValue == 1) {
            this.correct++;
            this.clearForm();
            this.populateQuestions(event);
        }
        else if (clickedValue == 0) {
            this.incorrect++;
            this.clearForm();
            this.populateQuestions(event);
        }
        else {
            noAnswer++;
        }

    },

    clearForm: function () {
        $("#instructions").text("");
        $("#multiple-choice").empty();

    },




    run: function () {

        // if the timer is not on we set it
        if (!this.clockRunning) {
            intervalId = setInterval(this.count.bind(this), 1000);
            // we keep track of the interval through this flag
            clockRunning = true;
        }

    },

    // decrement: function () {
    //     if (this.time === 0) {

    //         stop();

    //         alert("Time Up!");
    //     }
    //     else {
    //         this.time--;
    //         console.log(this.time);
    //         // $("#show-number").html("<h2>" + this.number + "</h2>");
            
    //     }

    // },

    stop: function () {
        clearInterval(intervalId);
        timerOn = false;
    },
    count: function() {

        console.log("TIME TEST: " + this.time); //DOESNT GRAB time. ---------------------


        //  TODO: increment time by 1, remember we cant use "this" here.
        this.time--;
      
        //  TODO: Get the current time, pass that into the timeConverter function,
        //        and save the result in a variable.
        currentTime = triviaGame.timeConverter(this.time);
      
        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        $("#timeDisplay").text(currentTime);
      },

    timeConverter: function (t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

function start() {
    $('#start-button').remove();
    console.log("IN START");
    triviaGame.clearForm();
    triviaGame.populateQuestions();
};


