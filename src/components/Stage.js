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
    <div oncreate={() => actions.createNetwork({newWidgets: dummyData.widgets, newConnections: dummyData.connections})} >
      <h1>Stage</h1>
      <p>
          <Toybox 
            widgets={state.widgets} connections={state.connections} 
            createNetwork={actions.createNetwork}
          />
      </p>
    </div>
  );
  