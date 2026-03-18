import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Hub from './pages/Hub';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import History from './pages/History';
import MbtiHome from './pages/mbti/MbtiHome';
import MbtiQuiz from './pages/mbti/MbtiQuiz';
import MbtiResults from './pages/mbti/MbtiResults';
import BigFiveHome from './pages/bigfive/BigFiveHome';
import BigFiveQuiz from './pages/bigfive/BigFiveQuiz';
import BigFiveResults from './pages/bigfive/BigFiveResults';

const router = createBrowserRouter([
  { path: '/', element: <Hub /> },
  { path: '/enneagram', element: <Home /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/results', element: <Results /> },
  { path: '/mbti', element: <MbtiHome /> },
  { path: '/mbti/quiz', element: <MbtiQuiz /> },
  { path: '/mbti/results', element: <MbtiResults /> },
  { path: '/bigfive', element: <BigFiveHome /> },
  { path: '/bigfive/quiz', element: <BigFiveQuiz /> },
  { path: '/bigfive/results', element: <BigFiveResults /> },
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
