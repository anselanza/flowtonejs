import { h } from 'hyperapp';

const isMaster = (widget) => widget.type === 'Tone.Master'

const widgetJSON = (widgets) => JSON.stringify(widgets.map(w => ({ ...w, toneRef: '_hidden'})));

export default ({widgets, connections, start, stop}) => (
    <div>
      <h2>Toybox</h2>
      <div>
            widgets: {widgetJSON(widgets)}; 
            connections: {JSON.stringify(connections)}
      </div>
      <div>
          <button onclick={() => start() }>Start</button>
          <button onclick={() => stop() }>Stop</button>
      </div>
    </div>
  );
  