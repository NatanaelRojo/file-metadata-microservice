import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

dotenv.config();

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set up Multer storage and file filter
const upload = multer({
  storage: multer.memoryStorage(),  // Keep file in memory to avoid saving to disk
  limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, size, mimetype } = req.file;

  // Return file metadata
  res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
