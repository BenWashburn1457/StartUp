# Notes


## Git and GitHub


-Git is a form of version control
-Here are several commands that help you create and edit the repository:

```$ touch [filename]  Creates a file in the repository
$ git add [filename]     //adds the file to the stage in preparation to commit
$ git commit     //This syncs the changes in stage to the repository          
$ git push     //This syncs the local repository to the github repository
$ git pull     //This synce the github repository to the local repository
$ git status     //This tells you what the status is of the stage, as well as differences betweent it and the github repository
$ git fetch     //This gets the latest info about the github repository without making changes to the local
```
-in vs code, after commiting, you write your message and then hit esc and type :wq


## Important Technologies
HTML - Structure
CSS - Style
JavaScript - Interaction
Service - Web service endpoints
Database/Login - Persisted app and auth data
WebSocket - Data pushed from server, such as notifications and chat
React - Web framework

## SSH
To connect to server, use this SSH command:
```ssh -i /cs260/cs260-key.pem ubuntu@ben2048.click```

To deploy files to server:
```./deployFiles.sh -k /cs260/cs260-key.pem -h ben2048.click -s startup```

## Caddy
Caddy will rout you depending on what was searched

## HTML


## CSS
Can be done in blocks, in header, or in seperate sheet
To change color, ```<p style="color: red"><p>``` or
    ```<head>```
       ```<link rel="icon" href="2048.ico.jpg" />```
        ```<style> h1{color:rgb(21, 6, 73)}</style>``
    ```</head>```
You can have ID attributes for any tag, and you can apply styling to those ids
Descendent - a list of descendents
Child - A list of direct children
Psuedo - 

Properties:
background-color
border
color
display
font
margin
padding

It goes from biggest to smallest Margin, Border, Padding, and then element

Units: px, pt, %, 

THE END
