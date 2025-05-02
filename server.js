const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files like index.html and images
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MemePicks frontend served at: http://localhost:${PORT}`);
});
