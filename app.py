from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def maze_input():
    return render_template('memory_game.html')


if __name__ == '__main__':
    app.run()
