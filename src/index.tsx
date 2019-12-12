import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import Slider from './Slider';

const DebugDivs = createGlobalStyle`
  * div {
    border: 0.5px solid black;
  }
`;

const App = () => (
  <div>
    <DebugDivs />
    <div style={{ width: '80%', margin: '40px auto' }}>
      <Slider>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '1041px',
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              fontWeight: 'bold',
              fontSize: 32,
            }}
          >
            {index + 1}
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#rootApp'),
);
