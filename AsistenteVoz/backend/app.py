
from flask import Flask,jsonify,request
import subprocess
import json
import os

app = Flask(__name__)

# Crea la carpeta "uploads" si no existe
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def hello_world():
	return 'Hola putos desde la rasp!'




def load_credentials(filename):
    credentials = {}
    with open(filename, 'r') as f:
        for line in f:
            user, hashed_password = line.strip().split(':')
            credentials[user] = hashed_password
    return credentials


@app.route('/upload', methods=['POST'])
def upload_file():
    # Verifica si la solicitud contiene el archivo
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    
    # Verifica si el archivo tiene un nombre y si es un archivo MP3
    if file.filename == '' or not file.filename.endswith('.mp3'):
        return jsonify({'error': 'El archivo seleccionado no es .MP3'}), 400

    # Guarda el archivo en la carpeta de uploads
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    return jsonify({'message': f'Archivo {file.filename} subido correctamente!'}), 200




if __name__ == '__main__':
	
	app.run(host='0.0.0.0', port=5000)

