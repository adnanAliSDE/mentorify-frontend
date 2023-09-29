const welcomeHeading = document.querySelector('.welcome-heading');
const msg = 'Create Your Mentorify Account'
messageTyper(welcomeHeading, msg, 'text-gray-400', 'text-green-600');

document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.getElementById('username');
    const checkUsernameButton = document.getElementById('checkUsernameButton');
    const usernameAvailability = document.getElementById('usernameAvailability');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');

    // Function to check if the username is available
    async function checkUsernameAvailability(username) {
        try {
            usernameAvailability.classList.remove('hidden');
            usernameAvailability.textContent = '';
            if (username.toLowerCase() === 'aditya') {
                let msg = `Username ${username} is available.`
                messageTyper(usernameAvailability, msg, 'text-red-600', 'text-green-600', setColorFirst = true);
                return true;
            } else {
                let msg = `Username ${username} is not available.`;
                messageTyper(usernameAvailability, msg, 'text-green-600', 'text-red-600', setColorFirst = true);
                return false;
            }

            // const response = await fetch(`/check_username?username=${username}`);
            // const data = await response.json();

            // if (data.available) {
            //     usernameAvailability.textContent = 'Username is available.';
            //     usernameAvailability.style.color = 'green';
            //     return true;
            // } else {
            //     usernameAvailability.textContent = 'Username is not available.';
            //     usernameAvailability.style.color = 'red';
            //     return false;
            // }
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false;
        }
    }

    // Handle username availability check
    checkUsernameButton.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        if (username) {
            await checkUsernameAvailability(username);
        } else {
            usernameAvailability.textContent = 'Please enter a username.';
            usernameAvailability.style.color = 'red';
        }
    });

    usernameInput.addEventListener('focusout', async () => {
        let username = usernameInput.value.trim()
        if (username) {
            await checkUsernameAvailability(username);
        } else {
            return null;
        }
    })

    const validateAccountDetails = (username, password, confirmPassword) => {
        let err = null;
        if (!username || !password || !confirmPassword) {
            err = 'Please fill all the form properly.'
        } else if (password !== confirmPassword) {
            err = 'Passwords do not match.';
        } else if (password.length < 8) {
            err = 'Password must be at least 8 characters long.';
        } else {
            err = null;
        };
        return err;
    };

    // Handle form submission
    const regForm = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('createAccountButton');

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Reset error message
        errorMessage.style.display = 'none';

        const writeError = (err) => {
            errorMessage.style.display = 'block';
            errorMessage.textContent = ''
            messageTyper(errorMessage, err, 'text-red-700', 'text-red-700', setColorFirst = true)
        };

        const errMsg = validateAccountDetails(username, password, confirmPassword);

        if (!errMsg) {
            console.log(submitBtn);
            console.log("Form submitted successfully!");
            regForm.submit()
            console.log('Form submitted successfully!');
        } else {
            writeError(errMsg);
        };


    });
});