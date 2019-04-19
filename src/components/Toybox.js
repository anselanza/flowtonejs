import { h } from 'hyperapp';
import { widgetJSON} from '../utils';

const isMaster = (widget) => widget.type === 'Tone.Master'

export default ({widgets, connections, start, stop}) => (
    <div>
      <h2>Toybox</h2>

      <div>

        <h3>widgets</h3>
        <code>
            {JSON.stringify(widgets.map(w => widgetJSON(w))) }
        </code> 

        <h3>connections</h3>
        <code>
            {JSON.stringify(connections, null, 4)}
        </code>
      </div>

      <div>
          <button onclick={() => start() }>Start</button>
          <button onclick={() => stop() }>Stop</button>
      </div>
    </div>
  );
  