document.addEventListener('DOMContentLoaded', function () {
    // Function to read existing schedule data from the hidden input field
    function getExistingScheduleData() {
        const existingScheduleInput = document.getElementById('existingScheduleInput');
        return existingScheduleInput.value.split(';').filter(item => item.trim() !== '');
    }

    // Function to display schedule in the modal
    function displayModalSchedule() {
        const modalScheduleList = document.getElementById('modalScheduleList');
        let timings = document.getElementById('scheduleList').children;
        modalScheduleList.innerHTML = '';

        for (const time of timings) {
            console.log(time.textContent);
        }



        // Get existing schedule data from the hidden input field
        const existingScheduleInput = document.getElementById('existingScheduleInput');
        const existingSchedule = existingScheduleInput.value.split(';').filter(item => item.trim() !== '');
        const populateModalItems = (items) => {
            items.forEach(item => {
                const [dayOfWeek, startTime, endTime] = item.split(':');
                const scheduleItem = `${dayOfWeek}: ${startTime} - ${endTime}`;

                const listItem = document.createElement('li');
                listItem.textContent = scheduleItem;

                // Create a remove button
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '&times;';
                removeBtn.className = 'ml-2 text-red-600 hover:text-red-800 focus:outline-none';

                // Event listener for removing the schedule item
                removeBtn.addEventListener('click', () => {
                    const index = existingSchedule.indexOf(item);
                    if (index !== -1) {
                        existingSchedule.splice(index, 1);
                        // Update the hidden input field with the new schedule data
                        existingScheduleInput.value = existingSchedule.join(';');
                        // Refresh the displayed schedule in the modal
                        displayModalSchedule();
                    }
                });

                // Append the remove button to the schedule item
                listItem.appendChild(removeBtn);
                modalScheduleList.appendChild(listItem);
            });
            populateModalItems(existingSchedule);
        }
    }


    // Edit Schedule Modal
    const scheduleModal = document.getElementById('scheduleModal');
    const editScheduleBtn = document.getElementById('editScheduleBtn');
    const closeScheduleModalBtn = document.getElementById('closeScheduleModalBtn');
    const dayOfWeekInput = document.getElementById('dayOfWeekInput');
    const startTimeInput = document.getElementById('startTimeInput');
    const endTimeInput = document.getElementById('endTimeInput');
    const addScheduleBtn = document.getElementById('addScheduleBtn');
    const saveScheduleModalBtn = document.getElementById('saveScheduleModalBtn');
    const cancelScheduleModalBtn = document.getElementById('cancelScheduleModalBtn');
    const existingScheduleInput = document.getElementById('existingScheduleInput');

    editScheduleBtn.addEventListener('click', () => {
        // Populate the modal with existing schedule data
        displayModalSchedule();

        // Show the modal
        scheduleModal.classList.remove('hidden');
    });

    closeScheduleModalBtn.addEventListener('click', () => {
        // Close the modal without saving changes
        scheduleModal.classList.add('hidden');
    });

    addScheduleBtn.addEventListener('click', () => {
        const dayOfWeek = dayOfWeekInput.value.trim();
        const startTime = startTimeInput.value.trim();
        const endTime = endTimeInput.value.trim();

        if (dayOfWeek !== '' && startTime !== '' && endTime !== '') {
            const newScheduleItem = `${dayOfWeek}: ${startTime} - ${endTime}`;

            // Get existing schedule data
            const existingSchedule = getExistingScheduleData();

            // Add the new schedule item
            existingSchedule.push(newScheduleItem);

            // Update the hidden input field with the new schedule data
            existingScheduleInput.value = existingSchedule.join(';');

            // Clear the input fields
            dayOfWeekInput.value = '';
            startTimeInput.value = '';
            endTimeInput.value = '';

            // Update the modal's displayed schedule
            displayModalSchedule();
        }
    });

    saveScheduleModalBtn.addEventListener('click', () => {
        // Get the updated schedule data from the hidden input field
        const updatedSchedule = existingScheduleInput.value;

        // Update the main schedule section
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.innerHTML = ''; // Clear existing schedule items

        if (updatedSchedule) {
            const scheduleItems = updatedSchedule.split(';');
            scheduleItems.forEach(item => {
                const [dayOfWeek, timing] = item.split(': ');
                const listItem = document.createElement('li');
                listItem.className = 'flex justify-between p-2 bg-green-100 rounded mb-2';

                listItem.textContent = `${dayOfWeek}: ${timing}`;
                scheduleList.appendChild(listItem);
            });
        }

        // Close the modal
        scheduleModal.classList.add('hidden');
    });

    cancelScheduleModalBtn.addEventListener('click', () => {
        // Close the modal without saving changes
        scheduleModal.classList.add('hidden');
    });
});
