
// <block:setup:1>
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];
const data = {
    labels: labels,
    datasets: [{
        label: 'Mentee Analytics',
        backgroundColor: '#21D883',
        borderColor: '#21D883',
        data: [5, 10, 5, 25, 20, 30, 45],
    }]
};
// </block:setup>

// <block:config:0>
const config = {
    type: 'bar',
    data,
    options: {}
};
// </block:config>

module.exports = {
    actions: [],
    config: config,
};
