import { mkdir, writeFile } from '../utils/fs';

const indexTsx = (appName: string) => `
import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return (
    <div className="App">
      <p>${appName}</p>
    </div>
  );
};

render(
  <App />,
  document.querySelector('#root')
);
`.trim();

export const generateIndexScript = async (appName: string) => {
  await mkdir('src')
  writeFile('src/index.tsx', indexTsx(appName));
};
