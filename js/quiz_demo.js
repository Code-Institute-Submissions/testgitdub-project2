(function () {

    // took inspiration from https://www.sitepoint.com/simple-javascript-quiz/ and have tried to re-engineer something similar - adding new loops, data & adding additional features - clock, radominzed questions, pop up confirms, results and on completion disablement of buttons and color scheme indicating which ar correct and incorrect to name a few features
    function Quiz() {

        // variable to store the HTML output
        const output = [];

        // try with different for loop
        // https://stackoverflow.com/questions/59996431/loop-over-an-array-of-objects-return-an-array

        for (let i = 0; i < result.length; i++) {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for (answer in result[i].answers) {

                // add HTML radio button
                answers.push(
                    `<label>
              <input type="radio" name="question${i}" value="${answer}" class="radio_btn">
              ${answer} : ${result[i].answers[answer]}
            </label>`
                );
            }

            // add this question and its answers to the output
            let j = i + 1;
            output.push(
                `<div class="outer_quest">
		    <div class="question">Q${[j]}. ${result[i].question} </div>
            <div class="answers"> ${answers.join('')} </div>
		    </div>`
            );
        }

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    let ele = document.getElementById('popupInfo');

    function showResults() {

        // check that all is ok to submit or require to return to the quiz	
        let input;
        input = confirm('All ok?');

        if (input === false) {
            document.getElementById('popup1').style.display = "none";
            return;
        }
        else {
            document.getElementById('popup1').style.display = "block";
        }

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // gather answers that have been selected as correct by the user
        const correctAnswerContainers = quizContainer.querySelectorAll('label:has(input:checked)');

        // keep track of user's answers
        let numCorrect = 0;

        // loop through results to highlight if they're correct or not
        for (let i = 0; i < result.length; i++) {

            // find selected answer
            const answerContainer = answerContainers[i];
            const selector = `input[name=question${i}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;


            if (userAnswer === result[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
                // color the answers green if correct
                correctAnswerContainers[i].style.color = 'lightgreen';
            }
            else {
                // color the answers red if incorrect
                correctAnswerContainers[i].style.color = 'red';
            }

        }

        // stop clock
        clearTimeout(timerId);
        ele.innerHTML += 'You completed with ' + timeLeft + ' seconds remaining';
        ele.innerHTML += '<br/>';
        ele.innerHTML += 'You scored ' + `${numCorrect} out of ${result.length}`;
        disableButtons();

    }

    //Reset the quiz to play again
    function quizReset() {
        location.reload();
    }

    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resetButton = document.getElementById('reset');

    // Pool of questions - ideas from https://www.javatpoint.com/css-mcq
    const myQuestions = [
        {
            question: "What's the correct way to style font-size?",
            answers: {
                a: "text-size",
                b: "size",
                c: "font-size"
            },
            correctAnswer: "c"
        },
        {
            question: "Which one of these is apply styling inline?",
            answers: {
                a: "styles",
                b: "style",
                c: "styling"
            },
            correctAnswer: "b"
        },
        {
            question: "What is used to add a background image to an element?",
            answers: {
                a: "background-color",
                b: "background-image",
                c: "background-attachment"
            },
            correctAnswer: "b"
        },
        {
            question: "How so you display links without an underline?",
            answers: {
                a: "text-decoration : underline",
                b: "decoration : no-underline",
                c: "text-decoration : none"
            },
            correctAnswer: "c"
        },
        {
            question: "What is used to text bold in CSS?",
            answers: {
                a: "font-weight : bold",
                b: "weight: bold",
                c: "font: bold"
            },
            correctAnswer: "a"
        },
        {
            question: "What of these does not set the text to bold?",
            answers: {
                a: "bold",
                b: "b",
                c: "strong"
            },
            correctAnswer: "a"
        },
        {
            question: "What is used to create a border on an element?",
            answers: {
                a: "outline",
                b: "border",
                c: "margin"
            },
            correctAnswer: "b"
        },
        {
            question: "What is is used to create spacing inside of an element?",
            answers: {
                a: "margin",
                b: "spacing",
                c: "padding"
            },
            correctAnswer: "c"
        },
        {
            question: "Which of the following capitalise the text?",
            answers: {
                a: "text-transform : capitalize;",
                b: "transform : capitalize;",
                c: "text-transform : capital;"
            },
            correctAnswer: "a"
        },
        {
            question: "Which of these is a proper reference to a CSS class?",
            answers: {
                a: "#cssclass",
                b: ".cssclass",
                c: "&cssclass"
            },
            correctAnswer: "b"
        },
        {
            question: "Which of the following is not a type of combinator?",
            answers: {
                a: "+",
                b: "~",
                c: "*"
            },
            correctAnswer: "c"
        },
        {
            question: "Which CSS function allows for calculations?",
            answers: {
                a: "calculate()",
                b: "calc()",
                c: "cal()"
            },
            correctAnswer: "b"
        },
        {
            question: "What CSS property is used to specify transparency",
            answers: {
                a: "opacity",
                b: "overlay",
                c: "visibility"
            },
            correctAnswer: "a"
        },
        {
            question: "What tag is used to define an ordered list?",
            answers: {
                a: "ol",
                b: "ul",
                c: "li"
            },
            correctAnswer: "a"
        },

        {
            question: "What's used to select paragraphs that are direct descendants from a div?",
            answers: {
                a: "div p",
                b: "div > p",
                c: "div + p"
            },
            correctAnswer: "b"
        },
        {
            question: "What tag is used to underline an element?",
            answers: {
                a: "u",
                b: "underline",
                c: "li"
            },
            correctAnswer: "a"
        },
        {
            question: "What's the correct attribute to use when styling text color in CSS?",
            answers: {
                a: "text-color",
                b: "font-color",
                c: "color"
            },
            correctAnswer: "c"
        },
        {
            question: "Which of the following tags is used to import an external Javascript file?",
            answers: {
                a: "style",
                b: "script",
                c: "link"
            },
            correctAnswer: "b"
        },
    ];

    // Randomise the array of questions using sort function
    const shuffle = myQuestions.sort(() => 0.5 - Math.random());

    // Take the first 5 questions from the newly randomised array that has been sorted
    const result = shuffle.slice(0, 5);

    // Kick things off
    Quiz();

    // add a countdown clock
    let timeLeft = 60;
    let elem = document.getElementById('some_div');
    let timerId = setInterval(showClock, 1000);

    // make buttons unusable after quiz sudmission or time expired
    function disableButtons() {
        const elements = document.querySelectorAll('.radio_btn');
        Array.from(elements).forEach((element, index) => {
            element.setAttribute("disabled", true);
        });
    }

    // display the clock, showing the remaining seconds in the game
    function showClock() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            alert('You did not complete the quiz in the time allocated');
            const button = document.querySelector(".button-submit");
            button.setAttribute("disabled", true);
            ele.innerHTML += 'You did not complete the quiz in the time allocated';
            disableButtons();
        }
        else {
            elem.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }

    // Event listeners
    submitButton.addEventListener('click', showResults);
    resetButton.addEventListener('click', quizReset);
})();