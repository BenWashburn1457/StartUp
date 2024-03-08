# StartUp

## Elevator Pitch

Welcome to the 2048 game where the excitement of 2048 meets the thrill of competition! Immerse yourself in the world of strategic puzzle-solving as you navigate through tiles, aiming to reach the elusive 2048 tile. Our platform goes beyond the traditional 2048 experience by offering users the ability to not only track their personal high scores but also engage in friendly competition with other players worldwide. Challenge yourself to achieve faster completion times and witness your name rise on the global leaderboard.

Whether you're a casual player looking for a quick mental workout or a dedicated 2048 enthusiast aiming for the top spot, '2048Challenge.com' offers a dynamic and engaging environment for all. Join us in this journey of numbers, strategy, and friendly competition. Elevate your gaming experience, showcase your skills, and become part of the thriving 2048 community today!"

<img src="/Mainscreen_Diagram.jpg" width="300">  <img src="/Leaderboard_Diagram.jpg" width="310">
## Key Features and Technology
### Key Features
2048 is a encaptivating puzzle game. After creating/signing into an account, the user will see tiles arranged in a 4x4 table shape. To start thge game, the tiles will all be empty besides two, which will have twos inside. The user can combine tiles with the smae number on them, in order to add the numbers together. The goal is to combine tiles until the user gets to 2048. The player can do this be pressing the arrow keys, which will move all tiles that can move in the direction pressed as far as possible, and combining  with like tiles if a collion occurs. A leaderboards will be updated so that all players can see each others scores, and compete to have the best scores and times. Users will also be able to see who is active, and see their current highest tile.
### Technology  
**HTML** - The basic organization of the website will be built using HTML.  
**CSS** - The animation and movemnent of tiles will be handled by CSS. 
**JavaScript** - The logic and different interactions the user can have will be controleld by Javascript
**Web Service** - Web service will be used to get a users own scores and progress as well as those of others.  
**Authentication** - Users will need to create an account and log in when playing the game.  
**Database Persistence** - User accounts, scores, times, and any other infromation will be stored in a database.  
**Websocket** - This will be used so that the user can see who else is active on the website, and well as monitor their progress in the game.  

### HTML Deliverable
In this delivable, I was able to create the structure of my website using HTML.
+ **HTML Pages** - The webesite has three HTMl pages: the login, the play screen, and the leaderboards
+ **Links** - There are links in the header of each page that help the user to navigate
+ **Images** - There is a ai generated image of a person going onto an adventure into the world of numbers that is the game 2048
+ **Login** - There is an input box for the name and password, and a submit button.
+ **DB** - There is section in the play page that shows the score, which is drfawn from the database. Also the leaderboards will be drawn from the database
+ **Websocket** - There is a spot for updates in the playt section that shows live updates of other online players.

### CSS Deliverables
+ **HTML Pages** - Created a new layout that is responsive to different sizes. More organized and professional design. New color scheme.
+ **Links** - The links got moved to the top and formatted to look more appealing.
+ **Images** - The images are now in line with the title on the main page, move in and out in response to resizing.
+ **Login** - There is an input box for the name and password, and a submit button.
+ **DB** - Made the display more appealing and organized.
+ **Websocket** - Placed the table of updates on the side of screen.

### JavaScript Deliverables
+ **HTML Pages** - The 2048 game on the play.html works because of JavaScript. It controls the game logic as well as the display on the screen. There is an event listerner that detects when the arrow keys are pressed, which then moves the squares within the game table. Handles the movement and combination of squares to help accomplish the goal of getting to 2048.
+ **Login** - Now the login username is saved on the browser and displayed in the top right through Javascript
+ **DB** - The javascript will store data about scores and add them to the database
+ **Websocket** - The Javascript will edit the recent news table with all the data recieved from websocket

### Service Deliverables
+ The startup service is using **Node.js** and **express**
+ The frotend is served up using **Express static middleware** through the index.js
+ The leaderboard.js file calls on a famous quotes api in order to display a famous quote
+ The backend has **Get** and **POST** endpoints to enable scores to be stored and later displayed on a leaderboard
+ The leaderboard.js file uses **GET** methods and the play.js file uses **POST** methods in order to call service endpoints

## Links
Notes file: https://github.com/BenWashburn1457/StartUp/blob/main/notes.md
