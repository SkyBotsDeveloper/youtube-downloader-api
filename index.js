const express = require('express');
const app = express();

// CRITICAL: Use Render's PORT or fallback
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// HEALTH CHECK - Render requires this
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    status: 'API Live on Render!',
    timestamp: new Date().toISOString(),
    creator: 'EliteSid (https://t.me/EliteSid)',
    endpoints: ['/?action=ping', '/?v=VIDEO_ID&action=info']
  });
});

app.get('/ping', (req, res) => {
  res.json({ 
    success: true, 
    status: 'OK', 
    uptime: '24/7',
    port: port
  });
});

app.get('/info', (req, res) => {
  const { v } = req.query;
  if (!v) return res.status(400).json({ error: 'Missing v=VIDEO_ID' });
  
  res.json({
    success: true,
    videoId: v,
    title: `Video ${v} - Ready for full yt-dlp VPS`,
    status: 'Demo version live!',
    next: 'Deploy VPS for 96% success rate'
  });
});

console.log(`🚀 Starting on port ${port}`);
app.listen(port, () => {
  console.log(`✅ API LIVE on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
