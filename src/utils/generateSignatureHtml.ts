import { COMPANY_OPTIONS, type SignatureData } from '../types';

const FONT_FAMILY = 'Arial, Helvetica, sans-serif';
const ORANGE = '#EA580C';
const DARK_TEXT = '#1F2937';
const GRAY_TEXT = '#6B7280';
const LIGHT_GRAY_TEXT = '#9CA3AF';
const BORDER_COLOR = '#E5E7EB';
const WEBSITE = 'www.tactile.dk';
const WEBSITE_URL = 'https://www.tactile.dk';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildProfileImageCell(data: SignatureData): string {
  if (!data.profileImageUrl) return '';
  return `
          <td width="16" style="width: 16px; font-size: 0;">&nbsp;</td>
          <td width="100" style="vertical-align: top; padding-top: 0;">
            <img src="${escapeHtml(data.profileImageUrl)}" width="100" height="100" alt="${escapeHtml(data.fullName)}" style="border-radius: 50%; display: block; width: 100px; height: 100px; object-fit: cover;" />
          </td>`;
}

function buildLinkedInBadge(data: SignatureData): string {
  if (!data.linkedinUrl) return '';
  return `
                      <td style="vertical-align: middle;">
                        <a href="${escapeHtml(data.linkedinUrl)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                          <table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
                            <td width="32" height="32" align="center" style="background-color: ${ORANGE}; border-radius: 50%; width: 32px; height: 32px; text-align: center; vertical-align: middle;">
                              <a href="${escapeHtml(data.linkedinUrl)}" target="_blank" rel="noopener noreferrer" style="color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; font-family: ${FONT_FAMILY};">in</a>
                            </td>
                          </tr></table>
                        </a>
                      </td>`;
}

function buildHiringBanner(data: SignatureData): string {
  if (!data.showHiringBanner) return '';
  const href = data.hiringUrl || '#';
  return `
                      <td width="8" style="width: 8px; font-size: 0;">&nbsp;</td>
                      <td style="vertical-align: middle;">
                        <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                          <table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>
                            <td style="background-color: ${ORANGE}; border-radius: 16px; padding: 6px 16px;">
                              <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; font-family: ${FONT_FAMILY}; white-space: nowrap;">We're hiring</a>
                            </td>
                          </tr></table>
                        </a>
                      </td>`;
}

function buildSocialRow(data: SignatureData): string {
  const hasLinkedIn = !!data.linkedinUrl;
  const hasHiring = data.showHiringBanner;
  if (!hasLinkedIn && !hasHiring) return '';

  return `
              <tr><td height="12" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation"><tr>${buildLinkedInBadge(data)}${buildHiringBanner(data)}
                  </tr></table>
                </td>
              </tr>`;
}

function buildFooter(data: SignatureData): string {
  const hasIcon = !!data.tactileIconUrl;
  const hasLogo = !!data.tactileLogoUrl;
  const invoiceText =
    COMPANY_OPTIONS.find((c) => c.value === data.companyEntity)?.invoiceText ?? '';

  return `
    <tr>
      <td style="padding-top: 12px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid ${BORDER_COLOR}; width: 100%;" role="presentation">
          <tr>
            <td style="padding-top: 12px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" role="presentation">
                <tr>${
                  hasIcon
                    ? `
                  <td width="40" style="vertical-align: middle; width: 40px;">
                    <img src="${escapeHtml(data.tactileIconUrl)}" width="28" height="28" alt="Tactile" style="display: block; width: 28px; height: 28px;" />
                  </td>`
                    : ''
                }
                  <td style="vertical-align: middle;">
                    <a href="${WEBSITE_URL}" target="_blank" rel="noopener noreferrer" style="color: ${ORANGE}; text-decoration: none; font-size: 13px; font-family: ${FONT_FAMILY};">${WEBSITE}</a>
                    <br/>
                    <span style="color: ${LIGHT_GRAY_TEXT}; font-size: 12px; font-family: ${FONT_FAMILY};">${escapeHtml(invoiceText)}</span>
                  </td>${
                    hasLogo
                      ? `
                  <td width="100" style="text-align: right; vertical-align: middle; width: 100px;">
                    <img src="${escapeHtml(data.tactileLogoUrl)}" width="80" alt="Tactile" style="display: block; margin-left: auto; width: 80px;" />
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

export function generateSignatureHtml(data: SignatureData): string {
  const emailHref = `mailto:${escapeHtml(data.email)}`;
  const phoneHref = `tel:${escapeHtml(data.phone.replace(/\s/g, ''))}`;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: ${FONT_FAMILY}; border-collapse: collapse; color: ${DARK_TEXT}; max-width: 600px;" role="presentation">
  <tr>
    <td style="padding: 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;" role="presentation">
        <tr>
          <td width="8" style="background-color: ${escapeHtml(data.barColor)}; width: 8px; font-size: 0;">&nbsp;</td>
          <td width="16" style="width: 16px; font-size: 0;">&nbsp;</td>
          <td style="padding: 16px 0; vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0" role="presentation">
              <tr>
                <td style="font-size: 20px; font-weight: 700; color: ${DARK_TEXT}; text-transform: uppercase; letter-spacing: 1px; font-family: ${FONT_FAMILY}; line-height: 1.2;">
                  ${escapeHtml(data.fullName)}
                </td>
              </tr>
              <tr>
                <td style="font-size: 14px; color: ${GRAY_TEXT}; padding-top: 2px; font-family: ${FONT_FAMILY}; line-height: 1.4;">
                  ${escapeHtml(data.jobTitle)}
                </td>
              </tr>
              <tr><td height="12" style="font-size: 0; line-height: 0;">&nbsp;</td></tr>${
                data.email
                  ? `
              <tr>
                <td style="padding-bottom: 2px;">
                  <a href="${emailHref}" style="color: ${ORANGE}; text-decoration: none; font-size: 14px; font-family: ${FONT_FAMILY};">${escapeHtml(data.email)}</a>
                </td>
              </tr>`
                  : ''
              }${
                data.phone
                  ? `
              <tr>
                <td style="padding-bottom: 2px;">
                  <a href="${phoneHref}" style="color: ${ORANGE}; text-decoration: none; font-size: 14px; font-family: ${FONT_FAMILY};">${escapeHtml(data.phone)}</a>
                </td>
              </tr>`
                  : ''
              }${buildSocialRow(data)}
            </table>
          </td>${buildProfileImageCell(data)}
        </tr>
      </table>
    </td>
  </tr>${buildFooter(data)}
</table>`;
}
