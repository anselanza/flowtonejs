import { h } from 'hyperapp';

const createNetwork = ({ widgets, connections }) => {
    console.log(`creating network with ${widgets.length} widget(s) and ${connections.length} connection(s)...`);
}

export default ({widgets, connections}) => (
    <div oncreate={() => createNetwork({widgets, connections})}>
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
  