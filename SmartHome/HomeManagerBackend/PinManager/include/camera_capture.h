#ifndef CAMERA_CAPTURE_H
#define CAMERA_CAPTURE_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
#include <sys/ioctl.h>
#include <linux/videodev2.h>
#include <sys/mman.h>

// Función para inicializar la cámara
int init_camera(const char *device, int width, int height, int pixelformat);

// Función para capturar una imagen
int capture_image(const char *filename);

// Función para liberar los recurso
void close_camera();

//Toma una foto :)
void take_picture(const char *device, int width, int height, int pixelformat, char *filename);

#endif // CAMERA_CAPTURE_H

