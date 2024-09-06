# Añadir directorios de inclusión
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/../include)

# Definir el nombre de la biblioteca y los archivos fuente
set(LIBRARY_NAME raspPinManagerLib)
set(SRC_FILES raspPinManager.c)

# Crear la biblioteca compartida
add_library(${LIBRARY_NAME} STATIC ${SRC_FILES})

# Instalar la biblioteca y los archivos de encabezado
install(TARGETS ${LIBRARY_NAME} DESTINATION lib)
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/../include/raspPinManager.h DESTINATION include)

