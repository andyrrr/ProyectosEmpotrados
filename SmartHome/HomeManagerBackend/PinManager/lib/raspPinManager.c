#include <raspPinManager.h>


static int getPinValue(int pin){

	if (pin >= 0 && pin < 28){
		return pin+512; //Mapeo de los pines
	}
	else {
		return -1;
	}

}

void pinMode(int pin, int mode){
    int gpioPin = getPinValue(pin);
    if (gpioPin == -1) {
        printf("Pin no válido.\n");
        return;
    }

    char path[100];
    
    // Exportar el pin
    sprintf(path, "/sys/class/gpio/export");
    FILE *f = fopen(path, "w");
    if (f == NULL) {
        perror("Error abriendo el archivo de exportación");
        return;
    }
    fprintf(f, "%d", gpioPin);
    fclose(f);
    
    usleep(100000);  // 100 ms

    // Configurar la dirección del pin
    sprintf(path, "/sys/class/gpio/gpio%d/direction", gpioPin);
    f = fopen(path, "w");
    if (f == NULL) {
        perror("Error abriendo el archivo de dirección");
        return;
    }

    if (mode == OUTPUT) {
        fprintf(f, "out");
    } else if (mode == INPUT) {
        fprintf(f, "in");
    } else {
        printf("Modo no válido.\n");
    }

    fclose(f);
}

void digitalWrite(int pin, int value){
	
	int gpioPin = getPinValue(pin);
	if (gpioPin == -1) {
		printf("Pin no válido.\n");
		return;
	}

	char path[50];
	sprintf(path, "/sys/class/gpio/gpio%d/value", gpioPin);
	FILE *f = fopen(path, "w");
	if (f == NULL) {
		perror("Error abriendo el archivo de valor");
		return;
	}

	if (value == HIGH) {
		fprintf(f, "1");
    	} else if (value == LOW) {
		fprintf(f, "0");
	} else {
		printf("Valor no válido.\n");
	}
	fclose(f);

}

int digitalRead(int pin){
	int gpioPin = getPinValue(pin);
	if (gpioPin == -1) {
		printf("Pin no válido.\n");
		return -1;
	}
	
	char path[50];
	sprintf(path, "/sys/class/gpio/gpio%d/value", gpioPin);
	FILE *f = fopen(path, "r");
	if (f == NULL) {
		perror("Error abriendo el archivo de valor");
		return -1;
	}
	int value;
	fscanf(f, "%d", &value);
	fclose(f);
	return value;
}

void blink(int pin, int freq, int duration){

	int gpioPin = getPinValue(pin);
	if (gpioPin == -1) {
	printf("Pin no válido.\n");
	return;
	}

	int period = 1000000 / freq;  // Período en microsegundos

	for (int i = 0; i < duration * freq; i++) {
		digitalWrite(pin, HIGH);
		usleep(period / 2);
	       	digitalWrite(pin, LOW);
		usleep(period / 2);
	}
	return;
}


