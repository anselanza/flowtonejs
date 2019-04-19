import { h } from 'hyperapp';

export default ({widgets, connections}) => (
    <div>
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
  