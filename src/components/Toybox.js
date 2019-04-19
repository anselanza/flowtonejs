import { h } from 'hyperapp';

const isMaster = (widget) => widget.type === 'Tone.Master'


export default ({widgets, connections, start}) => (
    <div>
      <h2>Toybox</h2>
      <div>
            widgets.length: {widgets.length}; 
            connections: {JSON.stringify(connections)}
      </div>
      <div>
          <button onclick={() => start() }>Start</button>
      </div>
    </div>
  );
  