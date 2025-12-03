const express = require('express');
const ytdl = require('@ybd-project/ytdl-core');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const { v, action } = req.query;
  
  if (action === 'ping') {
    return res.json({ success: true, status: 'OK', creator: 'EliteSid' });
  }
  
  if (!v) {
    return res.status(400).json({ error: 'Missing video ID (v=)' });
  }
  
  try {
    const info = await ytdl.getInfo(v);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    
    if (action === 'info') {
      res.json({
        success: true,
        data: {
          title: info.videoDetails.title,
          author: info.videoDetails.author.name,
          duration: info.videoDetails.lengthSeconds,
          views: info.videoDetails.viewCount
        }
      });
    } else if (action === 'formats') {
      res.json({ success: true, formats });
    } else {
      res.json({ success: true, info, formats });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('API running on port 3000'));
