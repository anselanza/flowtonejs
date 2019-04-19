import * as Tone from 'tone';

const addWidget = widget => {
  let toneObject;

  switch(widget.type) {
    case 'Tone.Master':
        // created on initialisation by ToneJS
    break;

    case 'Tone.Oscillator':
        console.log('create oscillator');
        toneObject = new Tone.Oscillator();
        toneObject.toMaster();
    break;

    default:
        console.error('unknown widget.type for:', widget);
  }

  return {
    ...widget,
    toneObject
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

  startNetwork: () => ({ widgets }) => {
    let startableWidgets = widget.filter(widget.start !== undefined);
    startableWidgets.forEach(w => w.start());

    return { ...widgets };
  }

};
