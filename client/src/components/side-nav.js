import React from 'react';
import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div className="sideNav__wrap mobile__hidden">
            <nav>
                <ul className="sideNav__list">
                    
                    <li><Link to="/"><i class="fa-solid fa-house"></i> home</Link></li>
                    
                    <li>
                        <p>
                        <Link to="/quizzes"><i class="fa-solid fa-list"></i> trivia </Link>
                        </p>
                        <div>
                        </div></li>
                    
                    <li><Link to="/leaderboard"><i class="fa-solid fa-trophy"></i> leaders</Link></li>
                </ul>
            
            </nav>
        </div>
    )
};
export default SideNav;
