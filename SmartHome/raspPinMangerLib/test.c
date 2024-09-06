#include <raspPinManager.h>
#include <stdio.h>
int main(int argc, char const *argv[]){

	pinMode(6, OUTPUT);
	pinMode(5, OUTPUT);
	pinMode(26, INPUT);
	
	digitalWrite(6, HIGH);
	int pin26_value = digitalRead(26);

	printf("Pin 26 value: %d \n", pin26_value);
	
	blink(5, 1, 5);
	
	return 0;
}
