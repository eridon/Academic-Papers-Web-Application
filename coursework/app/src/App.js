import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import AuthorPage from './components/AuthorsPage';
import PapersPage from './components/PapersPage';
import AdminPage from './components/AdminPage';
import InteractivityTrack from './components/InteractivityTrack';
import FullpapersTrack from './components/FullpapersTrack';
import WipTrack from './components/WipTrack';
import CompetitionTrack from './components/CompetitionTrack';
import DoctoralTrack from './components/DoctoralTrack';
import RapidTrack from './components/RapidTrack';
import Documentation from './Documentation'
import Menu from './components/Menu';
import './components/App.css';

/**
 * The main App component that handles the routing and state management for the application
 * 
 * @returns {JSX.Element} - The main App component
 *
 * @author Eridon Keta - 20044984.
 */

function App() {
  // state variables 
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [update, setUpdated] = useState(0);

  /**
   * Handles changes to the authenticated state
   *
   * @param {bool} isAuthenticated - Whether the user is authenticated or not
   */
  const handleAuthenticated = (isAuthenticated) => { setAuthenticated(isAuthenticated) }

  // Fetches the papers data from the API 
  useEffect(() => {
    fetch("http://unn-w20044984.newnumyspace.co.uk/kf6012/coursework/api/papers")
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          setPapers(json.data)
          setLoading(false)
          console.log(json.data)
        }
      )
      .catch(
        (e) => {
          console.log(e.message)
        }
      )
  }, [update]);

  /**
   * Handles the update of the papers data from the admin page 
   */
  const handleUpdate = () => { setUpdated(update + 1) }

  /**
   * Renders the main App component.
   */
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/papers" >
          <Route index element={<PapersPage papers={papers} loading={loading} />} />
          <Route path="interactivity" element={<InteractivityTrack papers={papers} loading={loading} />} />
          <Route path="fullpapers" element={<FullpapersTrack papers={papers} loading={loading} />} />
          <Route path="wip" element={<WipTrack papers={papers} loading={loading} />} />
          <Route path="competition" element={<CompetitionTrack papers={papers} loading={loading} />} />
          <Route path="doctoral" element={<DoctoralTrack papers={papers} loading={loading} />} />
          <Route path="rapid" element={<RapidTrack papers={papers} loading={loading} />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminPage
              papers={papers}
              authenticated={authenticated}
              handleAuthenticated={handleAuthenticated}
              handleUpdate={handleUpdate}
            />
          }
        />
        <Route path="documentation" element={<Documentation />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;