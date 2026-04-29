import { Box, Typography } from '@tactileentertainment/core-designsystem';
import { BAR_COLORS, type SignatureData } from '../types';

interface DesignTabProps {
  data: SignatureData;
  onChange: (updates: Partial<SignatureData>) => void;
}

export function DesignTab({ data, onChange }: DesignTabProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="body-2" sx={{ mb: 1.5, fontWeight: 500 }}>
          Bar Color
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {BAR_COLORS.map((color) => {
            const isSelected = data.barColor === color.value;
            return (
              <Box
                key={color.value}
                onClick={() => onChange({ barColor: color.value })}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  backgroundColor: color.value,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #1F2937' : '2px solid transparent',
                  outline: isSelected ? '2px solid #fff' : 'none',
                  '&:hover': { opacity: 0.8 },
                }}
                title={color.label}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
