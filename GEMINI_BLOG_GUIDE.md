---

## 🌍 Make it "Always Ready" (Permanent Web Link)

If you don't want to run commands every time, you can host your Admin Panel on the web.

### 1. Deploy Sanity Studio to the Web
Run this command in your terminal (inside the `studio` folder):
```bash
npm run deploy
```
*   This will give you a permanent URL like **`terrivo-admin-panel.sanity.studio`**.
*   You can open this link from **any phone or computer** and the button will be there!

### 2. Deploy Functions to Netlify
1.  Push your code to your GitHub repository.
2.  Netlify will automatically deploy the functions.
3.  Make sure you have added the `API_KEY` and `SANITY_AUTH_TOKEN` in the **Netlify Site Settings** (Environment Variables).

---

## 🖱️ One-Click Local Opening
I have created a file called **`START_TERRIVO_ADMIN.bat`** in your project folder.
1.  **Double-click** this file.
2.  It will automatically start everything and open your browser to the Admin Panel.
3.  No more typing commands!

---

## 🛠️ Required Setup (Important!)

To make the **Automatic** posting work, you MUST add these variables to your **Netlify Dashboard** (Site Settings -> Environment Variables) or your local `.env` file:

| Variable | Description | Where to get it |
| :--- | :--- | :--- |
| `API_KEY` | Gemini AI API Key | [Google AI Studio](https://aistudio.google.com/) |
| `SANITY_AUTH_TOKEN` | Sanity Write Token | Sanity Manage -> Settings -> API -> **Add New Token (Editor)** |
| `SANITY_PROJECT_ID` | Your Sanity ID | `zvazmyez` |
| `SANITY_DATASET` | Your Dataset | `production` |

### How to get a Sanity Token:
1.  Go to [sanity.io/manage](https://sanity.io/manage)
2.  Select your project (`zvazmyez`).
3.  Go to **API** -> **Tokens**.
4.  Click **"Add New Token"**.
5.  Give it a name (e.g., "Netlify AI") and set Permissions to **Editor** (or write).
6.  Copy the token and add it to Netlify.

---

## 🚀 Local Development
To test the AI generation locally, run:
```bash
npx netlify dev
```
Then open your Sanity Studio. The button will now be able to talk to the local AI function.

---

Enjoy your AI-powered blog! 🚀
