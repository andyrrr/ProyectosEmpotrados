
from flask import Flask,jsonify,request
import subprocess
import json

app = Flask(__name__)

@app.route('/')
def hello_world():
	return 'Hola putos desde la rasp!'

lights = {"cuarto1":"1","cuarto2":"2","sala":"3","comedor":"4","cocina":"5","todas":"6"}


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
			return jsonify({'error': 'Failed to decode JSON', 'status': 'error'}), 500
        
        	# Devolver la salida JSON
		return jsonify(output), 200
    
	except subprocess.CalledProcessError as e:
        	# Manejar errores de ejecución del comando
		return jsonify({'error': str(e), 'status': 'error'}), 500
	return jsonify({'error': str(e), 'status': 'error'}), 500

@app.route('/putLight', methods=['PUT'])
def out_light():
	# Recibir el JSON enviado en el cuerpo de la solicitud
	item = request.json
    
	# Validar que el JSON tenga los campos necesarios
	if not all(k in item for k in ("nombre", "estado", "tipo")):
		return jsonify({'error': 'Invalid input, missing fields'}), 400
    
	nombre = item.get('nombre')
	estado = item.get('estado')
	command = ["./pin_manager","3",lights[nombre], str(estado)]
	print("Ejecutando:")
	print(command)	
	subprocess.run(command, capture_output=True, text=True, check=True)

	return "Ok", 200


def configPins():
	command = ["./pin_manager", "1"]
	subprocess.run(command)

if __name__ == '__main__':
	
	configPins()
	app.run(host='0.0.0.0', port=5000)

