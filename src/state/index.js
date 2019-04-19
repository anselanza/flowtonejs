export default {

    widgets: [
        {
            id: 0,
            name: 'Master',
            type: 'Tone.Master'
        },
        {
            id: 1,
            name: 'Oscillator',
            type: 'Tone.Oscillator'
        },
    ],

    connections: [
        {
            from: {
                id: 1
            },
            to: {
                id: 0
            }
        }
    ]

};
