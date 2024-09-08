#include <raspPinManager.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define JSON_BUFF_SIZE 	1024
#define LIGHT_STATE_FILE "ligh_state.bin"

//Luces
#define L_PIN_CUARTO_1	26
#define L_PIN_CUARTO_2 	19
#define L_PIN_SALA	13
#define L_PIN_COMEDOR	6
#define L_PIN_COCINA	5

//Puertas
#define P_PIN_DELANTERA	0
#define P_PIN_TRASERA	11
#define P_PIN_CUARTO_1	9
#define P_PIN_CUARTO_2	10


// Función para guardar un array en formato binario
void save_array_binary(const char *filename, int *array, size_t size) {
	FILE *file = fopen(filename, "wb"); // Abrir archivo en modo binario
    	if (file != NULL) {
        	fwrite(array, sizeof(int), size, file); // Escribir el array al archivo
        	fclose(file);
    	} else {
        	perror("Error al abrir el archivo para guardar");
    }
}

// Función para cargar un array desde un archivo binario
void load_array_binary(const char *filename, int *array, size_t size) {
	FILE *file = fopen(filename, "rb"); // Abrir archivo en modo lectura binaria
	if (file != NULL) {
		fread(array, sizeof(int), size, file); // Leer el array del archivo
		fclose(file);
	} else {
		perror("Error al abrir el archivo para cargar");
	}
}

//Configura todos los pines necesarios, ya sea a out o in
void configPins(){
	
	//Luces 
	pinMode(L_PIN_CUARTO_1,		OUTPUT);
	pinMode(L_PIN_CUARTO_2,		OUTPUT);
	pinMode(L_PIN_SALA,		OUTPUT);
	pinMode(L_PIN_COMEDOR,		OUTPUT);
	pinMode(L_PIN_COCINA,		OUTPUT);

	//Puertas
	pinMode(P_PIN_DELANTERA,	INPUT);
	pinMode(P_PIN_TRASERA,		INPUT);
	pinMode(P_PIN_CUARTO_1,		INPUT);
	pinMode(P_PIN_CUARTO_2,		INPUT);


}

//Retorna en forma de json el status de toda la casa
char* getHouseStatus(int *light_array){

	load_array_binary(LIGHT_STATE_FILE, light_array, 5);
	
	int l_cuarto_1	= light_array[0]; 
	int l_cuarto_2	= light_array[1];
	int l_comedor   = light_array[2];
	int l_sala 	= light_array[3];
	int l_cocina	= light_array[4];

	int p_delantera = digitalRead(P_PIN_DELANTERA);
	int p_trasera	= digitalRead(P_PIN_TRASERA);
	int p_cuarto_1 	= digitalRead(P_PIN_CUARTO_1);
	int p_cuarto_2	= digitalRead(P_PIN_CUARTO_2);

	char* json_result = (char *)malloc(JSON_BUFF_SIZE);

	snprintf(json_result, JSON_BUFF_SIZE,
			 "[\n"
			 "  {\"nombre\": \"Cuarto 1\", \"estado\": \"%d\", \"tipo\": \"luz\"},\n"
			 "  {\"nombre\": \"Cuarto 2\", \"estado\": \"%d\", \"tipo\": \"luz\"},\n"
			 "  {\"nombre\": \"Comedor\", \"estado\": \"%d\", \"tipo\": \"luz\"},\n"
			 "  {\"nombre\": \"Sala\", \"estado\": \"%d\", \"tipo\": \"luz\"},\n"
			 "  {\"nombre\": \"Cocina\", \"estado\": \"%d\", \"tipo\": \"luz\"},\n"
			 "  {\"nombre\": \"Delantera\", \"estado\": \"%d\", \"tipo\": \"puerta\"},\n"
			 "  {\"nombre\": \"Trasera\", \"estado\": \"%d\", \"tipo\": \"puerta\"},\n"
			 "  {\"nombre\": \"Puerta Cuarto 1\", \"estado\": \"%d\", \"tipo\": \"puerta\"},\n"
			 "  {\"nombre\": \"Puerta Cuarto 2\", \"estado\": \"%d\", \"tipo\": \"puerta\"}\n"
			 "]",
			l_cuarto_1, l_cuarto_2, l_comedor, l_sala, l_cocina,
        		p_delantera, p_trasera, p_cuarto_1, p_cuarto_2);

	return json_result;


}

void set_light(int num_light, int state, int *light_array) {

	load_array_binary(LIGHT_STATE_FILE, light_array, 5);	

	if (num_light <= 5){
		light_array[num_light-1] = state;
	}
	else {
	
		for (int i = 0; i<5; i++){
			light_array[i] = state;
		}

	}

	switch (num_light){
	
		case 1: //Cuarto 1
			digitalWrite(L_PIN_CUARTO_1,	state);
			break;
		
		case 2: //Cuarto 2
			digitalWrite(L_PIN_CUARTO_2,	state);
			break;
		
		case 3: //Sala
			digitalWrite(L_PIN_SALA,	state);
			break;
		
		case 4: //Comedor
			digitalWrite(L_PIN_COMEDOR,	state);
			break;
		
		case 5: //Cocina
			digitalWrite(L_PIN_COCINA,	state);
			break;
		
		case 6: //Todos
			digitalWrite(L_PIN_CUARTO_1,	state);
			digitalWrite(L_PIN_CUARTO_2,	state);
			digitalWrite(L_PIN_SALA,	state);
			digitalWrite(L_PIN_COMEDOR,     state);
			digitalWrite(L_PIN_COCINA,      state);
			break;	
		default:
			break;
	
	}

	save_array_binary(LIGHT_STATE_FILE, light_array, 5);
}



int main(int argc, char *argv[]){

	if (argc < 2){
		printf("No args \n");
		return 1;
	}

	int option = atoi(argv[1]);
	int light_array [5] = {0, 0, 0, 0, 0};

	switch (option){
	
		case 1: // Configurar pines
			configPins(light_array);
			save_array_binary(LIGHT_STATE_FILE,light_array,5);
			break;
		
		case 2: // Status de toda la casa
			char *status = getHouseStatus(light_array);
			printf("%s", status);
			break;
		
		case 3: // Manejar luces
			int num_light 	= (argc < 4)? 0 : atoi(argv[2]);
			int state 	= (argc < 4)? 0 : atoi(argv[3]);

			set_light(num_light,state,light_array);
			break;
		default:
			printf("def");
			break;
	
	}
	
	return 0;
}

