import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Slider from './Slider';

const DebugDivs = createGlobalStyle`
  /* * div {
    border: 0.5px solid black;
  } */
`;

const ItemSlider = styled.div`
  background-color: #7ee496;

  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 32px;
  margin-right: 8px;
  width: calc(33.33333333333333333333333333333333333333% - calc(16px / 3));
  @media (min-width: 1024px) {
    margin-right: 15px;
    width: calc(25% - calc(45px / 4));
  }
`;

const App = () => (
  <div>
    <DebugDivs />
    <div style={{ width: '80%', margin: '40px auto' }}>
      <Slider>
        {Array.from({ length: 8 }).map((_, index) => (
          <ItemSlider className="my-custom-class" key={index}>
            <span>{index + 1}</span>
          </ItemSlider>
        ))}
      </Slider>

      <div style={{ marginTop: 40 }}>
        <Slider>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="my-custom-class-2"
              key={index}
              style={{
                backgroundColor: 'orange',
                width: '100%',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: 32,
              }}
            >
              <span>{index + 1}</span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#rootApp'),
);
