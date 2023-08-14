import React, { useState, useEffect } from 'react';
import he from 'he'; //Import 'he' library to decode api response

const Quiz = ({quizState, setQuizState}) => {
    // Setting default state
    const [selectCat, setSelectCat] = useState(() => {
        //Check if there is a selectedCategory in local storage from user selection
        const storedCategory = localStorage.getItem('selectedCategory');
        return storedCategory ? storedCategory: '23'; //If no storedCategory, return default value of 23 to avoid bugs or empty selection
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(100);
    const [decodedCurrentQuestion, setDecodedCurrentQuestion] = useState(null);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    // Our api url
    let url = `https://opentdb.com/api.php?amount=10&category=${selectCat}&type=multiple`

    // Making the Api call
    const fetchQuizData = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setQuestions(data.results);
            });
    };

    // Fetch as page loads
    useEffect(() => {
        fetchQuizData();
    }, []);

    // Function to shuffle options
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Handle Click
    const handleOptionClick = selectedOption => {
        //Add points to score if answer is correct
        if (selectedOption === currentQuestionData?.correct_answer) {
            setScore(score + 10);
        }  else {
            // Deduct five seconds from the timer if the answer is incorrect
            setTimer(prevTimer => (prevTimer >= 5 ? prevTimer - 5 : 0));
        }
        if (currentQuestion === finalQuestion - 1){
            setQuizState('end');
            return;
        } else if(currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1);
        }
        // Move to the next question
        
    };

    // Data for current question
    const currentQuestionData = questions[currentQuestion];
    const finalQuestion = questions.length;
    
    useEffect(() => {
        let timerInterval;
        
        if (quizState === 'quiz') {
            timerInterval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 0) {
                        setQuizState('end'); // End the quiz when timer reaches 0
                    }
                    return prevTimer > 0 ? prevTimer - 1 : prevTimer;
                });
            }, 1000);
        }
        
        return () => {
            clearInterval(timerInterval);
        };
    }, [quizState]);
    
    const handleStartQuiz = () => {
        //Transition to the quiz state when the start button is clicked
        setQuizState('quiz');
    }

    //Decode and shuffle answers when a new question is rendered
    useEffect(() => {
        //Decode html using 'he' library to avoid encoded characters in default api response
        if (currentQuestionData) {
          const decodedQuestion = {
            ...currentQuestionData,
            question: he.decode(currentQuestionData.question),
            correct_answer: he.decode(currentQuestionData.correct_answer),
            incorrect_answers: currentQuestionData.incorrect_answers.map(he.decode),
          };
          setDecodedCurrentQuestion(decodedQuestion);

        //Shuffle answers to prevent fixed order when rendering
          const newShuffledAnswers = shuffleArray([
            ...decodedQuestion.incorrect_answers,
            decodedQuestion.correct_answer,
          ]);
          setShuffledAnswers(newShuffledAnswers);
        }
      }, [currentQuestionData]);

    return (
        <div className="feev__home">
            {quizState === 'start' && questions.length > 0 && currentQuestionData ? (
                <div className="quiz__wrap">
                    <section className="directions__header">
                        <h2 className="quiz__category quiz__category--start">{currentQuestionData.category}</h2>
                        <div className="timer__block">
                            <i className="quiz__timer fa-solid fa-stopwatch"></i>
                            <p className="quiz__timer--text">{timer} s</p>
                        </div>
                        
                    </section>
                    <section className="quiz__directions--blurb">
                        <h3>you have chosen the {currentQuestionData.category} category!</h3>
                        <p>you will have <span className="quiz__directions--bold">10</span> seconds per question, with a <span className="quiz__directions--bold">5</span> second penalty for incorrect answers.</p>
                        <p>your quiz will begin when you press start!</p>

                        <button className="quiz__start-button" onClick={handleStartQuiz}>start</button>
                    </section>
                </div>
                
            ) : (
                <></>
            )}
            {quizState === 'quiz' && questions.length > 0 && currentQuestionData ?  (
                <div className="quiz__wrap">
                    <h2>{currentQuestionData.category}</h2>
                    <p>{decodedCurrentQuestion.question}</p>
                    <div className="option-holder">
                        {shuffledAnswers.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="option"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <p>Time remaining: {timer} s</p>
                    <p>Score: {score}</p>
                </div>
            ) : (
                <></>
            )}
            {quizState === 'end' && questions.length > 0 && currentQuestionData ?  (
                <div className="quiz__wrap quiz__wrap--end">
                    <h2 className="quiz__category quiz__category--end">{currentQuestionData.category}</h2> 
                    <div className="quiz__score-card quiz__score-card--blue">
                        <p className="score__message">congrats! you scored: </p>
                        <div className="quiz__card--score">
                            <i className="quiz-end__score--icon fa-solid fa-coins"></i> 
                            <p className="score__text">{score}</p>
                        </div>
                        </div>
                    <div className="quiz__score-card quiz__score-card--pink">
                        <p className="score__message">your new total score: </p>
                        <div className="quiz__card--score">
                            <i className=" quiz-end__score--icon fa-solid fa-coins"></i> 
                            <p className="score__text">{score}</p>
                        </div>
                        </div>
                    <button className="quiz__score--save">save</button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default Quiz;