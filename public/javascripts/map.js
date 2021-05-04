const num1 = parseFloat(coordinate1)
const num2 = parseFloat(coordinate2)

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [num1, num2], // starting position [lng, lat]
    zoom: 3 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([num1, num2])
    .setPopup(
        new mapboxgl.Popup({ offset: 20 })
            .setHTML(
                `<h4>${userName}</h4><p>${title}</p>`
            )
    )
    .addTo(map)