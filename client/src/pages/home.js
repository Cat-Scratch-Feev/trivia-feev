import React from 'react';
import {Link} from 'react-router-dom';



function Home() {
    return (
        <div className="feev__home">

            <div className='greet-bg'>

                <p className='user-greeting'>Welcome, User! </p>
                <p className='score'>Score: 1200 Points
                 

                    <i className=" fa-solid fa-coins">
                    
                    </i> 
                
                </p>


            </div>

        </div>
    );
}
export default Home;