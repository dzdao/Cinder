# Cinder App: *Connect - Code - Github and Chill*

Cinder is a social platform in which programmers can interact and exchange ideas in hopes of building something cool together. It is a RESTful web app with real-time interaction powered by [Node.js](https://nodejs.org/api/), [Express.js](http://expressjs.com/en/api.html), [MongoDB](https://docs.mongodb.com/), and [Socket.io](https://github.com/socketio/socket.io).

Feel free to try out here: http://cinder.cfapps.io/

#### What we're using (frameworks, modules, libraries, etc):

- [Node.js](https://nodejs.org/api/)
- [Node Package Manager](https://docs.npmjs.com/)
- [Express.js](http://expressjs.com/en/api.html)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Knockout.js](http://knockoutjs.com/documentation/introduction.html)
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose.js](http://mongoosejs.com/docs/guide.html)
- [Mozilla's client-sessions](https://github.com/mozilla/node-client-sessions)
- [Multer](https://www.npmjs.com/package/multer)
- [Socket.io](https://github.com/socketio/socket.io)

#### Installation
1. Install [Node.js](https://nodejs.org/en/download/package-manager/) and update the [Node Package Manger](https://docs.npmjs.com/getting-started/installing-node).
2. Download the Cinder source code and it extract to a directory.
3. Open a terminal and cd into that directory.
4. Install npm module dependencies from the package.json file by typing in the terminal:
```sh
$ npm install
```

5. Install [MongoDB](https://docs.mongodb.com/manual/installation/).
6. Start the MongoDB server by typing and entering into a terminal:
```sh
$ mkdir --p ./mongodb/data
$ ./mongodb/bin/mongod --dbpath=$HOME/mongodb/data
```

7. Run the web server by typing in the terminal:
```sh
$ node server.js
```

8. Access the web application locally by launch a web broswer and directing it to:
```
http://localhost:8000/
```

### Functionalities

- New users will be required to answer 3 short survey questions during the sign-up process. This data will be applied to their user profile and help in matching them with other like-minded programmers.
- After logging in, they are redirected to their settings page. From the settings page they can upload a profile picture by clicking on the pencil icon. A user may also choose to update their survey data on this page if they wish to do so.
- The profile page is a designated area that shows the user’s buddy list. Initially this page will be empty because they have recently just signed up and have no “hacker buddies” on their buddy list.
- In order for the user to match with other similar profiles, they must go to the “Let Us Chill” page. This page displays user profiles who have at minimum one similar attribute.
- These user profiles are considered “matches” and are displayed as interactive tiles. If the user has no matches a message will display informing them. At this point they can go to their settings page in order to update their attributes in hopes of matching with users.
- If a user has “matches” they can swipe the user profile tiles to the right to choose people they like or swipe left in order to dislike. 
- Swiping profiles to the right will add that particular user to their buddy list while swiping to the left has no consequences other than removing the tile from the screen. Once they run out of tiles to swipe, the list of users they liked will be shown on the screen.
- Each swipe, either right or left will provide visual feedback in the form of emojis appearing below the tile and an audio response by playing a mp3 sound file.
- After adding some desired number of matches, going back to the Profile page will now display all their “hacker buddies”, the set of “liked” users. Again, these users are displayed as tiles.
- The user can start a chat with any one of their buddies by clicking on their tile and hitting the chat button.

### Limitations / Known Bugs
Cinder is a proof of concept and still in the early stages of development:
- Currently there is no limitation to the chat system. Therefore users are not able to limit who can message them. *e.g if Bob decides to add Alice to his buddylist, he can message her even if he is not on her buddylist.*
- A user receiving messages from multiple buddies simultaneously will receive all their messages in the same chat window instead of separate windows.
- Social media buttons at the footer of each page are only for display and are non-functional.
