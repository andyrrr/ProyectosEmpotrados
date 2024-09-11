
from flask import Flask,jsonify,request
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hola putos desde la rasp!'

lights = {"cuarto1":"1","cuarto2":"2","sala":"3","comedor":"4","cocina":"5","todas":"6"}


def custom_hash(password):
    # Simple hash function (for demonstration purposes)
    hash_value = 0
    for char in password:
        hash_value = (hash_value * 31 + ord(char)) & 0xFFFFFFFF  # Basic hash with 32-bit overflow
    return f'{hash_value:08x}'  # Return as a zero-padded hex string

def load_credentials(filename):
    credentials = {}
    with open(filename, 'r') as f:
        for line in f:
            user, hashed_password = line.strip().split(':')
            credentials[user] = hashed_password
    return credentials

@app.route('/login/<username>/<password>', methods=['GET'])
def login(username, password):
    credentials = load_credentials('credentials.txt')
    
    if username not in credentials:
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Hash the provided password using the custom hash function
    hashed_password = custom_hash(password)
    
    if credentials[username] == hashed_password:
        return jsonify({'message': 'Login successful'}), 200,{'Access-Control-Allow-Origin':'*'}
    else:
        return jsonify({'message': 'Invalid username or password'}), 400, {'Access-Control-Allow-Origin':'*'}


@app.route('/getStatus')
def get_status():
	command = ["./pin_manager", "2"]
	try:
        	# Ejecutar el comando y capturar la salida
		result = subprocess.run(command, capture_output=True, text=True, check=True)
		print(result)        
       		# Intentar interpretar la salida como JSON
		try:
			output = json.loads(result.stdout.strip())
		
		except json.JSONDecodeError:
			return jsonify({'error': 'Failed to decode JSON', 'status': 'error'}), 500, {'Access-Control-Allow-Origin':'*'}
        
        	# Devolver la salida JSON
		return jsonify(output), 200, {'Access-Control-Allow-Origin':'*'}
    
	except subprocess.CalledProcessError as e:
        	# Manejar errores de ejecución del comando
		return jsonify({'error': str(e), 'status': 'error'}), 500, {'Access-Control-Allow-Origin':'*'}
	return jsonify({'error': str(e), 'status': 'error'}), 500, {'Access-Control-Allow-Origin':'*'}


@app.route('/putLight/<nombre>/<estado>', methods=['GET'])
def out_light(nombre, estado):
    # Validar que los parámetros existan
    if not nombre or not estado:
        return make_cors_response(jsonify({'error': 'Invalid input, missing fields'}), 500)
    
    command = ["./pin_manager", "3", lights[nombre], str(estado)]
    print("Ejecutando:")
    print(command)
    subprocess.run(command, capture_output=True, text=True, check=True)
    
    return get_status()




def configPins():
	command = ["./pin_manager", "1"]
	subprocess.run(command)

if __name__ == '__main__':
	
	configPins()
	app.run(host='0.0.0.0', port=5000)

