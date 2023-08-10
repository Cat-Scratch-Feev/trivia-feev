import React, { useEffect, useState } from 'react';

const LeaderBoard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data from your API or database
        // Replace this with your actual API or database call
        // TODO add api endpoint for quiz once it is set up 
        fetch('')
            .then(response => response.json())
            .then(data => {
                // Sort the users by score
                const sortedUsers = data.sort((user1, user2) => user2.score - user1.score);
                setUsers(sortedUsers);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);
    return (
        <div>
            <h2>Leaderboard</h2>
            <div className="leaderboard-container">
                {users.map((user, index) => (
                    <div key={user.id} className="user-entry">
                        <span className="rank">{index + 1}</span>
                        <span className="username">{user.name}</span>
                        <span className="score">{user.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderBoard;






