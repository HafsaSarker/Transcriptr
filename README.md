![image](https://github.com/HafsaSarker/Transcriptr/assets/73364680/d63f64e5-2c1e-420c-b655-9e5211201d65)

# Table of Contents
2. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Start Client](#start-client)
   - [Start Server](#start-server)
3. [Resources Used](#resources-used)


# Transcriptr App

Transcriptr is an application that allows users to upload YouTube videos and obtain transcripts using Google Cloud Storage and Google Speech-to-Text API. It also provides summaries using the Hugging Face model "sshleifer/distilbart-cnn-12-6".

##### Note: Not always accurate, depends on the audio quality.

## Getting Started

To get started with Transcriptr, follow these steps:

### Clone the Repository 

```bash
git clone https://github.com/HafsaSarker/Transcriptr.git
```
```bash
cd Transcriptr
```

### Start Client

1. Change to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Start Server

1. Change to the server directory:
   ```bash
   cd server
   ```
2. Create an `.env` file with the following variables:
   - `HF_TOKEN` (Hugging Face API token)
   - `GOOGLE_CLOUD_STORAGE_BUCKET` (Google Cloud Storage bucket name)
3. Create a Key file named `google-auth.json` with your Google credentials.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Resources Used

- [Create Buckets - Google Cloud Storage](https://cloud.google.com/storage/docs/creating-buckets)
- [Upload to Bucket - Google Cloud Storage](https://cloud.google.com/storage/docs/uploading-objects#storage-upload-object-client-libraries)
- [Speech-to-Text API - Google Cloud](https://cloud.google.com/speech-to-text/docs/async-recognize)
- [Using Speech-to-Text with TypeScript](https://bebity.medium.com/node-real-time-speech-to-text-with-google-88678ca3ad)
