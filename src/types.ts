export interface AvatarPreset {
  id: string;
  label: string;
  path: string;
}

export const BAR_COLORS = [
  { label: 'Purple', value: '#5B21B6' },
  { label: 'Cyan', value: '#17B4C6' },
  { label: 'Light Cyan', value: '#5CC8D4' },
  { label: 'Red', value: '#E52750' },
  { label: 'Green', value: '#8BBF1B' },
  { label: 'Orange', value: '#F57216' },
];

export type CompanyEntity = 'tactile-dk' | 'tactile-uk';

export const COMPANY_OPTIONS: { value: CompanyEntity; label: string; invoiceText: string }[] = [
  {
    value: 'tactile-dk',
    label: 'Tactile DK',
    invoiceText: 'for invoices Tactile R&D . CVR 34050090',
  },
  {
    value: 'tactile-uk',
    label: 'Tactile UK',
    invoiceText: 'for invoices Tactile UK Ltd . Company No. 15345678',
  },
];

export const AVATAR_PRESETS: AvatarPreset[] = [
  { id: 'bb-happy', label: 'Best Fiends - Happy', path: '/avatars/bb-happy.png' },
  { id: 'cc-professor', label: 'Cookie Cats - Professor', path: '/avatars/cc-professor.png' },
  { id: 'cc-rita', label: 'Cookie Cats - Rita', path: '/avatars/cc-rita.png' },
  { id: 'lg-lily', label: "Lily's Garden - Lily", path: '/avatars/lg-lily.png' },
  { id: 'pm-captain', label: 'Pirate Masters - Captain', path: '/avatars/pm-captain.png' },
  { id: 'sc-eating', label: "Simon's Cat - Eating", path: '/avatars/sc-eating.png' },
];

export interface SignatureData {
  fullName: string;
  jobTitle: string;
  companyEntity: CompanyEntity;
  email: string;
  phone: string;
  showHiringBanner: boolean;
  hiringUrl: string;
  profileImageUrl: string;
  linkedinUrl: string;
  barColor: string;
  tactileIconUrl: string;
  tactileLogoUrl: string;
}

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  fullName: 'Lily Roberts',
  jobTitle: 'Accountant turned Gardener',
  companyEntity: 'tactile-dk',
  email: 'lily@tactile.dk',
  phone: '+1 (987) 654-3210',
  showHiringBanner: true,
  hiringUrl: 'https://tactilegames.com/careers',
  profileImageUrl: '/avatars/pm-captain.png',
  linkedinUrl: 'https://linkedin.com/in/lilyroberts',
  barColor: '#5B21B6',
  tactileIconUrl: '',
  tactileLogoUrl: '',
};
