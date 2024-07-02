import csv

def update_csv(winner, loser):
    players = []
    with open('players.csv', mode='r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header row
        for row in reader:
            if row:
                players.append(row[0])
    
    winner_index = players.index(winner)
    loser_index = players.index(loser)
    
    if winner_index > loser_index:
        # Swap positions
        players[winner_index], players[loser_index] = players[loser_index], players[winner_index]
    
    with open('players.csv', mode='w') as file:
        writer = csv.writer(file)
        writer.writerow(['name'])
        for player in players:
            writer.writerow([player])

    print("Challenge processed and CSV updated.")

if __name__ == "__main__":
    import cgi
    form = cgi.FieldStorage()
    winner = form.getvalue('winner')
    loser = form.getvalue('loser')
    if winner and loser:
        update_csv(winner, loser)
