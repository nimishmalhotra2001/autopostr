# AutoPostr
---
[![2OkOicQ.md.png](https://iili.io/2OkOicQ.md.png)](https://freeimage.host/i/2OkOicQ)
---

## Description

AutoPostr allows you to schedule youtube videos randomly each day, sourcing from google drive. With the ability to configure the number of videos to post, title, description, and tags. Basically its a youtube sheningan... with a very specific use case.

## Deploy on Your Own

1. **Set Up Google Cloud**  
   - Create a [Google Cloud project](https://console.cloud.google.com/projectcreate).  
   - Enable the **[YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com)** and **[Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com)**.  
   - Go to **[Credentials](https://console.cloud.google.com/apis/credentials)** and set up OAuth 2.0 credentials:  
     - Click **Create Credentials** > **OAuth client ID**.
     - Select **Web application** in the application type.
     - Add `http://localhost:3000/auth/callback` or `<deployed-url>/auth/callback` as authorized redirect URIs and save.
     - Then go to the **OAuth consent screen** tab and fill in the required fields.
     - Add the following scopes:  
       - `https://www.googleapis.com/auth/youtube.upload`  
       - `https://www.googleapis.com/auth/drive.readonly`  
   - Get your **Client ID** and **Client Secret** from **Credentials**, then save them in a `.env` file (refer to `.env.example`).

2. **Set Up MongoDB**  
   - Create a free database using [MongoDB Atlas](https://www.mongodb.com/atlas).  
   - Add the database connection string to your `.env` file.

3. **Deploy the Project**  
   Run these commands:  
   ```bash
   git clone https://github.com/sea-deep/autopostr
   cd autopostr
   # Rename .env.example to .env and fill in the required fields
   npm install
   node .
   ```

--- 
