import React from 'react';


const Header = () => {
    return (
        <div className="header__wrap">
            <div className="name__wrap header__name">
                <i className="fa-solid fa-cat header__name--icon"></i>
                <h1 className="header__name--title">feev<span className="header__name--color">.io</span></h1> 
            </div>
           <div className="dropdown">
                <button className="btn  dropdown-toggle user__nav--button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-user"></i>
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><i class="fa-solid fa-gear"></i> settings</a></li>
                    <li><a className="dropdown-item" href="#"><i class="fa-solid fa-arrow-right-from-bracket"></i> sign out</a></li>
                </ul>
            </div>
        </div>
    )
};
export default Header;
