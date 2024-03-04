import React, { useState } from 'react';
import { copy, linkIcon, loader, tick } from "../assets";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SummarizeVidPage = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [transcription, setTranscription] = useState('');

    const extractVideoID = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            return match[2];
        } else {
            alert('Could not extract video ID. Please check the URL.');
            return null;
        }
    };

    const fetchTranscription = async () => {
        const videoID = extractVideoID(videoUrl);
        if (!videoID) return; // Stop if we couldn't extract a video ID

        try {
            const response = await fetch(`/api/videotranscribe?videoID=${encodeURIComponent(videoID)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setTranscription(data.summary); // Update state with fetched data
        } catch (error) {
            console.error("There was a problem with fetching the transcription: ", error);
        }
    };

    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex justify-center items-center'>
                    <img src={linkIcon} alt='link-icon' className='absolute left-0 my-2 ml-3 w-5' />
                    <input
                        type='url'
                        placeholder='Paste the video link'
                        className='url_input peer'
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
                        onClick={(e) => {
                            e.preventDefault(); // Prevent the default form submission
                            fetchTranscription();
                        }}
                    >
                        <p>↵</p>
                    </button>
                </form>
            </div>
            <div className='my-10 max-w-full flex justify-center items-center'>
                <div className='summary_box'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {transcription}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}

export default SummarizeVidPage;
