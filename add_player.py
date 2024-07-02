import csv

def add_player(new_player):
    with open('players.csv', mode='a') as file:
        writer = csv.writer(file)
        writer.writerow([new_player])

    print("New player added to CSV.")

if __name__ == "__main__":
    import cgi
    form = cgi.FieldStorage()
    new_player = form.getvalue('new-player')
    if new_player:
        add_player(new_player)
