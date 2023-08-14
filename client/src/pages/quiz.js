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
                        <h2>{currentQuestionData.category}</h2>
                        <div className="timer__block">
                            <i class="fa-solid fa-stopwatch"></i>
                            <p>{timer} seconds</p>
                        </div>
                        
                    </section>
                    <h3>you have chosen the {currentQuestionData.category} category!</h3>
                    <p>you will have 10 seconds per question, with a 5 second penalty for incorrect answers.</p>
                    <p>your quiz will begin when you press start!</p>
                    <button onClick={handleStartQuiz}>start</button>
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
                <div className="quiz__wrap">
                    <h2 className="quiz__category">{currentQuestionData.category}</h2> 
                    <p>congrats! you scored: <i class="fa-solid fa-coins"></i> {score}</p>
                    <p>your new total score: <i class="fa-solid fa-coins"></i> {score}</p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default Quiz;