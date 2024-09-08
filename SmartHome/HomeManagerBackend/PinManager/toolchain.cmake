# toolchain.cmake

set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR arm)

# Especifica el compilador con la ruta completa
set(CMAKE_C_COMPILER /opt/poky/5.0.3/sysroots/x86_64-pokysdk-linux/usr/bin/arm-poky-linux-gnueabi/arm-poky-linux-gnueabi-gcc)

# Especifica el sysroot
set(CMAKE_SYSROOT /opt/poky/5.0.3/sysroots/cortexa7t2hf-neon-vfpv4-poky-linux-gnueabi)

# Opciones adicionales
set(CMAKE_C_FLAGS "-mthumb -mfpu=neon-vfpv4 -mfloat-abi=hard -mcpu=cortex-a7 -fstack-protector-strong -O2 -D_FORTIFY_SOURCE=2 -Wformat -Wformat-security -Werror=format-security -D_TIME_BITS=64 -D_FILE_OFFSET_BITS=64 --sysroot=${CMAKE_SYSROOT}")
set(CMAKE_CXX_FLAGS "${CMAKE_C_FLAGS}")

