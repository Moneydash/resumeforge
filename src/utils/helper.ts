import type { TemplateType } from "@/types/types.template-types";

// Function to format dates from YYYY-MM to Month YYYY format
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present';

  try {
    // Handle YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    // Handle YYYY format (just the year)
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }

    // Return as is if it's already formatted or in a different format
    return dateString;
  } catch (error) {
    // Return original string if there's an error in parsing
    return dateString;
  }
};

export const parseMonthYear = (dateString: string): string => {
  if (!dateString) return '';

  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString; // for invalid dates

  let month = d.toLocaleDateString('default', { month: 'long' });
  let year = d.getFullYear();

  dateString = `${month} ${year}`

  // If not matched, return original string
  return dateString;
};

export const stringToArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
};

export const pdfPayload = (data: object, htmlContent: string, template: TemplateType) => {
  const fullHtml = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `

  const payload = {
    html: fullHtml,
    data: data,
    template: template
  }

  return payload;
}