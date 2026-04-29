import { Box, Tab, Tabs, Typography } from '@tactileentertainment/core-designsystem';
import { useState } from 'react';
import type { SignatureData } from '../types';
import { DesignTab } from './DesignTab';
import { InformationTab } from './InformationTab';
import { MediaSocialTab } from './MediaSocialTab';

interface EditorPanelProps {
  data: SignatureData;
  onChange: (updates: Partial<SignatureData>) => void;
}

export function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Typography variant="h-4" sx={{ mb: 3 }}>
        Editor
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        sx={{ mb: 3, minHeight: 'auto' }}
      >
        <Tab label="Information" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
        <Tab label="Design" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
        <Tab label="Media & Social" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
      </Tabs>
      {activeTab === 0 && <InformationTab data={data} onChange={onChange} />}
      {activeTab === 1 && <DesignTab data={data} onChange={onChange} />}
      {activeTab === 2 && <MediaSocialTab data={data} onChange={onChange} />}
    </Box>
  );
}
