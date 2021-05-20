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
        label: 'Review / Mentee Analytics',
        backgroundColor: '#21D883',
        borderColor: '#21D883',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};
// </block:setup>

// <block:config:0>
const config = {
    type: 'line',
    data,
    options: {}
};
// </block:config>

module.exports = {
    actions: [],
    config: config,
};
