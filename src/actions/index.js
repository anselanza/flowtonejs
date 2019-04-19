import * as Tone from 'tone';
import { widgetJSON } from '../utils';

import Fabric from 'fabric';

const addWidget = widget => {
  let toneRef;

  // Instantiate ToneJS object, and link as toneRef...
  switch(widget.type) {
    case 'Tone.Master':
        // created on initialisation by ToneJS
    break;

    case 'Tone.Oscillator':
        console.log('create oscillator');
        toneRef = new Tone.Oscillator();
    break;

    case 'Tone.Noise':
      console.log('create noise');
      toneRef = new Tone.Noise();
    break;

    case 'Tone.Filter':
      console.log('create filter');
      toneRef = new Tone.Filter();
    break;

    default:
        console.error('unknown widget.type for:', widget);
  }

  // Instantiate Fabric object, and link as fabricRef...
  let fabricRef;
  const size = 100;
  fabricRef = new fabric.Rect({
    fill: 'red',
    width: size,
    height: size
  });

  return {
    ...widget,
    toneRef,
    fabricRef
  }

}

const isMaster = widget => widget.type === 'Tone.Master';

const addConnection = (connection, widgets) => {

  const source = widgets.find(w => w.id === connection.from.id);
  const destination = widgets.find(w => w.id === connection.to.id);

    if (destination === undefined || source === undefined) {
        console.error('cannot find source and/or destination for connection', connection);
    } else {
        if (isMaster(destination)) {
          console.log('destination master; connect', source.id, 'to Tone.Master');
            source.toneRef.connect(Tone.Master);
        } else {
          console.log('connect widget', source.id, 'to widget', destination.id);
          source.toneRef.connect(destination.toneRef);
        }
    }

  return {
    ...connection,
    meta: {
      source: widgetJSON(source), 
      destination: widgetJSON(destination)
    }
  }
}

export default {
  createNetwork: ({newWidgets, newConnections}) => ({widgets, connections}) => {

    console.log(`creating network with ${newWidgets.length} widget(s) and ${newConnections.length} connection(s)...`);

    // First, the side effects...
    let widgetInstances = newWidgets.map(newWidget => addWidget(newWidget));
    let connectionInstances = newConnections.map(newConnection => addConnection(newConnection, widgetInstances));

    // Then return the objects (with their "toneRef" property attached) into the state tree...
    return {
      widgets: widgetInstances,
      connections: connectionInstances
    };

  },

  startAll: () => ({ widgets }) => {
    let startableWidgets = widgets.filter(w => w.toneRef && w.toneRef.start !== undefined);
    console.log('found', startableWidgets.length, 'startable widgets...');
    
    startableWidgets.forEach(w => w.toneRef.start());

    // Side effects only here...
    return widgets;
  },

  stopAll: () => ({ widgets }) => {
    let stoppableWidgets = widgets.filter(w => w.toneRef && w.toneRef.start !== undefined);
    console.log('found', stoppableWidgets.length, 'stoppable widgets...');
    
    stoppableWidgets.forEach(w => w.toneRef.stop());

    // Side effects only here...
    return widgets;
  }

};
