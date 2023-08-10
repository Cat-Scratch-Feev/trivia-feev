import React from 'react';
import landingImage from "../assets/feev-landing-image.png";
const Landing = () => {
    return (
        <div className="feev__landing-page">
            <div className="feev__landing-main-wrap">
                <div classname="feev__landing-main-figure">
                    <img src={landingImage} alt="A simple graphic of two blurbs with question icons"></img>
                </div>
                <div className="feev__landing-main__blurb">
                    <div className="name__wrap feev__landing--title">
                        <h2 className="header__name--title "> why feev<span className="header__name--color">.io</span>
                        ?</h2>
                    </div>
                    <div className="feev__landing-main__text">
                        <p>showing off your niche knowledge is difficult....</p>
                        <p>test your skills with our extensive range of trivia categories and challenging questions!</p>
                        <p>put your knowledge to the test and aim for the high score - because what else is the point to knowing so much?</p>
                    </div>
                </div>
            </div>
            <div className="feev__landing-secondary--wrap">
                <h3 className="feev__landing-secondary--title">how does it work?</h3>
                <section className="feev__landing-secondary-cards">
                    <div className="feev__landing--card">
                        <h3 className="feev__landing-card--title">join</h3>
                        <i className="feev__landing-card--icon feev__landing-card--join fa-solid fa-right-to-bracket"></i>
                        <p>join our users and choose from our selection of quizzes!</p>
                    </div>
                    <div className="feev__landing--card">
                        <h3 className="feev__landing-card--title">quiz</h3>
                        <i className="feev__landing-card--icon feev__landing-card--watch fa-solid fa-stopwatch"></i>
                        <p>quiz from any of our categories!</p>
                    </div>
                    <div className="feev__landing--card">
                        <h3 className="feev__landing-card--title">score!</h3>
                        <i className="feev__landing-card--icon feev__landing-card--trophy fa-solid fa-trophy"></i>
                        <p>gain scores and compete, show off your trivia skills!</p>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default Landing;