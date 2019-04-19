import { h } from 'hyperapp';
import Toybox from './Toybox';

export const view = (state, actions) => (
    <div>
      <h1>Stage</h1>
      <p>
          <Toybox widgets={state.widgets} connections={state.connections} />
      </p>
    </div>
  );
  