


mapboxgl.accessToken = mapToken;
const cluster = new mapboxgl.Map({
    container: 'cluster',
    style: 'mapbox://styles/mapbox/dark-v10',
    // center: [-103.59179687498357, 40.66995747013945],
    center: [-115.1391, 36.1716],
    zoom: 9.5
});

cluster.on('load', function () {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    cluster.addSource('users', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ users
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: users,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    cluster.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'users',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#21D883',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    cluster.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'users',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    cluster.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'users',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    cluster.on('click', 'clusters', function (e) {
        const features = cluster.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        cluster.getSource('users').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                cluster.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    cluster.on('click', 'unclustered-point', function (e) {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(cluster);
    });

    cluster.on('mouseenter', 'clusters', function () {
        cluster.getCanvas().style.cursor = 'pointer';
    });
    cluster.on('mouseleave', 'clusters', function () {
        cluster.getCanvas().style.cursor = '';
    });
});
