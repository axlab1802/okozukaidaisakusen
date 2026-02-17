<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# お小遣い大作戦 - Allowance Strategy

AIの力を借りて、楽しくおこづかいをお願いする手紙を生成するアプリです。

View your app in AI Studio: https://ai.studio/apps/drive/18GZqS9bK4jtJ4l9alII4whSpr8XDckDm

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and set your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - Get your API key from: https://aistudio.google.com/app/apikey

3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/okozukaidaisakusen)

1. Push your code to GitHub

2. Import your repository in Vercel

3. Set environment variables in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `GEMINI_API_KEY` with your Gemini API key

4. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
