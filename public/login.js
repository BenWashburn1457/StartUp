
async function createAccount() {
    let userName = "username";
    let password = "password";
    [userName, password] = getInput();
    try{
        const userID = await sendAccountInfo(userName, password);
        localStorage.setItem('userID', userID);
        } catch (error) {
            console.error('Error creating account: ', error);
    }
}

async function login() {
    console.log("attemptiong login")
    let userName = "username";
    let password = "password";
    [userName, password] = getInput();
    try{
        const userID = await checkLogin(userName, password);
        localStorage.setItem('userID', userID);
        } catch (error) {
            console.error('Error logging in account: ', error);
    }
}

async function clearCookie(name) {
    try {
        const response = await fetch('/api/clear/cookie', {
            method: 'POST',
        });
    } catch (error) {
        console.error('Error posting data: ', error);
        throw error; // Re-throwing the error for further handling
    }
}

function logout() {
    localStorage.clear();
    clearCookie('token');
    window.location.reload();
}

function play() {
    window.location.href = 'play.html';
}

async function checkLogin(userName, password) {
    console.log("starting check of login")
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Successfully posted data:", data);
        localStorage.setItem('userName', userName); // Saving the username in localStorage
        window.location.href = 'play.html';
        return data.userID; // Assuming the response contains the userID
    } catch (error) {
        console.error('Error posting data: ', error);
        throw error; // Re-throwing the error for further handling
    }
}
    

// Function to send account information to the server
async function sendAccountInfo(userName, password) {
    try {
        const response = await fetch('/api/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Successfully posted data:", data);
        localStorage.setItem('userName', userName); // Saving the username in localStorage
        window.location.href = 'play.html';
        return data.userID; // Assuming the response contains the userID
    } catch (error) {
        console.error('Error posting data: ', error);
        throw error; // Re-throwing the error for further handling
    }
}

// Function to get input values from the form
function getInput() {
    var userName = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    return [userName, password];
}

function loggedInDisplay() {
    let form = document.getElementById('loginFormat');
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }

    var playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', play);

    var logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', logout);

    var buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.appendChild(playButton); // Append the buttons to the container
    buttonContainer.appendChild(logoutButton);
    form.appendChild(buttonContainer);
}

function checkDisplay() {
    let userName = localStorage.getItem('userName');
    if (userName){
        loggedInDisplay();
    }
}

unauthorized = localStorage.getItem('logout');
if (unauthorized) {
    localStorage.setItem('logout', false);
    logout();

}
checkDisplay();
