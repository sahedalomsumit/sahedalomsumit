# Securing Gemini API Key with Supabase

To keep your Gemini API key secret, I have moved the API calling logic from the frontend to a **Supabase Edge Function**. This prevents users from inspecting your website's network traffic and stealing your key.

## 🛠️ What has been done:
1.  **Created a Supabase Edge Function**: Located at `supabase/functions/gemini-chatbot/index.ts`. This function acts as a secure proxy.
2.  **Updated SahedChatbot.jsx**: The component now calls your Supabase Edge Function instead of the Google Gemini API directly.
3.  **Removed Hardcoded Key**: The exposed API key has been removed from your frontend code.

## 🚀 Final Steps (Action Required)

You need to perform these two steps to make the chatbot work again:

### 1. Set your Gemini API Key in Supabase
Run this command in your terminal to securely store your key in Supabase:
```bash
npx supabase secrets set GEMINI_API_KEY=AIzaSyBPBRfPQWas35f38mVw_H-XzB43MRFdz5I
```
*(Optionally, you can also set `GEMINI_MODEL=gemini-1.5-flash` if you want to change the model).*

### 2. Deploy the Edge Function
Run this command to upload the new proxy function to your Supabase project:
```bash
npx supabase functions deploy gemini-chatbot --no-verify-jwt
```
> [!NOTE]
> I used `--no-verify-jwt` so the chatbot can be used by public visitors (anon) without needing they to be logged into your app's authentication system.

### 🏠 Local Testing
If you want to test locally before deploying, you can run:
```bash
npx supabase functions serve gemini-chatbot --no-verify-jwt
```

## 📄 Changes Recap:
- `src/components/SahedChatbot.jsx`: Replaced direct `fetch` call with `supabase.functions.invoke`.
- `supabase/functions/gemini-chatbot/index.ts`: New Deno-based edge function for secure API proxying.
