// expose-loader doesn't work in a typescript file

// expose react for the server to use
import React from 'expose-loader?React!../node_modules/react';
import ReactDOM from 'expose-loader?ReactDOM!../node_modules/react-dom';
import ReactDOMServer from 'expose-loader?ReactDOMServer!../node_modules/react-dom/server';

// expose our components
import Components from 'expose-loader?Components!./serverComponents';
