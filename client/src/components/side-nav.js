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
                        <Link to="/quizzes"><i class="fa-solid fa-list"></i> trivia </Link><i class="fa-solid fa-caret-down"type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"></i>
                        </p>
                        <div>
                        <div class="collapse collapse-horizontal" id="collapseWidthExample">
                            <div class="card card-body">
                            This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                            {/* Eventually place links here */}
                            </div>
                        </div>
                        </div></li>
                    
                    <li><Link to="/leaderboard"><i class="fa-solid fa-trophy"></i></Link> leaders</li>
                </ul>
            
            </nav>
        </div>
    )
};
export default SideNav;
