import AuthModal from '../components/Resume/AuthModal.jsx';

export default {
  title: 'Resume/Auth Modal',
  component: AuthModal,
  argTypes: {
    initialMode: {
      control: 'select',
      options: ['signin', 'signup'],
    },
  },
};

export const SignIn = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onAuth: (data) => console.log('Auth submitted:', data),
    initialMode: 'signin',
  },
};

export const SignUp = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onAuth: (data) => console.log('Auth submitted:', data),
    initialMode: 'signup',
  },
};