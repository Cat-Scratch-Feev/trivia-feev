import React from 'react';
import { useNavigate } from 'react-router-dom';

const Quizzes = ({quizState, setQuizState}) => {
    const navigate= useNavigate();
     //Handle user's category choice
    const handleCategoryChoiceClick= (value) => {
        //Save user's selected option to local storage for use on quiz page
        localStorage.setItem('selectedCategory', value.toString());
        //Set quiz state prior to routing to quiz page, ensure correct flow
        setQuizState('start');
        //Navigate user to quiz starting page on click
        navigate('/quiz');
    }
    return (
        <div className="feev__home">
            <div className="feev__trivia-select--wrap">
            <h2 className="trivia__page-title">trivia categories</h2>
            <p>pick a category!</p>
            <div className='trivia-card-holder'>
                <h3 className='group-title'>Human Civilization</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='24'  >
                        <span className="trivia__card--blue"></span>
                        <button onClick={() => handleCategoryChoiceClick('24')}>Politics</button>
                    </div>
                    <div className='trivia-choice-card' value='25'>
                        <span className="trivia__card--pink"></span>
                        <button onClick={() => handleCategoryChoiceClick('25')}>Art</button>
                    </div>
                    <div className='trivia-choice-card' value='22'>
                        <span className="trivia__card--yellow"></span>
                        <button onClick={() => handleCategoryChoiceClick('22')}>Geography</button>
                    </div>
                </div>
                <h3 className='group-title'>Entertainment</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='11'>
                        <span className="trivia__card--blue"></span>
                        <button onClick={() => handleCategoryChoiceClick('11')}>Film</button>
                    </div>
                    <div className='trivia-choice-card' value='12'>
                        <span className="trivia__card--pink"></span>
                        <button onClick={() => handleCategoryChoiceClick('12')}>Music</button>
                    </div>
                    <div className='trivia-choice-card' value='14'>
                        <span className="trivia__card--yellow"></span>
                        <button onClick={() => handleCategoryChoiceClick('14')}>TV</button>
                    </div>
                    <div className='trivia-choice-card' value='15'>
                        <span className="trivia__card--blue"></span>
                        <button onClick={() => handleCategoryChoiceClick('15')}>Video Games</button>
                    </div>
                    <div className='trivia-choice-card' value='10'>
                        <span className="trivia__card--pink"></span>
                        <button onClick={() => handleCategoryChoiceClick('10')}>Books</button>
                    </div>
                    <div className='trivia-choice-card' value='13'>
                        <span className="trivia__card--yellow"></span>
                        <button onClick={() => handleCategoryChoiceClick('13')}>Theatre</button>
                    </div>
                </div>
                <h3 className='group-title'>Science</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='17'>
                        <span className="trivia__card--blue"></span>
                        <button onClick={() => handleCategoryChoiceClick('17')}>General</button>
                    </div>
                    <div className='trivia-choice-card' value='27'>
                        <span className="trivia__card--pink"></span>
                        <button onClick={() => handleCategoryChoiceClick('27')}>Animals</button>
                    </div>
                    <div className='trivia-choice-card' value='18'>
                        <span className="trivia__card--yellow"></span>
                        <button onClick={() => handleCategoryChoiceClick('18')}>Computers</button>
                    </div>
                </div>
                <h3 className='group-title'>Misc.</h3>
                <div className='trivia-group'>
                    <div className='trivia-choice-card' value='21'>
                        <span className="trivia__card--blue"></span>
                        <button onClick={() => handleCategoryChoiceClick('21')}>Sports</button>
                    </div>
                    <div className='trivia-choice-card' value='20'>
                        <span className="trivia__card--pink"></span>
                        <button onClick={() => handleCategoryChoiceClick('20')}>Mythology</button>
                    </div>
                    <div className='trivia-choice-card' value='28'>
                        <span className="trivia__card--yellow"></span>
                        <button onClick={() => handleCategoryChoiceClick('28')}>Vehicles</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};
export default Quizzes;