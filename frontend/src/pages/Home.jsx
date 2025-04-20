import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import AboutBuckySection from '../components/AboutBucky';
import ExploreSection from '../components/ExploreSection';
import ScrollCue from '../components/utils/ScrollCue';

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AboutBuckySection />
      <ExploreSection />
    </Box>
  );
};

export default HomePage;