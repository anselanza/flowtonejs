import { app } from 'hyperapp';
import '../styles/app.css';
import actions from './actions';
import state from './state';
// import view from './components/Counter';
import { view } from './components/Stage';

const appArgs = [state, actions, view, document.getElementById('app')];

function onMount(main) {

  /**
   * Hyperapp wires your actions so the view is re-rendered every time the state
   * changes as a result of calling any action. This object is useful because it
   * allows you to talk to your app from another app, framework, vanilla JS, etc.
   *
   * Here is an example on CodePen: https://codepen.io/selfup/pen/jLMRjO
   */

}

let main;

if (process.env.NODE_ENV !== 'production') {
  import('hyperapp-redux-devtools').then((devtools) => {
    main = devtools(app)(...appArgs);

    onMount(main);
  });
} else {
  main = app(...appArgs);

  onMount(main);
}
