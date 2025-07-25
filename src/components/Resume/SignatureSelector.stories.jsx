import React from 'react';
import SignatureSelector from './SignatureSelector.jsx';
import { SUBSCRIPTION_TIERS } from '../../services/featureGating.js';

export default {
  title: 'Resume/SignatureSelector',
  component: SignatureSelector,
  parameters: {
    layout: 'padded',
  },
};

const Template = (args) => {
  const [selectedFont, setSelectedFont] = React.useState(args.selectedFont || 'none');
  
  return (
    <SignatureSelector 
      {...args} 
      selectedFont={selectedFont}
      onFontChange={setSelectedFont}
    />
  );
};

export const FreeUser = Template.bind({});
FreeUser.args = {
  userName: 'John Doe',
  userSubscription: SUBSCRIPTION_TIERS.FREE,
  onUpgrade: () => alert('Upgrade modal would open here'),
};

export const PremiumUser = Template.bind({});
PremiumUser.args = {
  userName: 'Jane Smith',
  userSubscription: SUBSCRIPTION_TIERS.PROFESSIONAL,
  onUpgrade: () => alert('Already premium!'),
};

export const WithLongName = Template.bind({});
WithLongName.args = {
  userName: 'Alexander Christopher Montgomery III',
  userSubscription: SUBSCRIPTION_TIERS.PROFESSIONAL,
};

export const NoName = Template.bind({});
NoName.args = {
  userName: '',
  userSubscription: SUBSCRIPTION_TIERS.PROFESSIONAL,
};