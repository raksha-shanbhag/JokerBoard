from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
ma = Marshmallow(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Password1@localhost:3306/notesdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Notes(db.Model): 
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, content):
        self.title = title
        self.content = content


class NotesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content', 'date') 

note_schema = NotesSchema()
notes_schema = NotesSchema(many=True)        

@app.route('/get', methods = ['GET'])
def get_notes():
    all_notes = Notes.query.all()
    results = notes_schema.dump(all_notes)

    return jsonify(results)

@app.route('/add', methods = ['POST'])
def add_notes():
    title = request.json['title']
    content = request.json['content']
    note = Notes(title, content)

    db.session.add(note)
    db.session.commit()

    return note_schema.jsonify(note)


@app.route('/update/<id>/', methods = ['PUT'])
def update_notes(id):
    note = Notes.query.get(id)
    note.title = request.json['title']
    note.content = request.json['content']

    db.session.commit()
    return note_schema.jsonify(note)

@app.route('/delete/<id>/', methods = ['DELETE'])
def delete_notes(id):
    note = Notes.query.get(id)
    db.session.delete(note)
    db.session.commit()

    return note_schema.jsonify(note)

if __name__ == '__main__' :
    app.run(debug = True)