# Container Info

A web server that returns useful diagnostics info from inside a container.

## Features

The following information is returned:

*   **CPU Information**: Details about the CPUs of the host node.
*   **Memory Information**: Free and total memory of the host node, and memory usage of the process.
*   **cgroup Information**: Memory and CPU cgroup info.
*   **User Information**: The username of the current user.
*   **Environment Variables**: All environment variables of the process.
*   **Heap Information**: V8 heap statistics.
*   **Process ID**: The PID of the process.
*   **Product Name**: The product name of the machine.
*   **Disk Space**: Information about the disk space of a given path.

## Usage

The application starts a web server on port 8080.

### Get machine information

Send a GET request to the root of the server to get all the machine information.

```bash
curl http://localhost:8080/
```

### Get Disk Space Information for a specific path

You can get the disk space information for a specific path by sending a GET request to the desired path.

For example, to get the disk space information for the `/tmp` directory, send a GET request to `/tmp`:

```bash
curl http://localhost:8080/tmp
```