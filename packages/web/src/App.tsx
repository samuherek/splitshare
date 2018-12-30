import * as React from 'react';

import { Button, theme, ThemeProvider } from '@splitshare/ui';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
            <Button>Something</Button>
          </p>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
