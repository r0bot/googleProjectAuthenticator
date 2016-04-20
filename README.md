How to obtain refresh tokens using the server:

1. Clone the repository and navigate to its root folder
2. Run npm install
3. Go to 
    
    https://console.developers.google.com
    
And then Navigate to Credentials -> Create credentials -> OAuth client ID -> Web Application -> Authorized Redirect URLs (add http://localhost:3310) -> Create
Then copy the client ID and client secret

4. Add client secret and ID in the config.js (Create the file from configExample) in the googleApiCredentials section
5. Run 

    node server.js
6. In your browser navigate to

    localhost:3310
7. Click Authorize App
8. Allow access
9. Tokens will be written to the console in which you ran node server.js
