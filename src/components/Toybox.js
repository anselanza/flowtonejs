// Library imports
import { h } from 'hyperapp';
import Fabric from 'fabric';

// Our imports
import { widgetJSON} from '../utils';

const draw = (widgets, connections) => {
  if (widgets.length == 0) {
    console.log('Toybox: nothing to draw!');
    return;
  }

  console.log('ready to draw!');
  const canvas = new fabric.Canvas('toybox-canvas', {
    width: 1024,
    height: 768,
    backgroundColor: '#ddd'
  });

  widgets.forEach((widget, index) => {
    const fabricRef = widget.fabricRef;
    if (fabricRef) {
      const width = fabricRef.get('width');
      fabricRef.left = width/2 + width * index * 1.5;
      fabricRef.top = width/2;
      canvas.add(fabricRef);
    }
    // const box = new fabric.Rect({
    //   left: size/2 + index * size * 1.5,
    //   top: size/2,
    //   fill: 'red',
    //   width: size,
    //   height: size
    // });
    // canvas.add(box);
  });

}

export default ({widgets, connections, start, stop}) => (
    <div oncreate={draw(widgets, connections)}>
      <h2>Toybox</h2>

      <div className="debug">

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

        <div>
            <button onclick={() => start() }>Start</button>
            <button onclick={() => stop() }>Stop</button>
        </div>

        <canvas id="toybox-canvas"/>

      </div>


    </div>
  );
  