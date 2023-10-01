// variables
const editModal = document.querySelector('#scheduleModal');

// functions



// populate data in modal
// vars
const addScheduleBtn = document.querySelector('#addScheduleBtn');
const dayInput = document.querySelector('#dayOfWeekInput');
const startTimeInput = document.querySelector('#startTimeInput');
const endTimeInput = document.querySelector('#endTimeInput');
const modalScheduleList = document.querySelector('#modalScheduleList');


// functions
const parseScheduleStr = ({ day, startTime, endTime }) => {
    let scheduleStr = `${day}: ${startTime} - ${endTime}`;
    return scheduleStr;
};



const populateModal = (scheduleStr, parsed = true) => {
    if (!parsed) {
        scheduleStr = parseScheduleStr(scheduleStr);
    };
    const scheduleItem = document.createElement('li');
    scheduleItem.className = 'flex justify-between bg-green-300 p-2 px-4 mb-2 rounded-md';
    scheduleItem.textContent = scheduleStr;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'x';
    deleteBtn.className = 'btn btn-primary text-red-500 ';
    deleteBtn.addEventListener('click', () => {
        let index = scheduleData.indexOf(scheduleStr);
        console.log("Before", scheduleData);
        scheduleData.splice(index, 1);
        console.log("Index", index);
        console.log("After", scheduleData);
        createModalElements(scheduleData);
    });
    scheduleItem.appendChild(deleteBtn);
    modalScheduleList.appendChild(scheduleItem);
};




let scheduleData = [];
const createModalElements = () => {
    modalScheduleList.innerHTML = '';
    for (const scheduleItem of scheduleData) {
        populateModal(scheduleItem);
    };
};

addScheduleBtn.addEventListener('click', () => {
    let newSchedule = {
        day: dayInput.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value
    };
    dayInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';

    let scheduleStr = parseScheduleStr(newSchedule);
    scheduleData.push(scheduleStr);
    createModalElements(scheduleData);
});


const scheduleList = document.querySelector('#scheduleList'); // old data from schedule section
const editScheduleBtn = document.querySelector('#editScheduleBtn');
editScheduleBtn.addEventListener('click', () => {
    for (const timing of scheduleList.children) {
        scheduleData.push(timing.textContent);
    }
    createModalElements(scheduleData);
    openModal()
});

const openModal = () => {
    editModal.classList.remove('hidden');
};

const closeModal = () => {
    editModal.classList.add('hidden');
    scheduleData = [];
};

// closeBtnHandler
const closeModalBtn = document.querySelector('#closeScheduleModalBtn');
const cancelModalBtn = document.querySelector('#cancelScheduleModalBtn');
closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);


// send Schedule to server
const sendScheduleToServer = (scheduleData) => {
    const url = 'http://localhost:3000/api/schedule';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleData)
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};


const saveScheduleBtn = document.querySelector('#saveScheduleModalBtn');
saveScheduleBtn.addEventListener('click', () => {
    scheduleList.innerHTML = '';
    sendScheduleToServer(scheduleData);
    for (const scheduleItem of scheduleData) {
        let timing = document.createElement('li');
        timing.textContent = scheduleItem;
        scheduleList.appendChild(timing);
    };
    closeModal();
    scheduleData = [];
});