import React, { useState, useEffect } from 'react';

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
    }, [])
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
        if (selectedOption === currentQuestionData?.correct_answer) {
            setScore(score + 10);
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
    // Shuffles current data
    const shuffledAnswers = currentQuestionData ? shuffleArray([...currentQuestionData.incorrect_answers, currentQuestionData.correct_answer]) : [];

    const handleStartQuiz = () => {
        //Transition to the quiz state when the start button is clicked
        setQuizState('quiz');
    }

    return (
        <div className="feev__home">
            {quizState === 'start' && (
                <div>test
                    <button onClick={handleStartQuiz}>start</button>
                </div>
                
            )}
            {quizState === 'quiz' && questions.length > 0 && currentQuestionData ?  (
                <>
                    <h2>{currentQuestionData.category}</h2>
                    <p>{currentQuestionData.question}</p>
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
                    <p>This is the timer space</p>
                    <p>Score: {score}</p>
                </>
            ) : (
                <></>
            )}
            {quizState === 'end' &&(
                <div>
                    <p>final score: {score}</p>
                </div>
            )}
        </div>
    );
};
export default Quiz;