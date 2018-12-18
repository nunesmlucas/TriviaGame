
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
};

function start() {
    $('#start-button').remove();
    console.log("IN START");
    triviaGame.clearForm();
    triviaGame.populateQuestions();
};


