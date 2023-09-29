// Career Interests Edit Field with Suggestions and Added Interests
const careerInterestsInput = document.getElementById('career-interests');
const careerInterestsSuggestions = document.getElementById('careerInterestsSuggestions');
const addedInterestsContainer = document.getElementById('addedInterests');

// Sample career interests data (you can fetch this from your backend)
const careerInterestsData = [
    'Computer Science',
    'Web Development',
    'Data Science',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
];

// Event listener for input changes
careerInterestsInput.addEventListener('input', () => {
    const inputValue = careerInterestsInput.value.toLowerCase();
    // Clear previous suggestions
    careerInterestsSuggestions.innerHTML = '';

    // Filter and display suggestions based on input value
    const matchingInterests = careerInterestsData.filter(interest =>
        interest.toLowerCase().includes(inputValue)
    );

    matchingInterests.forEach(interest => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = interest;
        suggestionItem.classList.add(
            'cursor-pointer',
            'text-gray-600',
            'hover:text-gray-800',
            'py-1',
            'px-2',
            'rounded',
            'hover:bg-gray-100',
        );

        // Add click event listener to add selected interest
        suggestionItem.addEventListener('click', () => {
            addInterest(interest);
        });

        careerInterestsSuggestions.appendChild(suggestionItem);
    });
});

// Event listener for clicking outside the input to clear suggestions
document.addEventListener('click', event => {
    if (!careerInterestsSuggestions.contains(event.target)) {
        careerInterestsSuggestions.innerHTML = '';
    }
});

// Function to add an interest
function addInterest(interest) {
    // Create an interest item
    const interestItem = document.createElement('div');
    interestItem.textContent = interest;
    interestItem.classList.add(
        'inline-flex',
        'items-center',
        'bg-green-200',
        'text-green-600',
        'rounded-full',
        'py-1',
        'px-2',
        'mr-2',
        'mb-2',
    );

    // Create a close button for removing the interest
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add(
        'ml-2',
        'text-gray-600',
        'hover:text-gray-800',
        'focus:outline-none',
    );

    // Event listener for removing the interest
    closeButton.addEventListener('click', () => {
        addedInterestsContainer.removeChild(interestItem);
    });

    interestItem.appendChild(closeButton);
    addedInterestsContainer.appendChild(interestItem);

    // Clear the input field and suggestions after adding the interest
    careerInterestsInput.value = '';
    careerInterestsSuggestions.innerHTML = '';
}

// Edit Basic Details Modal
const editBasicDetailsModal = document.getElementById('editBasicDetailsModal');
const closeEditBasicDetailsModal = document.getElementById('cancelBasicDetailsBtn');
const saveBasicDetailsBtn = document.getElementById('saveBasicDetailsBtn');
const cancelBasicDetailsBtn = document.getElementById('cancelBasicDetailsBtn');

// Edit Basic Details Button
const editBasicDetailsBtn = document.getElementById('editBasicDetails');

// Basic Details Input Fields
const nameInput = document.getElementById('name');
const titleInput = document.getElementById('title');
const emailInput = document.getElementById('email');
const careerInterestsEdit = document.getElementById('career-interests');
const bioText = document.getElementById('bioText');

// Profile Data (You can fetch this from your backend)
const profileData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    title: "Software engineering aspirant",
    careerInterests: ['Computer Science', 'Web Development'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ligula quam. Nullam ut convallis justo, id posuere purus. Sed non velit eros. Vivamus vel tellus sit amet ligula fringilla imperdiet. Aenean a sapien non justo feugiat aliquam eget id massa.',
};

// Initialize Basic Details Form with Profile Data
nameInput.value = profileData.name;
emailInput.value = profileData.email;
titleInput.value = profileData.title;

for (let i = 0; i < profileData.careerInterests.length; i++) {
    const element = profileData.careerInterests[i];
    addInterest(element);
};
bioText.textContent = profileData.bio;

// Event Listener for Edit Basic Details Button
editBasicDetailsBtn.addEventListener('click', () => {
    // Pre-fill the form with existing data
    nameInput.value = profileData.name;
    emailInput.value = profileData.email;

    for (let i = 0; i < profileData.careerInterests.length; i++) {
        const element = profileData.careerInterests[i];
        addInterest(element);
    };

    bioText.textContent = profileData.bio;

    // Show the modal
    editBasicDetailsModal.classList.remove('hidden');
});

// Event Listener for Close Modal Button
closeEditBasicDetailsModal.addEventListener('click', () => {
    // Close the modal
    editBasicDetailsModal.classList.toggle('hidden');
});

