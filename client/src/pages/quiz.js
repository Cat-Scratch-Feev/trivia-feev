import React, { useState, useEffect } from 'react';

const Quiz = () => {

    // Setting default state
    const [selectCat, setSelectCat] = useState('23');
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
    // Handle Click
    const handleOptionClick = selectedOption => {
        if (selectedOption === questions[currentQuestion].correct_answer) {
            setScore(score + 10);
        }
        // Move to the next question
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    // Data for current question
    const currentQuestionData = questions[currentQuestion];

    return (
        <div className="feev__home">
            <h2>Quiz Title</h2>
            <p>{currentQuestionData.question}</p>
            <div className="option-holder">
                {currentQuestionData.incorrect_answers.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="option"
                    >
                        {option}
                    </div>
                ))}
                <div
                    onClick={() => handleOptionClick(currentQuestionData.correct_answer)}
                    className="option"
                >
                    {currentQuestionData.correct_answer}
                </div>
            </div>
            <p>This is the timer space</p>
            <p>Score: {score}</p>
        </div>
    );
};
export default Quiz;