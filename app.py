from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Datos falsos
PRODUCTS = [
    {"id": 1, "name": "Laptop", "price": 1200},
    {"id": 2, "name": "Phone", "price": 800},
    {"id": 3, "name": "Headphones", "price": 150},
]

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html", products=PRODUCTS)

@app.route("/product/<int:pid>")
def detail(pid):
    product = next((p for p in PRODUCTS if p["id"] == pid), None)
    return render_template("detail.html", product=product)

if __name__ == "__main__":
    app.run(debug=True)
