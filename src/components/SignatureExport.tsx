import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box, Button, Typography } from '@tactileentertainment/core-designsystem';
import { useCallback, useMemo, useState } from 'react';
import type { SignatureData } from '../types';
import { generateSignatureHtml } from '../utils/generateSignatureHtml';

interface SignatureExportProps {
  data: SignatureData;
}

export function SignatureExport({ data }: SignatureExportProps) {
  const html = useMemo(() => generateSignatureHtml(data), [data]);
  const [copied, setCopied] = useState<'html' | 'rich' | null>(null);

  const handleCopyHtml = useCallback(async () => {
    await navigator.clipboard.writeText(html);
    setCopied('html');
    setTimeout(() => setCopied(null), 2000);
  }, [html]);

  const handleCopyRich = useCallback(async () => {
    const blob = new Blob([html], { type: 'text/html' });
    const plainBlob = new Blob([html], { type: 'text/plain' });
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': blob,
        'text/plain': plainBlob,
      }),
    ]);
    setCopied('rich');
    setTimeout(() => setCopied(null), 2000);
  }, [html]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button variant="contained" onClick={handleCopyRich} sx={{ textTransform: 'none' }}>
          {copied === 'rich' ? 'Copied!' : 'Copy for Gmail'}
        </Button>
        <Button variant="outlined" onClick={handleCopyHtml} sx={{ textTransform: 'none' }}>
          {copied === 'html' ? 'Copied!' : 'Copy HTML Source'}
        </Button>
      </Box>

      <Box
        sx={{
          p: 2,
          backgroundColor: '#F9FAFB',
          borderRadius: 1,
          border: '1px solid #E5E7EB',
        }}
      >
        <Typography variant="body-2" sx={{ fontWeight: 500, mb: 1 }}>
          How to use in Gmail:
        </Typography>
        <Typography
          variant="body-3"
          component="ol"
          sx={{ pl: 2, color: 'text.secondary', '& li': { mb: 0.5 } }}
        >
          <li>Click "Copy for Gmail" above</li>
          <li>Open Gmail Settings (gear icon) &rarr; See all settings</li>
          <li>Scroll to "Signature" section</li>
          <li>Create a new signature or edit an existing one</li>
          <li>Clear the signature editor, then paste (Ctrl+V / Cmd+V)</li>
          <li>Click "Save Changes" at the bottom</li>
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <IconButton
          aria-label="Copy HTML source"
          onClick={handleCopyHtml}
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <ContentCopy fontSize="small" />
        </IconButton>
        <Box
          component="pre"
          sx={{
            p: 2,
            pr: 5,
            backgroundColor: '#1F2937',
            color: '#E5E7EB',
            borderRadius: 1,
            fontSize: '12px',
            fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
            overflow: 'auto',
            maxHeight: 400,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {html}
        </Box>
      </Box>
    </Box>
  );
}
