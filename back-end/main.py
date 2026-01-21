from flask import Flask, request, jsonify
from flask_cors import CORS
from faker import Faker
from faker_books import BookProvider  # type: ignore

app = Flask(__name__)
fake = Faker('it-IT')
fake.add_provider(BookProvider)
CORS(app)
data = []

n = 22
for i in range(n):
    libro = {
        'id': i,
        'titolo': fake.book_title(),
        'autore': fake.book_author(),
        'genere': fake.book_genre(),
        'anno': fake.year(),
        'isbn': fake.isbn13()
    }
    
    data.append(libro)

@app.route('/api/libri', methods=['GET'])
def get_libri():
    return jsonify(data)

@app.route('/api/libri', methods=['POST'])
def post_libri():
    
    nuovo_libro = request.get_json()
    max_id = 0

    if data :
        max_id = max(libro['id'] for libro in data)
    
    
    libro = {
        'id': max_id+1,
        'titolo': nuovo_libro['titolo'],
        'autore': nuovo_libro['autore'],
        'genere': nuovo_libro['genere'],
        'anno': nuovo_libro['anno'],
        'isbn': fake.isbn13()
    }
    
    data.append(libro)
    return jsonify(libro), 201

@app.route('/api/libri', methods=['DELETE'])
def delete_libri():
    data.clear()
    return jsonify({"msg": "Tutti i libri sono stati eliminati"}), 200

@app.route('/api/libri/<int:libro_id>', methods=['DELETE'])
def delete_libro(libro_id):
    global data
    lenght = len(data)
    for libro in data:
        if libro['id'] == libro_id:
            data.remove(libro)
            break
    
    if lenght == len(data):
        return jsonify({"error": "Libro non trovato"}), 404
        
    return jsonify({"msg": "Libro eliminato"}), 200

app.run("localhost", 11000, debug=True)