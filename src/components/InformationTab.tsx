import { MenuItem } from '@mui/material';
import { Box, Switch, TextField, Typography } from '@tactileentertainment/core-designsystem';
import { COMPANY_OPTIONS, type SignatureData } from '../types';

interface InformationTabProps {
  data: SignatureData;
  onChange: (updates: Partial<SignatureData>) => void;
}

export function InformationTab({ data, onChange }: InformationTabProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        label="Full Name"
        required
        value={data.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
        placeholder="Lily Roberts"
        fullWidth
      />
      <TextField
        label="Job Title"
        required
        value={data.jobTitle}
        onChange={(e) => onChange({ jobTitle: e.target.value })}
        placeholder="Accountant turned Gardener"
        fullWidth
      />
      <TextField
        label="Company"
        required
        select
        value={data.companyEntity}
        onChange={(e) =>
          onChange({ companyEntity: e.target.value as SignatureData['companyEntity'] })
        }
        fullWidth
      >
        {COMPANY_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Email address"
        required
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="lily@tactile.dk"
        fullWidth
      />
      <TextField
        label="Phone Number"
        required
        value={data.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
        placeholder="+1 (987) 654-3210"
        fullWidth
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Switch
          checked={data.showHiringBanner}
          onChange={(e) => onChange({ showHiringBanner: e.target.checked })}
        />
        <Typography variant="body-2">Hiring banner</Typography>
      </Box>
      {data.showHiringBanner && (
        <TextField
          label="Hiring URL"
          value={data.hiringUrl}
          onChange={(e) => onChange({ hiringUrl: e.target.value })}
          placeholder="https://tactilegames.com/careers"
          fullWidth
        />
      )}
    </Box>
  );
}
