import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/results', element: <Results /> },
  { path: '/history', element: <History /> },
]);

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider router={router} />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
