import mapbox from "./mapbox.js"



document.addEventListener('DOMContentLoaded', function () {
    const addLocationContainer = document.getElementById("add-loc-btn");
    const addLocDisplay = document.getElementById("add-loc-display");
    const addLocForm = document.getElementById("add-loc-form");
    const cancelBtn = document.getElementById("cancel-add-loc-btn");



    addLocationContainer.addEventListener('click', async function () {

        if (addLocationContainer.classList.contains('clicked')) {
            const geodata = mapbox.draw.getAll();
            await addLocation(addLocForm, geodata);

            toggleDrawControl(mapbox.map, mapbox.draw);
            addLocDisplay.classList.toggle('hide');
        } else {
            toggleDrawControl(mapbox.map, mapbox.draw);
            addLocDisplay.classList.toggle('hide');
        }
        cancelBtn.classList.toggle('hide');
        addLocationContainer.classList.toggle('clicked');
    });

    cancelBtn.addEventListener('click', function () {
        toggleDrawControl(mapbox.map, mapbox.draw);
        addLocDisplay.classList.toggle('hide');
        cancelBtn.classList.toggle('hide');
        addLocationContainer.classList.toggle('clicked');
    })

    function toggleDrawControl(map, draw) {
        if (map.hasControl(draw)) {
            map.removeControl(draw);
        } else {
            map.addControl(draw);
        }
    }

    function isValidShape(geoFeature) {
        return geoFeature.features[0].geometry.coordinates[0];
    }

    async function loadAreas() {
        const response = await fetch('/getGeoJson');
        if (response.ok) {
            const responseData = await response.json();

            for (const groupKey in responseData) {
                const group = responseData[groupKey];
                for (const location in group) {
                    createShape(group[location].locationTitle, group[location].source)
                }
            }
        } else {
            console.error("Error fetching data. Status:", response.status);
        }
    }


   mapbox.map.on('load', () => {
       loadAreas().then(r => console.log());
   })

    function createShape(title, feature) {
        mapbox.map.addSource(title, {
            'type': 'geojson',
            'data': feature
        })

        mapbox.map.addLayer({
            'id': title,
            'type': 'fill',
            'source': title,
            'layout': {},
            'paint': {
                'fill-color': '#0080ff',
                'fill-opacity': 0.3
            }
        });
        mapbox.map.addLayer({
            'id': title + '_outline',
            'type': 'line',
            'source': title,
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 3
            }
        });
    }

    function removeShape(title) {
        mapbox.map.removeLayer(title + '_outline');
        mapbox.map.removeLayer(title);
        mapbox.map.removeSource(title);
    }

    async function addLocation(form, geodata) {
        if (isValidShape(geodata)) {
            const locationTitle = document.getElementById('locationTitle').value;
            createShape(locationTitle, geodata);


            const formD = new FormData(form);
                const payload = {source: geodata};
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

        } else {
            console.log("is not valid shape");
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
        removeShape(title);
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
        const isGoToBtn = (button.name === 'goto-btn') && (button.classList.contains('sidebar-action-button') || button.classList.contains('icon'));
        if (isDelBtn) {
            const id = button.getAttribute('data-location-id');
            const title = button.getAttribute('data-location-title');
            const groupName = button.getAttribute('data-location-groupName');
            await removeLocation(id, title, groupName);
        } else if (isEditBtn) {
            const title = button.getAttribute('data-loc-id');
            const groupName = button.getAttribute('data-group-name');
            await expandGroup(groupName, title)
            // const loc = {locationTitle: title, groupName: groupName};
            // const response = await fetch('/getLocationGeoJson', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(loc)
            // })
            //
            // if (response.ok) {
            //     const responseData = await response.json();
            //     mapbox.draw.add(responseData)
            // } else {
            //     console.error("Error fetching data. Status:", response.status);
            // }

            toggleDrawControl(mapbox.map, mapbox.draw);

        } else if (isGoToBtn) {
            const lng =  button.getAttribute('data-location-lng');
            const lnt =  button.getAttribute('data-location-lnt');
            console.log({lng, lnt})
            mapbox.map.flyTo({
                center: [lng, lnt],
                zoom: 17,
                essential: true
            })
        }
    });


    async function expandGroup(groupName, id) {
        await fetch(`/expandGroup/${groupName}`).then(() => {
            window.location.href = `/expandGroup/${groupName}?id=${id}`;
        });
    }














});
