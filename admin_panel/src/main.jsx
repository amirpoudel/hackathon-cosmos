import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from 'src/theme';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <ThemeProvider>
        <Suspense>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </HelmetProvider>
);
