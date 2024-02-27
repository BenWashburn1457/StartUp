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
```./deployFiles.sh -k ../cs260-key.pem -h ben2048.click -s startup```

## Caddy
Caddy will rout you depending on what was searched

## Console
echo - Output the parameters of the command
cd - Change directory
mkdir - Make directory
rmdir - Remove directory
rm - Remove file(s)
mv - Move file(s)
cp - Copy files
ls - List files
curl - Command line client URL browser
grep - Regular expression search
find - Find files
top - View running processes with CPU and memory usage
df - View disk statistics
cat - Output the contents of a file
less - Interactively output the contents of a file
wc - Count the words in a file
ps - View the currently running processes
kill - Kill a currently running process
sudo - Execute a command as a super user (admin)
ssh - Create a secure shell on a remote computer
scp - Securely copy files to a remote computer
history - Show the history of commands
ping - Check if a website is up
tracert - Trace the connections to a website
dig - Show the DNS information for a domain
man - Look up a command in the manual

## HTML
### Tags:

html	The page container
head	Header information
title	Title of the page
meta	Metadata for the page such as character set or viewport settings
script	JavaScript reference. Either a external reference, or inline
include	External content reference
body	The entire content body of the page
header	Header of the main content
footer	Footer of the main content
nav	Navigational inputs
main	Main content of the page
section	A section of the main content
aside	Aside content from the main content
div	A block division of content
span	An inline span of content
h<1-9>	Text heading. From h1, the highest level, down to h9, the lowest level
p	A paragraph of text
b	Bring attention
table	Table
tr	Table row
th	Table header
td	Table data
ol,ul	Ordered or unordered list
li	List item
a	Anchor the text to a hyperlink
img	Graphical image reference
dialog	Interactive component such as a confirmation
form	A collection of user input
input	User input field
audio	Audio content
video	Video content
svg	Scalable vector graphic content
iframe	Inline frame of another HTML page


### Special character:

&	&amp;
<	&lt;
>	&gt;
"	&quot;
'	&apos;
😀	&#128512;


### Input
Element	Meaning	Example
form	Input container and submission	<form action="form.html" method="post">
fieldset	Labeled input grouping	<fieldset> ... </fieldset>
input	Multiple types of user input	<input type="" />
select	Selection dropdown	<select><option>1</option></select>
optgroup	Grouped selection dropdown	<optgroup><option>1</option></optgroup>
option	Selection option	<option selected>option2</option>
textarea	Multiline text input	<textarea></textarea>
label	Individual input label	<label for="range">Range: </label>
output	Output of input	<output for="range">0</output>
meter	Display value with a known range	<meter min="0" max="100" value="50"></meter>



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

### Properties:
Property	Value	Example	Discussion
background-color	color	red	Fill the background color
border	color width style	#fad solid medium	Sets the border using shorthand where any or all of the values may be provided
border-radius	unit	50%	The size of the border radius
box-shadow	x-offset y-offset blu-radius color	2px 2px 2px gray	Creates a shadow
columns	number	3	Number of textual columns
column-rule	color width style	solid thin black	Sets the border used between columns using border shorthand
color	color	rgb(128, 0, 0)	Sets the text color
cursor	type	grab	Sets the cursor to display when hovering over the element
display	type	none	Defines how to display the element and its children
filter	filter-function	grayscale(30%)	Applies a visual filter
float	direction	right	Places the element to the left or right in the flow
flex			Flex layout. Used for responsive design
font	family size style	Arial 1.2em bold	Defines the text font using shorthand
grid			Grid layout. Used for responsive design
height	unit	.25em	Sets the height of the box
margin	unit	5px 5px 0 0	Sets the margin spacing
max-[width/height]	unit	20%	Restricts the width or height to no more than the unit
min-[width/height]	unit	10vh	Restricts the width or height to no less than the unit
opacity	number	.9	Sets how opaque the element is
overflow	[visible/hidden/scroll/auto]	scroll	Defines what happens when the content does not fix in its box
position	[static/relative/absolute/sticky]	absolute	Defines how the element is positioned in the document
padding	unit	1em 2em	Sets the padding spacing
left	unit	10rem	The horizontal value of a positioned element
text-align	[start/end/center/justify]	end	Defines how the text is aligned in the element
top	unit	50px	The vertical value of a positioned element
transform	transform-function	rotate(0.5turn)	Applies a transformation to the element
width	unit	25vmin	Sets the width of the box
z-index	number	100	Controls the positioning of the element on the z axis

It goes from biggest to smallest Margin, Border, Padding, and then element

Units: px, pt, %, 

### Combinators in CSS
Descendant	A list of descendants	body section	Any section that is a descendant of a body
Child	A list of direct children	section > p	Any p that is a direct child of a section
General sibling	A list of siblings	div ~ p	Any p that has a div sibling
Adjacent sibling	A list of adjacent sibling	div + p	Any p that has an adjacent div sibling

for class selectro: .
for id selector: #

## JavaScript

### String operations:
length	The number of characters in the string
indexOf()	The starting index of a given substring
split()	Split the string into an array on the given delimiter string
startsWith()	True if the string has a given prefix
endsWith()	True if the string has a given suffix
toLowerCase()	Converts all characters to lowercase

### Arrays
Function	Meaning	Example
push	Add an item to the end of the array	a.push(4)
pop	Remove an item from the end of the array	x = a.pop()
slice	Return a sub-array	a.slice(1,-1)
sort	Run a function to sort an array in place	a.sort((a,b) => b-a)
values	Creates an iterator for use with a for of loop	for (i of a.values()) {...}
find	Find the first item satisfied by a test function	a.find(i => i < 2)
forEach	Run a function on each array item	a.forEach(console.log)
reduce	Run a function to reduce each array item to a single item	a.reduce((a, c) => a + c)
map	Run a function to map an array to a new array	a.map(i => i+i)
filter	Run a function to remove items	a.filter(i => i%2)
every	Run a function to test if all items match	a.every(i => i < 3)
some	Run a function to test if any items match	a.some(i => 1 < 1)

### Regex
<img src="/Regex-Cheat-Sheet.png" width="300">

## Local Storage
Function	Meaning
setItem(name, value)	Sets a named item's value into local storage
getItem(name)	Gets a named item's value from local storage
removeItem(name)	Removes a named item from local storage
clear()	Clears all items in local storage

THE END
