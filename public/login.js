
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