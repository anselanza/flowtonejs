// Library imports
import { h } from 'hyperapp';
import Fabric from 'fabric';

// Our imports
import { widgetJSON} from '../utils';

const draw = () => {
  console.log('draw!');
  const canvas = new fabric.Canvas('c');

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });

  canvas.add(rect);
}

export default ({widgets, connections, start, stop}) => (
    <div oncreate={draw()}>
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

      <canvas id="c"/>

      <div>
          <button onclick={() => start() }>Start</button>
          <button onclick={() => stop() }>Stop</button>
      </div>
    </div>
  );
  