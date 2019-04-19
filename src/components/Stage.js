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
    {
      id: 2,
      name: 'Noise',
      type: 'Tone.Noise'
    },
    {
      id: 3,
      name: 'LowPassFilter',
      type: 'Tone.Filter'
    }
  ],

  connections: [
    {
      from: {
        id: 1
      },
      to: {
        id: 0
      }
    },
    {
      from: {
        id: 2
      },
      to: {
        id: 3
      }
    },
    {
      from: {
        id: 3
      },
      to: {
        id: 0
      }
    }
  ]
}

export const view = (state, actions) => (
    <div
      className="stage"
      oncreate={() => actions.createNetwork({newWidgets: dummyData.widgets, newConnections: dummyData.connections})} 
    >
      <h1>Stage</h1>
      <p>
          <Toybox 
            widgets={state.widgets} connections={state.connections} 
            start={actions.startAll} stop={actions.stopAll}
          />
      </p>
    </div>
  );
  