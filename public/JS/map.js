document.addEventListener('DOMContentLoaded', function () {
    const addLocationContainer = document.getElementById("add-loc-btn");
    const addLocDisplay = document.getElementById("add-loc-display");
    const addLocForm = document.getElementById("add-loc-form");
    const cancelBtn = document.getElementById("cancel-add-loc-btn");

    addLocationContainer.addEventListener('click', async function () {
        if (addLocationContainer.classList.contains('clicked')) {
            await addLocation(addLocForm);
            addLocDisplay.classList.toggle('hide');
        } else {
            addLocDisplay.classList.toggle('hide');
        }
        cancelBtn.classList.toggle('hide');
        addLocationContainer.classList.toggle('clicked');
    });

    cancelBtn.addEventListener('click', function () {
        addLocDisplay.classList.toggle('hide');
        cancelBtn.classList.toggle('hide');
        addLocationContainer.classList.toggle('clicked');
    })


    async function addLocation(form) {
        try {
            const formD = new FormData(form);
            const payload = {};
            const sidebar = document.getElementById("sidebar");
            for (let pair of formD.entries()) {
                payload[pair[0]] = pair[1];
            }

            const response = await fetch('/addLocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            sidebar.outerHTML = await response.text();
        } catch (error) {
            console.error('Error:', error);
        }
    }



    function setupRadioBtnListener(radioBtn, section) {
        radioBtn.addEventListener("change", () => {
            console.log(`clicked ${radioBtn}`);
            if (radioBtn.checked) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    }

    const currentCropRadioBtn = document.getElementById("currentCropChoiceBtn");
    const currentCropSection = document.getElementById("currentCrop");
    setupRadioBtnListener(currentCropRadioBtn, currentCropSection);

    const destinationRadioBtn = document.getElementById("destinationChoiceBtn");
    const destinationSection = document.getElementById("destinationSection");
    setupRadioBtnListener(destinationRadioBtn, destinationSection);

    const historyRadioBtn = document.getElementById("historyChoiceBtn");
    const historySection = document.getElementById("historySection");
    setupRadioBtnListener(historyRadioBtn, historySection);


    async function removeLocation(id, title, groupName) {

        const sidebar = document.getElementById("sidebar");
        const obj = {locationId: id, locationTitle: title, groupName: groupName}

        const response = await fetch('/removeLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        sidebar.outerHTML = await response.text();
    }



    document.body.addEventListener('click', async function (event) {

        const button = event.target;

        const isDelBtn = (button.name === 'del-btn') && (button.classList.contains('sidebar-action-button') || button.classList.contains('icon'));
        const isEditBtn =  (button.name === 'edit-btn') && (button.classList.contains('sidebar-action-button') || button.classList.contains('icon'));

        if (isDelBtn) {
            const id = button.getAttribute('data-location-id');
            const title = button.getAttribute('data-location-title');
            const groupName = button.getAttribute('data-location-groupName');
            await removeLocation(id, title, groupName);
        } else if (isEditBtn) {
            const id = button.getAttribute('data-loc-id');
            const groupName = button.getAttribute('data-group-name');
            await expandGroup(groupName, id)
        }
    });


    function expandGroup(groupName, id) {
        fetch(`/expandGroup/${groupName}`).then(() => {
            window.location.href = `/expandGroup/${groupName}?id=${id}`;
        });
    }














});
