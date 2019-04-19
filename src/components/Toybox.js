import { h } from 'hyperapp';

const isMaster = (widget) => widget.type === 'Tone.Master'


export default ({widgets, connections, createNetwork}) => (
    <div oncreate={() => createNetwork({newWidgets: widgets, newConnections: connections})}>
      <h2>Toybox</h2>
      <div>
          <h3>Widgets</h3>
          <code>
              {JSON.stringify(widgets)}
          </code>
          <h3>Connections</h3>
          <code>
              {JSON.stringify(connections)}
          </code>
      </div>
    </div>
  );
  