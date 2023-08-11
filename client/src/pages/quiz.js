import React from 'react';
import { useState } from 'react';

const Quiz = () => {

    // setting default state
    const [selectCat, setSelectCat] = useState('23');
    // our api url
    let url = `https://opentdb.com/api.php?amount=10&category=${selectCat}&type=multiple`

    const fetchQuizData = () => {
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log('this should be history questions', data)
            })
    }




    return (
        <div className="feev__home">
            <h2>This is a quiz</h2>
        </div>
    );
};
export default Quiz;