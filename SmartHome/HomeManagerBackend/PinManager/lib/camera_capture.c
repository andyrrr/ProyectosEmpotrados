#include "camera_capture.h"

static int fd = -1;
static void* buffer_start = NULL;
static size_t buffer_length = 0;

int init_camera(const char *device, int width, int height, int pixelformat) {
    fd = open(device, O_RDWR);
    if (fd == -1) {
        perror("Opening video device");
        return -1;
    }

    struct v4l2_format fmt;
    memset(&fmt, 0, sizeof(fmt));
    fmt.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    fmt.fmt.pix.width = width;
    fmt.fmt.pix.height = height;
    fmt.fmt.pix.pixelformat = pixelformat;
    fmt.fmt.pix.field = V4L2_FIELD_NONE;

    if (ioctl(fd, VIDIOC_S_FMT, &fmt) == -1) {
        perror("Setting Pixel Format");
        close(fd);
        return -1;
    }

    struct v4l2_requestbuffers req;
    memset(&req, 0, sizeof(req));
    req.count = 1;
    req.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    req.memory = V4L2_MEMORY_MMAP;

    if (ioctl(fd, VIDIOC_REQBUFS, &req) == -1) {
        perror("Requesting Buffer");
        close(fd);
        return -1;
    }

    struct v4l2_buffer buf;
    memset(&buf, 0, sizeof(buf));
    buf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    buf.memory = V4L2_MEMORY_MMAP;
    buf.index = 0;

    if (ioctl(fd, VIDIOC_QUERYBUF, &buf) == -1) {
        perror("Querying Buffer");
        close(fd);
        return -1;
    }

    buffer_length = buf.length;
    buffer_start = mmap(NULL, buf.length, PROT_READ | PROT_WRITE, MAP_SHARED, fd, buf.m.offset);
    if (buffer_start == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return -1;
    }
    
    printf("%d",fd);

    return 0;
}

int capture_image(const char *filename) {

    if (fd == -1) {
        fprintf(stderr, "Camera not initialized\n");
        return -1;
    }

    struct v4l2_buffer buf;
    memset(&buf, 0, sizeof(buf));
    buf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    buf.memory = V4L2_MEMORY_MMAP;
    buf.index = 0;

    if (ioctl(fd, VIDIOC_QBUF, &buf) == -1) {
        perror("Query Buffer");
        return -1;
    }

    if (ioctl(fd, VIDIOC_STREAMON, &buf.type) == -1) {
        perror("Start Capture");
        return -1;
    }

    if (ioctl(fd, VIDIOC_DQBUF, &buf) == -1) {
        perror("Retrieving Frame");
        return -1;
    }

    FILE* file = fopen(filename, "wb");
    if (file == NULL) {
        perror("Cannot open image file to save");
        return -1;
    }

    fwrite(buffer_start, buf.bytesused, 1, file);
    fclose(file);

    if (ioctl(fd, VIDIOC_STREAMOFF, &buf.type) == -1) {
        perror("Stop Capture");
        return -1;
    }

    return 0;
}

void close_camera() {
    if (buffer_start != NULL) {
        munmap(buffer_start, buffer_length);
        buffer_start = NULL;
    }

    if (fd != -1) {
        close(fd);
        fd = -1;
    }
}

void take_picture(const char *device, int width, int height, int pixelformat, char *filename){
	init_camera(device, width, height, pixelformat);
	capture_image(filename);

	close_camera();

	return 0;

}

