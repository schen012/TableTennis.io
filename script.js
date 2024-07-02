document.addEventListener('DOMContentLoaded', () => {
    const leaderboardTable = document.getElementById('leaderboard').querySelector('tbody');
    const challengeForm = document.getElementById('challenge-form');
    const addPlayerForm = document.getElementById('add-player-form');
    const players = [];

    // Load players from CSV
    fetch('players.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1);
            rows.forEach((row, index) => {
                const [name] = row.split(',');
                players.push({ position: index + 1, name });
            });
            updateLeaderboard();
        });

    // Update leaderboard table
    function updateLeaderboard() {
        leaderboardTable.innerHTML = '';
        players.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.position}</td>
                <td>${player.name}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    }

    // Handle challenge submission
    challengeForm.addEventListener('submit', event => {
        event.preventDefault();
        const winnerName = challengeForm.winner.value;
        const loserName = challengeForm.loser.value;

        const winnerIndex = players.findIndex(player => player.name === winnerName);
        const loserIndex = players.findIndex(player => player.name === loserName);

        if (winnerIndex !== -1 && loserIndex !== -1 && winnerIndex > loserIndex) {
            // Swap positions
            [players[winnerIndex], players[loserIndex]] = [players[loserIndex], players[winnerIndex]];
            players.forEach((player, index) => player.position = index + 1);
            updateLeaderboard();
        } else {
            alert('Invalid challenge. Make sure both players exist and the winner is below the loser in the leaderboard.');
        }
    });

    // Handle adding a new player
    addPlayerForm.addEventListener('submit', event => {
        event.preventDefault();
        const newPlayerName = addPlayerForm['new-player'].value;
        players.push({ position: players.length + 1, name: newPlayerName });
        updateLeaderboard();
    });
});
