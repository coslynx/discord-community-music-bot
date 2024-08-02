<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-community-music-bot
</h1>
<h4 align="center">A Discord bot that enhances community engagement by streaming music collaboratively.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-MongoDB-black" alt="">
  <img src="https://img.shields.io/badge/DiscordAPI-Integration-yellow" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-community-music-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-community-music-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-community-music-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a project called "discord-community-music-bot" that provides a comprehensive solution for music streaming in Discord communities using technologies such as JavaScript (Node.js), MongoDB, and Discord.js.

## 📦 Features
|    | Feature                | Description                                                                                                        |
|----|------------------------|--------------------------------------------------------------------------------------------------------------------|
| 🎶 | Music Playback     | Stream music live from platforms like YouTube and Spotify directly into Discord voice channels.                   |
| 🔄 | Queue Management   | Add, remove, and manage songs in a customizable queue for real-time interaction.                                   |
| 📏 | Volume Control     | Control playback volume with user-specific preferences to ensure an optimal listening experience.                  |
| 🔍 | Song Search        | Easily search for songs or artists with auto-suggestions, making music discovery simple.                          |
| 📜 | Command Interface  | Simple commands such as `!play`, `!pause`, and `!skip` for easy interaction with the bot.                        |
| 🔐 | User Controls      | Role-based permissions for managing playback to ensure moderators and admins can manage music sessions effectively. |
| ℹ️ | Song Information   | Display relevant details about currently playing songs and the play queue to enhance user engagement.              |

## 📂 Structure
```
discord-community-music-bot/
├── src/
│   ├── commands/          # Command files for bot actions
│   ├── events/            # Event listeners for the bot
│   ├── services/          # Business logic for music and user interactions
│   ├── models/            # Mongoose models for user and song data
│   ├── utils/             # Utility functions and error handlers
│   └── index.js           # Entry point for the application
├── config/                # Configuration files for environment variables
├── public/                # Frontend resources
├── tests/                 # Unit tests for commands and services
├── .gitignore
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/spectra-ai-codegen/discord-community-music-bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd discord-community-music-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the development server:
   ```bash
   npm start
   ```
2. Invite the bot to your Discord server and use commands to control playback.

### ⚙️ Configuration
Adjust configuration settings in '.env' for database connections and API credentials.

### 📚 Examples
- Play a song: Use the command `!play [song name]`
- Pause the music: Use the command `!pause`

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create
   ```
4. Deploy the code:
   ```bash
   git push heroku main
   ```

### 🔑 Environment Variables
- `DISCORD_TOKEN`: Token for your Discord bot
- `MONGODB_URI`: Connection string for MongoDB
- `SPOTIFY_CLIENT_ID`: Your Spotify API Client ID
- `SPOTIFY_CLIENT_SECRET`: Your Spotify API Client Secret

## 📜 License
This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- Drix10 - [GitHub Profile](https://github.com/Drix10)
- Spectra.codes - [Website](https://spectra.codes)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</p>