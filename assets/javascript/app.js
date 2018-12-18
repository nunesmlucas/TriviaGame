
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
    number: 30,

    initialize: function () {

    },


    populateQuestions: function () {

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
            choiceButton.attr('onclick', "triviaGame.checkAnswers()");
            choiceButton.attr('value', answer[i]);
            // console.log(choiceButton);
            $("#multiple-choice").append(choiceButton);
        }
        this.run();
        this.globalIndex++;
    },

    checkAnswers: function () {

        console.log("IN THE CLICK FUNCTION");
        // HAVE TO ADD THE BIND FUNCTION HERE???? ------------------------------------
        console.log($(this).val());
        var clickedValue = $(this).val();
        if (clickedValue == 1) {
            correct++;
            populateQuestions();
        }
        else if (clickedValue == 0) {
            incorrect++;
            populateQuestions();
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
            intervalId = setInterval(this.decrement, 1000);
            // we keep track of the interval through this flag
            clockRunning = true;
        }

    },

    decrement: function () {
        if (this.number === 0) {

            stop();

            alert("Time Up!");
        }
        else {
            this.number--;
            console.log(this.number);
            $("#show-number").html("<h2>" + this.number + "</h2>");
        }

    },

    stop: function () {
        clearInterval(intervalId);
        timerOn = false;
    },

};

function start() {
    $('#start-button').remove();
    console.log("IN START");
    triviaGame.clearForm();
    triviaGame.populateQuestions();
};


