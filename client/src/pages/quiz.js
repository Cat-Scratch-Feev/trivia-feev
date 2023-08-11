import React, { useState, useEffect } from 'react';

const Quiz = () => {
    // Setting default state
    const [selectCat, setSelectCat] = useState('24');
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
        // Move to the next question
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    // Data for current question
    const currentQuestionData = questions[currentQuestion];
    // Shuffles current data
    const shuffledAnswers = currentQuestionData ? shuffleArray([...currentQuestionData.incorrect_answers, currentQuestionData.correct_answer]) : [];



    return (
        <div className="feev__home">
            <h2>Quiz Title</h2>
            {questions.length > 0 && currentQuestionData ? (
                <>
                    <p>{currentQuestionData.question}</p>
                    <div className="option-holder">
                        {shuffledAnswers.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="option"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <p>This is the timer space</p>
                    <p>Score: {score}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default Quiz;