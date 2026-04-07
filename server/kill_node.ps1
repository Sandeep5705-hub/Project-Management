# Forcefully stop all node processes to clear Mongoose memory cache
echo "Clearing background processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
echo "Processes cleared! You can now start your server using: node index.js"