// Event Listener for Save Basic Details Button
saveBasicDetailsBtn.addEventListener('click', () => {
    // Update the profileData with the form values
    profileData.name = nameInput.value;
    profileData.email = emailInput.value;
    profileData.careerInterests = careerInterestsEdit.value.split(',').map(item => item.trim());
    profileData.bio = bioText.textContent;

    // Close the modal
    editBasicDetailsModal.classList.add('hidden');
});


// Change profile picture

// Handle profile picture change and cropping
const changeProfileBtn = document.getElementById('changeProfileBtn');
const cropModal = document.getElementById('cropModal');
const cropContainer = document.getElementById('cropContainer');
const cropImage = document.getElementById('cropImage');
const cropButton = document.getElementById('cropButton');
let cropper; // Initialize a variable for the cropper instance

changeProfileBtn.addEventListener('click', function () {
    // Trigger the file input when "Change Profile Picture" is clicked
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', function () {
        const selectedFile = fileInput.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);

        // Display the selected image in the cropping area
        cropImage.src = imageUrl;

        // Show the crop modal
        cropModal.classList.remove('hidden');

        // Initialize cropper
        cropper = new Cropper(cropImage, {
            aspectRatio: 1, // Enforce a square aspect ratio
            viewMode: 1, // Show the cropped area in the canvas
        });
    });

    fileInput.click();
});

// When the user clicks "Crop and Save," save the cropped image and update the profile picture
cropButton.addEventListener('click', function () {
    // Get the cropped image data (as a Blob)
    cropper.getCroppedCanvas().toBlob((blob) => {
        // Create a FormData object to send the image to the server if needed
        const formData = new FormData();
        formData.append('profileImage', blob, 'profile.jpg');

        // You can send the formData to your server using fetch or other methods
        console.log(blob.stream());

        // Close the crop modal
        cropModal.classList.add('hidden');

        // Destroy the cropper instance
        cropper.destroy();
    }, 'image/jpeg'); // Set the desired image format (e.g., JPEG)
});


// Editing achievements
// JavaScript code to show and hide the achievements modal
const achievementsModal = document.getElementById('achievementsModal');
const editAchievementsBtn = document.getElementById('editAchievements');
const closeAchievementsModalBtn = document.getElementById('closeAchievementsModal');
const saveAchievementsBtn = document.getElementById('saveAchievementsBtn');
const cancelAchievementsBtn = document.getElementById('cancelAchievementsBtn');

// Show the achievements modal when the "Edit" button is clicked
editAchievementsBtn.addEventListener('click', () => {
    achievementsModal.classList.remove('hidden');
});

// Hide the achievements modal when the close button is clicked
closeAchievementsModalBtn.addEventListener('click', () => {
    achievementsModal.classList.add('hidden');
});

// Hide the achievements modal when the "Cancel" button is clicked
cancelAchievementsBtn.addEventListener('click', () => {
    achievementsModal.classList.add('hidden');
});

// JavaScript code to dynamically add achievements to the modal
const achievementsList = document.getElementById('achievementsList');
const addAchievementBtn = document.getElementById('addAchievementBtn');

// Add a new achievement to the list
function addAchievement() {
    const achievement = prompt('Enter your achievement:');
    if (achievement) {
        const listItem = document.createElement('li');
        listItem.textContent = achievement;
        achievementsList.appendChild(listItem);
    }
}

// Show the modal for adding a new achievement when the "Add Achievement" button is clicked
addAchievementBtn.addEventListener('click', addAchievement);

// JavaScript code to save the achievements when the "Save" button is clicked
saveAchievementsBtn.addEventListener('click', () => {
    // Get the list of achievements from the modal and update your data or perform any necessary actions
    const achievements = Array.from(achievementsList.children).map(item => item.textContent);
    console.log('Achievements saved:', achievements);

    // Close the achievements modal
    achievementsModal.classList.add('hidden');
});


// New code
let achievements = ["First Place in Coding Competition 2022", "Published Research Paper in Computer Science", "Volunteer of the Year Award"];

// Function to add a new achievement item with a remove button
function addAchievementItem(achievement) {
    const listItem = document.createElement('li');
    listItem.textContent = achievement;

    // Create a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'ml-2 text-red-600 hover:text-red-800 focus:outline-none';
    removeBtn.addEventListener('click', () => {
        // Remove the achievement when the remove button is clicked
        achievementsList.removeChild(listItem);
    });

    // Append the remove button to the achievement item
    listItem.appendChild(removeBtn);

    // Append the achievement item to the list
    achievementsList.appendChild(listItem);
}

// Populate existing achievements and add remove buttons
achievements.forEach(addAchievementItem);