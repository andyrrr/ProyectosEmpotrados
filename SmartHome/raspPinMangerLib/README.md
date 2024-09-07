Pablo Naranjo Monge
Fernando Monge Ramirez
Andy Ramirez Fonseca


## Control de GPIO en Linux

Este documento describe los pasos básicos para configurar y utilizar los pines GPIO (General Purpose Input/Output) en Linux.

### Pasos para Configurar y Utilizar GPIOs

1. **Exportar el Pin:**
   - Antes de usar un pin GPIO, es necesario exportarlo. Esto informa al sistema operativo que se desea utilizar ese pin específico.
   - Para exportar el pin, utiliza el siguiente comando:
     ```bash
     echo [PIN_NUMBER] > /sys/class/gpio/export
     ```
   - Reemplaza `[PIN_NUMBER]` con el número del pin GPIO que deseas usar.

2. **Configurar la Dirección del Pin:**
   - Después de exportar el pin, debes configurar su dirección como entrada (`in`) o salida (`out`).
   - Para configurar el pin como salida:
     ```bash
     echo out > /sys/class/gpio/gpio[PIN_NUMBER]/direction
     ```
   - Para configurar el pin como entrada:
     ```bash
     echo in > /sys/class/gpio/gpio[PIN_NUMBER]/direction
     ```

3. **Escribir en el Pin (si está configurado como salida):**
   - Si el pin está configurado como salida, puedes escribir valores en él (alto o bajo).
   - Para escribir un valor alto (1):
     ```bash
     echo 1 > /sys/class/gpio/gpio[PIN_NUMBER]/value
     ```
   - Para escribir un valor bajo (0):
     ```bash
     echo 0 > /sys/class/gpio/gpio[PIN_NUMBER]/value
     ```

4. **Leer del Pin (si está configurado como entrada):**
   - Si el pin está configurado como entrada, puedes leer su valor utilizando el siguiente comando:
     ```bash
     cat /sys/class/gpio/gpio[PIN_NUMBER]/value
     ```

5. **Desexportar el Pin (opcional):**
   - Cuando hayas terminado de usar el pin, puedes desexportarlo para liberar el recurso:
     ```bash
     echo [PIN_NUMBER] > /sys/class/gpio/unexport
     ```

