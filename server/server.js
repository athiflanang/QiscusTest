const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

const PORT = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: `drkfb0ifx`,
  api_key: `274539168649744`,
  api_secret: `0dxx_glDpFolCYe2gC6NkIjkPZs`,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors({
  origin: ['http://localhost:5173'],
}));

app.use(express.json());

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');
    const base64url = `data:image/png;base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64url);
    res.status(200).send({ message: 'Image uploaded successfully!', url: result.secure_url });
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      res.status(500).send('Network error: Unable to reach Cloudinary.');
    } else {
      res.status(500).send('Failed to upload image.');
    }
  }
});

app.post('/uploadPdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const base64 = req.file.buffer.toString('base64');
    const base64url = `data:application/pdf;base64,${base64}`;

    const result = await cloudinary.uploader.upload(base64url, {
      resource_type: 'raw'
    });

    res.status(200).send({ message: 'PDF uploaded successfully!', url: result.secure_url });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).send('Failed to upload PDF.');
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (chatroom) => {

    const rooms = Array.from(socket.rooms);
    console.log(rooms);

    rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    socket.join(chatroom);
    console.log(`User joined room: ${chatroom}`);
  });

  socket.on('leaveRoom', (chatroom) => {
    socket.leave(chatroom);
    console.log(`User left room: ${chatroom}`);
  });

  socket.on('chatMessage', (msg) => {
    console.log(msg.user);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});