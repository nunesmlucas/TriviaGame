
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
                choices: ["Washington DC", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "How the Grinch Stole Christmas is a 2000 American Christmas fantasy comedy film starring which actor as the Grinch?",
                choices: ["Tom Hanks", "Jim Carrey", "Nicholas Cage", "Robert Downey Jr."],
                answer: [0, 1, 0, 0]
            },

            {
                question: 'In which Disney film do two cats sing “The Siamese Cat Song"?',
                choices: ["Lady and the Tramp", "Fantasia", "Cats vs Dogs", "Peter Pan"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "In what city would you find the Wizard of Oz?",
                choices: ["The Diamond City", "The Emerald City", "The Sapphire City", "The Ruby City"],
                answer: [0, 1, 0, 0]
            },

            {
                question: "What is Shawshank, in the movie The Shawshank Redemption?",
                choices: ["The Prison", "A Knife", "A Person", "The Town"],
                answer: [1, 0, 0, 0]
            },
            {
                question: "The song “Eye of the Tiger” by the band Survivor was the theme song for what movie released in 1982?",
                choices: ["Rocky I", "Rocky II", "Rocky III", "Creed"],
                answer: [0, 0, 1, 0]
            },

            {
                question: "What is the capital of United States?",
                choices: ["California", "New York", "Miami", "Florida"],
                answer: [1, 0, 0, 0]
            },
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
        if (this.counter == 10) {
            this.clearForm();
            this.stop();
            this.finalResults();
        }
        else {
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
        }
    },

    checkAnswers: function (event) {

        // console.log("IN THE CHECK ANSWERS FUNCTION");
        // console.log({
        //     game: this,
        //     clickedThing: event.target
        // })
        console.log($(event.target).val());

        var gifResponseWrong = $("#gif-response-wrong");
        var gifResponseRight = $("#gif-response-right");


        var clickedValue = $(event.target).val();

        if (clickedValue == 1) {
            this.correct++;
            this.counter++;
            this.stop();
            this.clearForm();
            console.log(this);
            gifResponseRight.show();
            console.log("We're right here!");

            setTimeout(function (event) {
                gifResponseRight.hide();
                this.clearForm();
                console.log("after clear form");
                this.populateQuestions(event);
            }.bind(this), 3500);

        }
        else if (clickedValue == 0) {

            this.stop();
            this.incorrect++;
            this.counter++;
            this.clearForm();

            gifResponseWrong.show();


            setTimeout(function (event) {
                gifResponseWrong.hide();
                this.clearForm();
                this.populateQuestions(event);
            }.bind(this), 2000);
        }
    },

    finalResults: function () {
        $("#instructions").text("DRUM ROLL PLEASE!.... Let's see how you did. ");
        $("#score-area").show();
        $("#correctAnswers").text(this.correct);
        $("#incorrectAnswers").text(this.incorrect);
        $("#noAnswers").text(this.noAnswer);
        $("#timeDisplay").hide();
    },

    clearForm: function () {
        $("#instructions").text("");
        $("#multiple-choice").empty();
        this.time = 30;
    },

    run: function () {

        // if the timer is not on we set it
        if (!this.clockRunning) {
            intervalId = setInterval(this.count.bind(this), 1000);
            // we keep track of the interval through this flag
            clockRunning = true;
        }

    },

    stop: function () {
        console.log("STOP");
        clearInterval(intervalId);
        timerOn = false;
    },
    count: function () {

        console.log("TIME TEST: " + this.time);
        var gifResponseWrong = $("#gif-response-wrong");


        //  TODO: increment time by 1, remember we cant use "this" here.
        this.time--;

        if (this.time === 0) {

            this.stop();

            alert("Times up!");
            this.clearForm();

            console.log("IN THE NON CLICK");

            gifResponseWrong.show();


            this.noAnswer++;
            this.counter++;
            console.log(this.noAnswer);
            setTimeout(function (event) {
                gifResponseWrong.hide();
                this.clearForm();
                this.populateQuestions();
            }.bind(this), 2000);


        }

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
    }

};

var template = $.extend(true, {}, triviaGame);

function start() {
    $('#start-button').remove();
    console.log("IN START");
    triviaGame.clearForm();
    triviaGame.populateQuestions();

};
function restart() {
    //WONT RESET -------
    console.log("IN RESTART");
    $("#score-area").hide();
    $("#correctAnswers").text("");
    $("#incorrectAnswers").text("");
    $("#noAnswers").text("");
    $("#timeDisplay").show();
    triviaGame = $.extend(true, {}, template);
    start();
};

