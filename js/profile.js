const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    return `${day} ${month} ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};



document.addEventListener('DOMContentLoaded', async () => {
    const updateUserForm = document.querySelector('.personal-details-form');
    const fetchUsername = document.querySelector('.fetch-username');
    const fetchDate = document.querySelector('.fetch-date')
    console.log(updateUserForm);
    // Function to fetch user data from backend
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:3000/user", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(error);
                throw new Error(error.message || 'Failed to fetch user data');
            }

            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error(error);
            alert('Error fetching user data: ' + error.message);
            return null;
        }
    };

    // Function to populate form fields with user data
    const populateFormFields = (userData) => {
        if (!userData) return;

        document.getElementById('firstname').value = userData.firstname;
        document.getElementById('lastname').value = userData.lastname;
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('address').value = userData.address;
        fetchUsername.textContent = userData.username
        fetchDate.textContent = formatDateTime(userData.createdAt)
        
    };

    // Fetch user data and populate form fields on page load
    const userData = await fetchUserData();
    console.log(userData.user);
    populateFormFields(userData.user);

    // Event listener for form submission
    updateUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(updateUserForm);
        const userData = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            username: formData.get('username'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            language_id: formData.get('language_id')
        };

        const token = localStorage.getItem("token");
        const url = "http://localhost:3000/update-user"
        
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error(error);
                throw new Error(error.message || 'Failed to update user');
            }

            const result = await response.json();
            console.log(result);

            // Optionally, redirect or update the UI based on the successful update
            alert('User updated successfully');
        } catch (error) {
            console.error(error);
            alert('Error updating user: ' + error.message);
        }
    });




      const updatePasswordForm = document.getElementById("update-password");

    updatePasswordForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const currentPasswordInput = document.getElementById("current_password");
        const newPasswordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("password_confirmation");

        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // Make the request to update the password
        try {
            const response = await fetch("http://localhost:3000/update-password", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Display success message
                // Optionally, redirect the user to another page after successful password update
                window.location.href = "profile.html";
            } else {
                alert(data.message); // Display error message
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the password. Please try again later.");
        }
    });



    // profile image upload

const form = document.getElementById('profile-iamge-upload');
    const imageInput = document.getElementById('image');
    const frame = document.getElementById('frame');
    const selectFileText = document.querySelector('.select-file');
    const imageUploadBtn = document.querySelector('.image-upload-btn')
    
    // Function to preview the image before upload
    function previewImage() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                frame.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    imageInput.addEventListener('change', previewImage);

    // Function to handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        const token = localStorage.getItem('token');
        const file = imageInput.files[0];

        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        formData.append('image', file);

        try {
            const response = await fetch('http://localhost:3000/profile-image', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`  // Include your token from localStorage
                }
            });

            const result = await response.json();
            imageUploadBtn.style.display = 'none'
            if (response.ok) {
                alert('Image uploaded successfully!');
                // You can update the UI with the new image URL if needed
                console.log(result.image);
            } else {
                alert(result.error || 'Image upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the image.');
        }
    }

    form.addEventListener('submit', handleFormSubmit);


    // Function to preview the image before upload
    function previewImage() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                frame.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    imageInput.addEventListener('change', previewImage);

    // Fetch and display the profile image on page load
    async function fetchProfileImage() {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3000/profile-image', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                // Update the image source with the fetched image URL
                frame.src = result.image;
            } else {
                console.error('Error fetching profile image:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    fetchProfileImage();
});





