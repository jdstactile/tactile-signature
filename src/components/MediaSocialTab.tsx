import { CheckCircle, FileUpload } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@tactileentertainment/core-designsystem';
import { useCallback, useRef } from 'react';
import { AVATAR_PRESETS, type SignatureData } from '../types';

interface MediaSocialTabProps {
  data: SignatureData;
  onChange: (updates: Partial<SignatureData>) => void;
}

export function MediaSocialTab({ data, onChange }: MediaSocialTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
        onChange({ profileImageUrl: canvas.toDataURL('image/jpeg', 0.8) });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    },
    [onChange],
  );

  const handleSelectAvatar = (path: string) => {
    onChange({ profileImageUrl: path });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Box>
        <Typography variant="body-2" sx={{ mb: 1.5, fontWeight: 500 }}>
          Profile Image
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
          {AVATAR_PRESETS.map((avatar) => {
            const isSelected = data.profileImageUrl === avatar.path;
            return (
              <Box
                key={avatar.id}
                onClick={() => handleSelectAvatar(avatar.path)}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: isSelected ? '3px solid #4F46E5' : '3px solid transparent',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  '&:hover': { opacity: 0.85 },
                }}
                title={avatar.label}
              >
                <img
                  src={avatar.path}
                  alt={avatar.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      color: '#4F46E5',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 18 }} />
                  </Box>
                )}
              </Box>
            );
          })}
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              cursor: 'pointer',
              border: '2px dashed #D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              '&:hover': { borderColor: '#9CA3AF', backgroundColor: '#F9FAFB' },
            }}
            title="Upload your own"
          >
            <FileUpload sx={{ color: '#9CA3AF', fontSize: 24 }} />
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Box>

        {data.profileImageUrl && !AVATAR_PRESETS.some((a) => a.path === data.profileImageUrl) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <img
              src={data.profileImageUrl}
              alt="Custom avatar"
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
            />
            <Typography variant="body-3" sx={{ color: 'text.secondary' }}>
              Custom image selected
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => onChange({ profileImageUrl: '' })}
              sx={{ textTransform: 'none', ml: 'auto' }}
            >
              Clear
            </Button>
          </Box>
        )}

        <TextField
          label="Or enter image URL"
          value={
            AVATAR_PRESETS.some((a) => a.path === data.profileImageUrl) ||
            data.profileImageUrl.startsWith('data:')
              ? ''
              : data.profileImageUrl
          }
          onChange={(e) => onChange({ profileImageUrl: e.target.value })}
          placeholder="https://example.com/photo.jpg"
          fullWidth
          helperText="Uploaded images are embedded as base64. Gmail re-hosts them automatically when pasted via 'Copy for Gmail'."
        />
      </Box>

      <Box>
        <Typography variant="body-2" sx={{ mb: 1.5, fontWeight: 500 }}>
          Social Links
        </Typography>
        <TextField
          label="LinkedIn profile URL"
          value={data.linkedinUrl}
          onChange={(e) => onChange({ linkedinUrl: e.target.value })}
          placeholder="https://linkedin.com/in/username"
          fullWidth
        />
      </Box>
    </Box>
  );
}
