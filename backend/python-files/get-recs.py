import os
from google import genai
from dotenv import load_dotenv
import googleapiclient.discovery

load_dotenv()

def query_gemini(prompt) -> str:
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("Quering gemini...")
    response = client.models.generate_content(
        model='gemini-2.5-flash', contents=prompt
    )
    return response.text

def search_yt(search) -> list:
    API_KEY = os.getenv('YOUTUBE_API_KEY')
    api_service_name = "youtube"
    api_version = "v3"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=API_KEY
    )

    res = []

    request = youtube.search().list(
        part="snippet",
        maxResults=3,
        q=f"{search}"
    )
    response = request.execute()
    items_returned = response["items"]
    for i in range(0, 3):
        item = items_returned[i]
        if("snippet" in item.keys()):
            title, desc = item['snippet']['title'], item['snippet']['description'] if item['snippet']['description'] else 'No description was posted for this video...'
            thumbnail, video_id = item['snippet']['thumbnails']['default'], item['id']['videoId']
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            res.append({'title': title, 'description': desc, 'thumbnail_url': thumbnail, 'Video URL': video_url})
            
    return res




if __name__ == "__main__":

    prompt = input("What do you want to learn about today: ")

    if not prompt:
        print("Cannot query an empty prompt.")
        exit(1)

    print("Quering YouTube API to find videos relates to user request...")

    response = search_yt(prompt)
    print(response)
    
    