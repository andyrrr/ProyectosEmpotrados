cmake_minimum_required (VERSION 2.6)
#define the project
project (test_gpio)

#add lib subdirectory to build
add_subdirectory (lib)

#include directories to building path
include_directories(/home/naranjo/Documentos/2S2023/Empotrados/ProyectosEmpotrados/SmartHome/raspPinMangerLib/include)
include_directories(/home/naranjo/Documentos/2S2023/Empotrados/ProyectosEmpotrados/SmartHome/raspPinMangerLib/lib)

# add the executable
add_executable (test test.c)

#link against required libraries
target_link_libraries(test raspPinManagerLib)

#install the binary
install (TARGETS test DESTINATION bin)

#package source generation
set(MAJOR "0")
set(MINOR "1")
set(PATCH "1")
set(CPACK_SOURCE_GENERATOR "TGZ")
set(CPACK_SOURCE_PACKAGE_FILE_NAME "${CMAKE_PROJECT_NAME}-${MAJOR}.${MINOR}.${PATCH}")
set(CPACK_SOURCE_IGNORE_FILES "/build/;${CPACK_SOURCE_IGNORE_FILES}")
include(CPack)
