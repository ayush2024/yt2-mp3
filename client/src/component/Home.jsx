import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [videoId, setVideoId] = useState('');
    const [success, setSuccess] = useState(false);
    const [songTitle, setSongTitle] = useState('');
    const [songLink, setSongLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${window.location.origin}/convert-mp3`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId }),
            });

            const data = await response.json();
            console.log(data);
            setVideoId('');

            if (response.ok) {
                setSuccess(true);
                setSongTitle(data.song_title);
                setSongLink(data.song_link);
            } else {
                setSuccess(false);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error converting video:', error);
            setSuccess(false);
            setErrorMessage('Failed to convert video. Please try again.');
        }
    };

    return (
        <>
            <div className="top-container">
                <form onSubmit={handleSubmit}>
                    <div className="main">
                        <h1><i className="fab fa-youtube"></i> YouTube 2 MP3 Converter</h1>
                        <h4>Enter the video ID</h4>
                        <div>
                            <input
                                type="text"
                                value={videoId}
                                onChange={(e) => setVideoId(e.target.value)}
                                placeholder="Video ID..."
                                required
                            />
                            <button type="submit" id="submit-btn">Convert</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="bottom-container">
                {success ? (
                    <div className="success">
                        <p>{songTitle}</p>
                        <a href={songLink}><button id="download-btn">DOWNLOAD</button></a>
                    </div>
                ) : (
                    <div className="errors">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;




// import React, { useState } from 'react';
// import './Home.css';


// const Home = () => {
//     const [videoId, setVideoId] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [songTitle, setSongTitle] = useState('');
//     const [songLink, setSongLink] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         const RAPID_KEY = "a1a3c0bd7cmsh48aefb17e399b66p17b261jsnfb411f170ae0";
//         const HOST = "youtube-to-mp315.p.rapidapi.com";
//         e.preventDefault();
//         try {
//             // Validate if videoId is not empty
//             if (!videoId) {
//                 setErrorMessage('Please enter a valid video ID or URL');
//                 return;
//             }
    
//             // Extract video ID from the URL if the input is a YouTube video URL
//             let videoIdParam = videoId;
//             if (videoId.includes('youtube.com')) {
//                 const url = new URL(videoId);
//                 videoIdParam = url.searchParams.get('v');
//             }
            
//             // Make POST request to the RapidAPI endpoint with the extracted video ID
//             const response = await fetch(`https://${HOST}/dl?id=${videoIdParam}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-rapidapi-key': RAPID_KEY,
//                     'x-rapidapi-host': HOST
//                 },
//                 body: JSON.stringify({ videoId: videoIdParam })
//             });
//             console.log(response);
    
//             if (!response.ok) {
//                 throw new Error('Failed to convert video');
//             }
    
//             // Parse response
//             const data = await response.json();
    
//             // Handle response
//             setSuccess(true);
//             setSongTitle(data.song_title);
//             setSongLink(data.song_link);
//             setErrorMessage('');
//         } catch (error) {
//             console.error('Error converting video:', error);
//             setSuccess(false);
//             setErrorMessage('An error occurred while converting the video. Please try again.');
//         }
//     };
    


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={videoId}
//                     onChange={(e) => setVideoId(e.target.value)}
//                     placeholder="Video ID or URL"
//                     required
//                 />
//                 <button type="submit">Convert to MP3</button>
//             </form>

//             {errorMessage && <p>{errorMessage}</p>}

//             {success && (
//                 <div>
//                     <p>{songTitle}</p>
//                     <a href={songLink} download><button>Download</button></a>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;


