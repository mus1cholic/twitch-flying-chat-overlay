# Twitch Flying Chat Overlay v0.7.3

Insert gif here

A streaming overlay to display chat that scrolls horizontally, similar to niconico and bilibili

Building Instructions:

- `cd` into this respository
- `./configure.sh`

Running instructions:

Have two terminal windows open, one for starting the server and one for the client

For terminal 1:
- `cd` into this repository
- `cd server`
- `npm start`
- Make sure `Server start! Running on port 3001` is shown, and leave the terminal window alone

For terminal 2:
- `cd` into this repository
- `cd client`
- `npm start`
- Make sure `Compiled successfully!` is shown, and leave the terminal window alone. You can close the browser window

In OBS:
- Add a **Browser** source to your scene
- Name it whatever
- In the URL, put in: `localhost:3000`
- Check "Use custom frame rate" and put `60`
- **Very Important!!** Check "Refresh browser when scene becomes active"
- Click "Refresh cache of current page" everytime you hit a problem should solve most issues
