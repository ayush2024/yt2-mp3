import React, { useState } from 'react';
import ytdl from 'ytdl-core';

const Test = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const convertToMP3 = async () => {
        try {
            // Validate the YouTube video URL
            if (!ytdl.validateURL(videoUrl)) {
                setErrorMessage('Please enter a valid YouTube video URL.');
                return;
            }

            // Get the video info
            const info = await ytdl.getInfo(videoUrl);

            // Extract the audio format
            const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

            // Choose the highest quality audio format
            const audioFormat = audioFormats.find(format => format.audioBitrate);

            // Generate the download URL
            const downloadUrl = audioFormat.url;
            setDownloadUrl(downloadUrl);
            setErrorMessage('');
        } catch (error) {
            console.error('Error converting video:', error);
            setErrorMessage('Failed to convert video. Please try again.');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={videoUrl} 
                onChange={(e) => setVideoUrl(e.target.value)} 
                placeholder="Enter YouTube video URL" 
            />
            <button onClick={convertToMP3}>Convert to MP3</button>

            {errorMessage && <p>{errorMessage}</p>}
            {downloadUrl && <a href={downloadUrl} download>Download MP3</a>}
        </div>
    );
};

export default Test;
