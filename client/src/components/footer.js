import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer__wrap">
            <div className="footer__name--wrap">
            
                <div className="name__wrap footer__name">
                    <i className="fa-solid fa-cat footer__name--icon"></i>
                    <Link to="/"><h4 className="footer__name--title">feev<span className="header__name--color">.io</span></h4></Link> 
                </div> 
                <a href="https://github.com/Cat-Scratch-Feev/trivia-feev" target="_blank"><i className="footer__icon fa-brands fa-github"></i></a>
           
            </div>
            
            <hr className="footer__break"></hr>
            <small className="footer__small">©2023 cat-scratch feev | © feev.io</small>
        </footer>
    )
};

export default Footer;