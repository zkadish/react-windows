import React from 'react';

import CreateWindowz from './CreateWindowz';
import WindowzHandler from './WindowzHandler';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <CreateWindowz />
        <WindowzHandler />
      </div>
    );
  }
}

export default App;
