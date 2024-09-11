cmake_minimum_required (VERSION 2.6)
#define the project
project (home_pin_manager)

#add lib subdirectory to build
add_subdirectory (lib)

#include directories to building path
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/lib)

# add the executable
add_executable (pin_manager pin_manager.c)

#link against required libraries
target_link_libraries(pin_manager raspPinManagerLib cameraCaptureLib)

#install the binary
install (TARGETS pin_manager DESTINATION bin)

#package source generation
set(MAJOR "0")
set(MINOR "1")
set(PATCH "1")
set(CPACK_SOURCE_GENERATOR "TGZ")
set(CPACK_SOURCE_PACKAGE_FILE_NAME "${CMAKE_PROJECT_NAME}-${MAJOR}.${MINOR}.${PATCH}")
set(CPACK_SOURCE_IGNORE_FILES "/build/;${CPACK_SOURCE_IGNORE_FILES}")
include(CPack)
