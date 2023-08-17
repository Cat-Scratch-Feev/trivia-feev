//  Working together on 16-Aug to build a functioning leaderboard
import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/client';
import {QUERY_SCORES} from '../utils/queries';

const LeaderBoard = () => {
    //const [users, setUsers] = useState([]);
    const {loading, error, data} = useQuery(QUERY_SCORES);
    //Add loading and error content to render if data isn't present
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const users = [...data.users];
    
    // Sort the users by score in descending order
    const sortedUsers = users.sort((user1, user2) => user2.score - user1.score);
    

    return (
        <div className="feev__leaderboard--component">
            {loading ? (
            <>Loading scoreboard data..</>
            ) : (
            <div className="feev__leaderboard-container">
                {sortedUsers.slice(0,3).map((user, index) => (
                    <div key={user.username} className="user-entry">
                        <span className="feev__leaderboard--username">{user.username}</span>
                        <div className={`rank rank${index + 1}`}>
                            <i className="highscore__icon fa-solid fa-coins"></i>
                            <span className="highscore__score">{user.score}</span>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default LeaderBoard;






