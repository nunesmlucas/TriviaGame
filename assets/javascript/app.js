
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
            choiceButton.attr('value', answer[i]);
            // console.log(choiceButton);
            $("#multiple-choice").append(choiceButton);
        }
        this.globalIndex++;
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


