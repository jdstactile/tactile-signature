import { Box, Tab, Tabs, Typography } from '@tactileentertainment/core-designsystem';
import { useState } from 'react';
import type { SignatureData } from '../types';
import { SignatureExport } from './SignatureExport';
import { SignaturePreview } from './SignaturePreview';

interface ExportPanelProps {
  data: SignatureData;
}

export function ExportPanel({ data }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Typography variant="h-4" sx={{ mb: 3 }}>
        Export
      </Typography>
      <Tabs
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        sx={{ mb: 3, minHeight: 'auto' }}
      >
        <Tab label="Preview" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
        <Tab label="Export" sx={{ textTransform: 'none', minHeight: 'auto', py: 1 }} />
      </Tabs>
      {activeTab === 0 && <SignaturePreview data={data} />}
      {activeTab === 1 && <SignatureExport data={data} />}
    </Box>
  );
}
