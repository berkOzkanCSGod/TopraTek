/*eslint-disable*/

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVya296a2FuIiwiYSI6ImNreWVzZngxNTFiczQyb3BiMWl0MmhheGEifQ.h9Il5KFECwOawPRMOEHYpg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [32.8597, 39.9334],
    zoom: 12
});

const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    },
    defaultMode: 'draw_polygon'
});



export default {
    map,
    draw
}