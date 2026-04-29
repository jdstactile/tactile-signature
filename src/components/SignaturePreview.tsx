import { Box } from '@tactileentertainment/core-designsystem';
import { useMemo } from 'react';
import type { SignatureData } from '../types';
import { generateSignatureHtml } from '../utils/generateSignatureHtml';

interface SignaturePreviewProps {
  data: SignatureData;
}

export function SignaturePreview({ data }: SignaturePreviewProps) {
  const html = useMemo(() => generateSignatureHtml(data), [data]);

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        border: '1px solid #E5E7EB',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
