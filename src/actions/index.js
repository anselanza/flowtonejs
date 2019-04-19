import * as Tone from 'tone';

const addWidget = widget => {
  let toneRef;

  switch(widget.type) {
    case 'Tone.Master':
        // created on initialisation by ToneJS
    break;

    case 'Tone.Oscillator':
        console.log('create oscillator');
        toneRef = new Tone.Oscillator();
    break;

    default:
        console.error('unknown widget.type for:', widget);
  }

  return {
    ...widget,
    toneRef
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
          console.log('destination master; connect', source.name, 'to Tone.Master');
            source.toneRef.connect(Tone.Master);
        }
    }

  return {
    ...connection
  }
}

export default {
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  // sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),

  createNetwork: ({newWidgets, newConnections}) => ({widgets, connections}) => {

    console.log(`creating network with ${newWidgets.length} widget(s) and ${newConnections.length} connection(s)...`);

    let widgetInstances = newWidgets.map(newWidget => addWidget(newWidget));
    let connectionInstances = newConnections.map(newConnection => addConnection(newConnection, widgetInstances));

    return {
      widgets: widgetInstances,
      connections: connectionInstances
    };

    // widgets.forEach(widget => {
    //   switch(widget.type) {
    //       case 'Tone.Master':
    //           // created on initialisation by ToneJS
    //       break;

    //       case 'Tone.Oscillator':
    //           console.log('create oscillator');
    //           let osc = new Tone.Oscillator();
    //           widgetsList.push(osc);
    //       break;

    //       default:
    //           console.error('unknown widget.type for:', widget);
    //   }
    // });

  //   connections.forEach(connection => {
  //       const source = widgets.find(w => w.id === connection.from.id);
  //       const destination = widgets.find(w => w.id === connection.to.id);

  //       if (destination === undefined || source === undefined) {
  //           console.error('cannot find source and/or destination for connection', connection);
  //       } else {
  //           if (isMaster(destination)) {
  //               source.connect(Tone.Master);
  //           }
  //       }
  //   });
  },

  startAll: () => ({ widgets }) => {
    let startableWidgets = widgets.filter(w => w.toneRef && w.toneRef.start !== undefined);
    console.log('found', startableWidgets.length, 'startable widgets...');
    
    startableWidgets.forEach(w => w.toneRef.start());

    return { ...widgets };
  },

  stopAll: () => ({ widgets }) => {
    let stoppableWidgets = widgets.filter(w => w.toneRef && w.toneRef.start !== undefined);
    console.log('found', stoppableWidgets.length, 'stoppable widgets...');
    
    stoppableWidgets.forEach(w => w.toneRef.stop());

    return { ...widgets };
  }

};
