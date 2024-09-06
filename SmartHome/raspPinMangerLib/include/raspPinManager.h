#include <stdio.h>

#define OUTPUT 10
#define INPUT 20

#define HIGH 1
#define LOW 0



void pinMode(int pin, int mode);

void digitalWrite(int pin, int value);

int digitalRead(int pin);

void blink(int pin, int freq, int duration);


