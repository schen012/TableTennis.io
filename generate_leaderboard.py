import csv
from jinja2 import Template

# Load players from CSV
players = []
with open('players.csv', mode='r') as file:
    reader = csv.reader(file)
    next(reader)  # Skip header row
    for index, row in enumerate(reader):
        if row:  # Ensure there are no empty rows
            players.append({'position': index + 1, 'name': row[0]})

# Read the HTML template
with open('templates/index_template.html', 'r') as file:
    html_template = file.read()

# Generate HTML content
template = Template(html_template)
html_content = template.render(players=players)

# Save HTML content to a file
with open('index.html', 'w') as file:
    file.write(html_content)

print("Leaderboard has been generated and saved to index.html")
