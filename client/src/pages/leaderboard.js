import React, { useEffect, useState } from 'react';
import LeaderBoard from '../components/leaderboard.js';

// TODO work on front end styling of leaderboard page


const LeaderboardPage = () => {
    return (
        <div className="feev__leaderboard-page-wrap">
            <div className="feev__leaderboard-card">
                <div className="feev__leaderboard-message">
                    <h2>feev<span className="header__name--color">.io</span>'s leaderboard</h2>
                </div>
                <div className="feev__leaderboard-display">
                <LeaderBoard/>
                </div>
            </div>
        </div>
    )
}

export default LeaderboardPage;
