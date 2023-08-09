import React from 'react';


const SideNav = () => {
    return (
        <div className="sideNav__wrap">
            <nav>
                <ul className="sideNav__list">
                    <li><i class="fa-solid fa-house"></i> home</li>
                    <li>
                        <p>
                                <i class="fa-solid fa-list"></i> trivia <i class="fa-solid fa-caret-down"type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample"></i>
                        </p>
                        <div>
                        <div class="collapse collapse-horizontal" id="collapseWidthExample">
                            <div class="card card-body">
                            This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                            {/* Eventually place links here */}
                            </div>
                        </div>
                        </div></li>
                    
                    <li><i class="fa-solid fa-trophy"></i> leaders</li>
                </ul>
            
            </nav>
        </div>
    )
};
export default SideNav;
