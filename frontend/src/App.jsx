import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import Footer from './components/utils/Footer';
import Home from './pages/Home';
import Part1ReactTable from './pages/Part1ReactTable';
import Part1Notes from './pages/Part1ReactTable/NotesPart1';
import Part2ApiMock from './pages/Part2ApiMock';
import Part2Notes from './pages/Part2ApiMock/NotesPart2';
import Part3CustomLists from './pages/Part3CustomLists';
import Part3Notes from './pages/Part3CustomLists/NotesPart3';
import SkillShowCaseHome from './pages/skillSetsHomePage/skillSetsIntroduction';
import WorkExperiencePage from './pages/WorkNProjects/WorkExperiencePage';
import ProjectLandingPage from './pages/WorkNProjects/ProjectPage';

import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      >
      <NavBar />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skill-show-case" element={<SkillShowCaseHome />} />
          <Route path="/work" element={<WorkExperiencePage />} />
          <Route path="/projects" element={<ProjectLandingPage />} />
          <Route path="/part-1-react-table" element={<Part1ReactTable />} />
          <Route path="/submit-data" element={<Part2ApiMock />} />
          <Route path="/custom-lists" element={<Part3CustomLists />} />
          <Route path="/part-1-notes" element={<Part1Notes />} />
          <Route path="/part-2-notes" element={<Part2Notes />} />
          <Route path="/part-3-notes" element={<Part3Notes />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
    </BrowserRouter>
  );
}

export default App;