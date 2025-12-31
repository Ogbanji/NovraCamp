@echo off
echo ==========================================
echo 🚀 DEPLOYING TO FIREBASE
echo ==========================================

echo.
echo 1. Setting Firebase Functions Config...
call firebase functions:config:set twitter.client_id="eEY3MUNDX1hrWEQ3VXQxN1pqZVk6MTpjaQ" twitter.client_secret="xxLQl0fVPl5XRhvLgkP_mdeVhrcHqWsA6mmXGGIP6kD5PvbHew" twitter.callback_url="https://novra-camp.web.app/api/auth/twitter/callback" app.frontend_url="https://novra-camp.web.app"

echo.
echo 2. Building Frontend...
call npm run build

echo.
echo 3. Deploying Functions and Hosting...
call firebase deploy

echo.
echo ==========================================
echo ✅ DEPLOYMENT COMPLETE!
echo ==========================================
echo.
echo ⚠️ IMPORTANT: Update Twitter Developer Portal
echo Set Callback URI to: https://novra-camp.web.app/api/auth/twitter/callback
echo.
pause
