from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
from dotenv import load_dotenv
load_dotenv()  # This loads the environment variables from a .env file
from youtube_transcript_api import YouTubeTranscriptApi
from openai import OpenAI

app = Flask(__name__)
CORS(app)

@app.route('/api/videotranscribe', methods=['GET'])
def video_transcription():
    video_id = request.args.get('videoID', None)
    if not video_id:
        return jsonify({'error': 'Missing video ID'}), 400
    
    print("Video transcription initiated. Please wait...")

    if video_id:
        print(video_id)  # This line will print the video_id extracted from the URL
    else:
        return jsonify({'error': 'No video ID provided'}), 400
    # video_id = 'BZP1rYjoBgI';
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        print(transcript_list)
        # Assuming you want to return the transcript as a string
        transcript = ' '.join([item['text'] for item in transcript_list])

        # Initialize the OpenAI client
        client = OpenAI()

        # The prompt to the model, asking it to summarize the transcript
        prompt = f"I need a summary of the following video transcript. Please focus on the main themes related to the video transcript. The summary should be concise, and divided into sections like Introduction, Main Points, and Conclusion. Use timestamps for reference. Avoid including minor details. The goal is to capture the essence of the video content clearly and succinctly\n\n{transcript}"

        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
            ]
        )

        # Assuming 'completion' is your variable holding the response from the API call
        summary_content = completion.choices[0].message.content
        print(summary_content)


        # Assuming the response object structure matches your example
        print(completion.choices[0].message)

        return jsonify({'summary': summary_content})
    except Exception as e:
        # Return an error message if something goes wrong
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)


# app = Flask(__name__)

# @app.get('/summary')
# def summary_api():
#     url = request.args.get('url', '')
#     video_id = url.split('=')[1]
#     summary = get_summary(get_transcript(video_id))
#     return summary, 200

# def get_transcript(video_id):
#     transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
#     transcript = ' '.join([d['text'] for d in transcript_list])
#     return transcript

# def get_summary(transcript):
#     summariser = pipeline("summarization", model="google-t5/t5-base", framework="pt", max_length = 200)
#     summary = ''
#     for i in range(0, (len(transcript)//1000)+1):
#         summary_text = summariser(transcript[i*1000:(i+1)*1000])[0]['summary_text']
#         summary = summary + summary_text + ' '
#     return summary, 200

# # Assuming video_id is defined as '1GlRUGJ6rHk'
# video_id = '1GlRUGJ6rHk'
# transcript = get_transcript(video_id)
# summary = get_summary(transcript)
# print(summary)

# if __name__ == '__main__':
#     app.run()
