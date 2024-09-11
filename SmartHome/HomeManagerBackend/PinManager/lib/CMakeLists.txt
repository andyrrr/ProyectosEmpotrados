# Añadir directorios de inclusión
#include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../include)

# Definir el nombre de la biblioteca y los archivos fuente
#set(LIBRARY_NAME raspPinManagerLib)
#set(SRC_FILES raspPinManager.c)

# Crear la biblioteca compartida
#add_library(${LIBRARY_NAME} STATIC ${SRC_FILES})

# Instalar la biblioteca y los archivos de encabezado
#install(TARGETS ${LIBRARY_NAME} DESTINATION lib)
#install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/../include/raspPinManager.h DESTINATION include)









# Añadir directorios de inclusión
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../include)

# Definir el nombre de la biblioteca y los archivos fuente para raspPinManagerLib
set(RASPPINMANAGER_LIBRARY_NAME raspPinManagerLib)
set(RASPPINMANAGER_SRC_FILES raspPinManager.c)

# Crear la biblioteca compartida raspPinManagerLib
add_library(${RASPPINMANAGER_LIBRARY_NAME} STATIC ${RASPPINMANAGER_SRC_FILES})

# Definir el nombre de la biblioteca y los archivos fuente para cameraCaptureLib
set(CAMERACAPTURE_LIBRARY_NAME cameraCaptureLib)
set(CAMERACAPTURE_SRC_FILES camera_capture.c)

# Crear la biblioteca compartida cameraCaptureLib
add_library(${CAMERACAPTURE_LIBRARY_NAME} STATIC ${CAMERACAPTURE_SRC_FILES})

# Instalar la biblioteca y los archivos de encabezado para raspPinManagerLib
install(TARGETS ${RASPPINMANAGER_LIBRARY_NAME} DESTINATION lib)
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/../include/raspPinManager.h DESTINATION include)

# Instalar la biblioteca y los archivos de encabezado para cameraCaptureLib
install(TARGETS ${CAMERACAPTURE_LIBRARY_NAME} DESTINATION lib)
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/../include/camera_capture.h DESTINATION include)

