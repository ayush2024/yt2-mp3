const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());

const RAPID_KEY = "a1a3c0bd7cmsh48aefb17e399b66p17b261jsnfb411f170ae0";
const HOST = "youtube-mp36.p.rapidapi.com";

app.get("/", (req, res)=>{
    app.use(express.static(path.resolve(__dirname,"client","build")));
    res.sendFile(path.resolve(__dirname,"client", "build", "index.html"));
  })

app.post('/convert-mp3', async (req, res) => {
    try {
        let videoId = req.body.videoId;
        console.log(req.body);

        if (!videoId) {
            return res.status(400).json({ success: false, message: "Please enter a valid video ID or URL" });
        }

        // Check if the provided input is a YouTube URL
        if (videoId.includes('youtube.com')) {
            // Extract the video ID from the URL
            const url = new URL(videoId);
            videoId = url.searchParams.get('v');
            console.log(videoId);

            if (!videoId) {
                return res.status(400).json({ success: false, message: "Invalid YouTube URL" });
            }
        }
        
        const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, {
            method: "GET",
            headers: {
                "x-rapidapi-key": RAPID_KEY,
                "x-rapidapi-host": HOST
            }
        });

        const fetchResponse = await fetchAPI.json();
        // console.log(fetchResponse);

        if (fetchResponse.status === "ok") {
            return res.json({ success: true, song_title: fetchResponse.title, song_link: fetchResponse.link });
        } else {
            return res.status(400).json({ success: false, message: fetchResponse.msg });
        }
    } catch (error) {
        console.error("Error converting video:", error);
        return res.status(500).json({ success: false, message: "An error occurred while converting the video" });
    }
});

app.listen(8000, () => {
    console.log("server is listening");
})