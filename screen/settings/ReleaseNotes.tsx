import React from 'react';
import { ScrollView } from 'react-native';

import { BlueText } from '../../BlueComponents';
import BlueCard from '../../components/BlueCard';

const ReleaseNotes: React.FC = () => {
  const notes = require('../../release-notes');

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      <BlueCard>
        <BlueText>{notes}</BlueText>
      </BlueCard>
    </ScrollView>
  );
};

export default ReleaseNotes;
