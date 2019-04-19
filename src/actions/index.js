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
        toneRef.toMaster();
    break;

    default:
        console.error('unknown widget.type for:', widget);
  }

  return {
    ...widget,
    toneObject: toneRef
  }

}

export default {
  add: (/* event (e) */) => ({ num }) => ({ num: num + 1 }),
  // sub: (/* event (e) */) => ({ num }) => ({ num: num - 1 }),

  createNetwork: ({newWidgets, newConnections}) => ({widgets, connections}) => {

    console.log(`creating network with ${newWidgets.length} widget(s) and ${newConnections.length} connection(s)...`);

    return {
      widgets: newWidgets.map(newWidget => addWidget(newWidget)),
      ...connections
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
    let startableWidgets = widgets.filter(w => w.toneObject && w.toneObject.start !== undefined);
    console.log('found', startableWidgets.length, 'startable widgets...');
    
    startableWidgets.forEach(w => w.toneObject.start());

    return { ...widgets };
  },

  stopAll: () => ({ widgets }) => {
    let stoppableWidgets = widgets.filter(w => w.toneObject && w.toneObject.start !== undefined);
    console.log('found', stoppableWidgets.length, 'stoppable widgets...');
    
    stoppableWidgets.forEach(w => w.toneObject.stop());

    return { ...widgets };
  }

};
