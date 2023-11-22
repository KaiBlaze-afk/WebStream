const express = require('express');
const multer = require('multer');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up a route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Set up a route to handle POST requests with video frames
app.post('/', upload.single('image'), (req, res) => {
    // Process the received data as needed
    const somekeyValue = req.body.somekey;
    const imageBuffer = req.file.buffer;

    // Broadcast the image data to all connected clients using socket.io
    io.emit('image', imageBuffer);

    // Send a response
    res.status(200).send('Data received successfully!');
});

// Set up socket.io event handling
io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
