import { h } from 'hyperapp';

const isMaster = (widget) => widget.type === 'Tone.Master'

const widgetJSON = (widgets) => JSON.stringify(widgets.map(w => ({ ...w, toneRef: '_hidden'})));

export default ({widgets, connections, start, stop}) => (
    <div>
      <h2>Toybox</h2>

      <div>

        <h3>widgets</h3>
        <code>
            {widgetJSON(widgets)}
        </code> 

        <h3>connections</h3>
        <code>
            {JSON.stringify(connections)}
        </code>
      </div>

      <div>
          <button onclick={() => start() }>Start</button>
          <button onclick={() => stop() }>Stop</button>
      </div>
    </div>
  );
  