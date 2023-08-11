import React from 'react';
import { useState } from 'react';
const Quizzes = () => {

    return (
        <div className="feev__home">
            <h2>Pick a Category</h2>
            <div className='trivia-card-holder'>
                <h3 className='group-title'>Human Civilization</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='24'>Politics</div>
                    <div className='trivia-choice-card' value='25'>Art</div>
                    <div className='trivia-choice-card' value='22'>Geography</div>
                </div>
                <h3 className='group-title'>Entertainment</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='11'>Film</div>
                    <div className='trivia-choice-card' value='12'>Music</div>
                    <div className='trivia-choice-card' value='14'>TV</div>
                    <div className='trivia-choice-card' value='15'>Video Games</div>
                    <div className='trivia-choice-card' value='10'>Books</div>
                    <div className='trivia-choice-card' value='13'>Theatre</div>
                </div>
                <h3 className='group-title'>Science</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='17'>General</div>
                    <div className='trivia-choice-card' value='27'>Animals</div>
                    <div className='trivia-choice-card' value='18'>Computers</div>
                </div>
                <h3 className='group-title'>Misc.</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='21'>Sports</div>
                    <div className='trivia-choice-card' value='20'>Mythology</div>
                    <div className='trivia-choice-card' value='28'>Vehicles</div>
                </div>
            </div>
        </div>
    );
};
export default Quizzes;