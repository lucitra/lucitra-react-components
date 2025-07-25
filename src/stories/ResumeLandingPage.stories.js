import ResumeLandingPage from '../components/Resume/ResumeLandingPage.jsx';

export default {
  title: 'Resume/Landing Page',
  component: ResumeLandingPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {
    onGetStarted: () => console.log('Get started clicked'),
  },
};