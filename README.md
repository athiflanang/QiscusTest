# Qiscus Technical Test

## Installation and Running Guide

### Frontend

1. **Navigate to the Frontend Directory:**

```sh
cd client
```

2. **Install Dependencies:**

```sh
npm install / npm i
```

3. **Run the Frontend:**

```sh
npm run dev
```

### Backend

1. **Navigate to the Backend Directory:**

```sh
cd server
```

2. **Install Dependencies:**

```sh
npm install / npm i
```

3. **Run the Backend:**

```sh
node server.js
```

### Testing Sending Images, Video, PDF

**Sending Images and Video:**

```sh
- join live chatroom
- click *images* button to upload images and video
- if successfully select an image or video, a preview will appear
- click button *send* to send image or video
```

**Sending PDF:**

```sh
- join live chatroom
- click *paperclip* button to upload PDF
- if successfully select an PDF, a preview will appear
- click button *send* to send the PDF
```

### Additional Steps

- Ensure you have Node.js and npm installed.
- Update any environment variables as needed.
- Check the documentation for any specific configuration requirements.
- Access the frontend via `http://localhost:5173` and the backend via `http://localhost:3001`.
