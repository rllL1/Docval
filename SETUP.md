# FES Project - Setup Guide

## Prerequisites
Make sure you have Node.js installed and npm packages are installed:
```bash
npm install
```

## Running the Application

### Terminal 1: Start the Backend Server
```bash
npm run dev:server
```
This will start the Express server on `http://localhost:3001`

You should see:
```
🚀 Server running on http://localhost:3001
📍 Health check: GET http://localhost:3001/api/health
📁 File uploads will be stored in: ./uploads
```

### Terminal 2: Start the Next.js Frontend
```bash
npm run dev
```
This will start the Next.js app on `http://localhost:3000`

## Testing the Workflow

1. Open `http://localhost:3000` in your browser
2. Navigate to Dashboard → Files → Add New Entry
3. Fill in the form:
   - Reference No. (required)
   - Title (required)
   - Classification
   - Type of Documents
   - Sender Details
   - Upload a PDF file
4. Click "Next" button
5. The file will be processed and sent to the summary page

## Troubleshooting

If you get "Error processing file. Please try again.":

1. **Check Backend is Running**: Open a new terminal and run:
   ```bash
   curl http://localhost:3001/api/health
   ```
   You should get: `{"status":"OK","message":"Server is running"}`

2. **Check Node Modules**: Make sure all dependencies are installed:
   ```bash
   npm install multer pdf-parse
   ```

3. **Check Logs**: Look at the terminal where backend is running for error messages

4. **Port Already in Use**: If port 3001 is in use, change it:
   ```bash
   PORT=3002 npm run dev:server
   ```
   Then update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

## File Upload Limits
- Maximum file size: 10MB
- Supported formats: PDF, DOCX, DOC
- Uploads are stored in `./uploads` folder

## Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)
- `PORT` - Backend server port (default: 3001)
