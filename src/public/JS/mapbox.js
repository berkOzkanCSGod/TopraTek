/*eslint-disable*/

mapboxgl.accessToken = '[api-key]';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [32.8597, 39.9334],
    zoom: 5.5
});

const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        trash: true
    },
    defaultMode: 'draw_polygon'
});

// map.on('style.load', () => {
// // Custom atmosphere styling
//     map.setFog({
//         'color': 'rgb(184,193,204)', // Pink fog / lower atmosphere
//         'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
//         'horizon-blend': 0.4 // Exaggerate atmosphere (default is .1)
//     });
//
//     map.addSource('mapbox-dem', {
//         'type': 'raster-dem',
//         'url': 'mapbox://mapbox.terrain-rgb'
//     });
//
//     map.setTerrain({
//         'source': 'mapbox-dem',
//         'exaggeration': 1.5
//     });
// });


export default {
    map,
    draw
}