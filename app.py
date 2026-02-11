from flask import Flask, render_template
import random

app = Flask(__name__)


@app.route("/")
def index():
    # Definimos los elementos de las cartas (20 tipos distintos para 40 cartas total)
    numeros = ["1", "2", "3", "4", "5", "6"]
    letras = ["A", "B", "C", "D", "E", "F", "G"]
    # Usamos Emojis para las figuras para facilitar el visualizado sin imágenes externas
    figuras = ["🐴", "⭐", "🌙", "🍎", "🚗", "👻", "🌵"]

    # Unimos todo (Total 20 elementos)
    elementos = numeros + letras + figuras

    # Duplicamos para hacer parejas (Total 40 cartas)
    baraja = elementos * 2

    # Barajamos aleatoriamente
    random.shuffle(baraja)

    # Enviamos la baraja mezclada al HTML
    return render_template("index.html", baraja=baraja)


if __name__ == "__main__":
    app.run(debug=True)
