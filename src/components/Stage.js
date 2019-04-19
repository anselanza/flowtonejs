import { h } from 'hyperapp';
import Toybox from './Toybox';

const dummyData = {
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
}

export const view = (state, actions) => (
    <div>
      <h1>Stage</h1>
      <p>
          <Toybox 
            widgets={dummyData.widgets} connections={dummyData.connections} 
            createNetwork={actions.createNetwork}
          />
      </p>
    </div>
  );
  