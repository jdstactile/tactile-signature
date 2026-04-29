import { Box, Divider, Typography } from '@tactileentertainment/core-designsystem';
import { useCallback, useState } from 'react';
import { DEFAULT_SIGNATURE_DATA, type SignatureData } from '../types';
import { EditorPanel } from './EditorPanel';
import { ExportPanel } from './ExportPanel';

export function SignaturePage() {
  const [data, setData] = useState<SignatureData>(DEFAULT_SIGNATURE_DATA);

  const handleChange = useCallback((updates: Partial<SignatureData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          backgroundColor: '#ffffff',
        }}
      >
        <img src="/tactile-t.png" alt="Tactile" width={32} height={32} />
        <Typography variant="h-5">Tactile Signature</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          maxWidth: 1200,
          mx: 'auto',
          p: 4,
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            p: 3,
          }}
        >
          <EditorPanel data={data} onChange={handleChange} />
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            border: '1px solid #E5E7EB',
            p: 3,
          }}
        >
          <ExportPanel data={data} />
        </Box>
      </Box>
    </Box>
  );
}
