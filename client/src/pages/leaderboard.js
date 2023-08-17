import React, { useEffect, useState } from 'react';
import LeaderBoard from '../components/leaderboard.js';

// TODO work on front end styling of leaderboard page


const LeaderboardPage = () => {
    return (
        <div className="feev__leaderboard-page-wrap">
           <div className="feev__leaderboard-wrap">
            <div className="feev__leaderboard-card">
                <p className="feev__leaderboard-message">All Time Leaderboard: </p>
                <LeaderBoard/>
            </div>
           </div>
        </div>
    )
}

export default LeaderboardPage;
