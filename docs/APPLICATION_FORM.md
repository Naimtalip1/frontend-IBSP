# Job Application Form

A comprehensive multi-step job application form built with Next.js 15, React 19, and TypeScript.

## Features

### 7-Step Application Process

1. **Personal Information**
   - Full name, IC/Passport number
   - Date of birth, gender, nationality
   - Race/ethnicity (optional)
   - Marital status
   - Contact details (phone, email)
   - Current and permanent addresses
   - Expected salary
   - Preferred position

2. **Education Background**
   - Highest qualification
   - Field of study
   - Institution/University name
   - Year graduated
   - CGPA/Grade
   - Additional certifications (dynamic list)

3. **Employment History**
   - Multiple employment entries
   - Company name and position
   - Duration (start/end dates)
   - Currently working checkbox
   - Key responsibilities
   - Reason for leaving
   - Reference person details

4. **Skills & Competencies**
   - Technical skills (dynamic tags)
   - Soft skills (dynamic tags)
   - Languages with proficiency levels
   - Additional competencies/licenses

5. **Supporting Documents**
   - Resume/CV (required)
   - Cover letter (optional)
   - Academic certificates (multiple files)
   - IC/Passport copy (required)
   - Portfolio (optional)

6. **References**
   - Multiple reference entries (minimum 2 recommended)
   - Referee name and relationship
   - Company/Position
   - Contact details (phone and email)

7. **Declaration**
   - Declaration statement
   - Privacy notice
   - Agreement checkbox
   - Digital signature
   - Date

## Key Features

- **Multi-step Navigation**: Progress indicator with step completion status
- **Form Validation**: Required field validation with visual feedback
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **File Upload**: Support for PDF, DOC, DOCX, and image files
- **Dynamic Lists**: Add/remove multiple entries for certifications, skills, employment, references
- **Progress Tracking**: Visual indicators for completed steps
- **Auto-fill Options**: Checkbox to copy current address to permanent address
- **Date Validation**: Date pickers for birth date, employment dates, etc.

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React useState hooks
- **Form Handling**: Native HTML5 form validation

## Project Structure

```
src/
├── app/
│   └── apply/
│       └── page.tsx          # Main application form page
├── components/
│   └── application/
│       ├── PersonalInfoForm.tsx
│       ├── EducationForm.tsx
│       ├── EmploymentHistoryForm.tsx
│       ├── SkillsForm.tsx
│       ├── DocumentsForm.tsx
│       ├── ReferencesForm.tsx
│       └── DeclarationForm.tsx
├── types/
│   └── application.ts        # TypeScript interfaces
└── utils/
    └── formHelpers.ts        # Helper functions
```

## Usage

### Access the Application Form

Navigate to `/apply` to access the job application form.

### Navigation

- Use **Next** button to proceed to the next step
- Use **Previous** button to go back
- Progress bar shows completion status
- Green checkmarks indicate completed sections

### Form Submission

1. Complete all required fields (marked with *)
2. Upload all required documents
3. Add at least 2 references (recommended)
4. Read and agree to the declaration
5. Provide digital signature
6. Click **Submit Application**

## Form Validation

### Required Sections
- Personal Information: All fields except race/ethnicity
- Education: All fields except additional certifications
- Employment: Can be empty (for fresh graduates)
- Skills: At least 1 technical skill, 1 soft skill, 1 language
- Documents: Resume, academic certificates, IC/Passport copy
- References: Minimum 2 references recommended
- Declaration: Agreement checkbox, signature, and date

### File Upload Limits
- Resume/CV: PDF, DOC, DOCX up to 10MB
- Cover Letter: PDF, DOC, DOCX up to 10MB
- Academic Certificates: PDF or images, multiple files
- IC/Passport Copy: PDF or image up to 5MB
- Portfolio: PDF or ZIP up to 20MB

## Utility Functions

The `formHelpers.ts` file includes:
- `saveFormDraft()`: Save progress to localStorage
- `loadFormDraft()`: Load saved progress
- `clearFormDraft()`: Clear saved data
- `isValidEmail()`: Email validation
- `isValidPhone()`: Phone number validation
- `formatFileSize()`: Display file sizes
- `createFormDataForSubmission()`: Prepare data for API submission
- `calculateCompletionPercentage()`: Track form completion

## Future Enhancements

- [ ] Auto-save progress to localStorage
- [ ] Resume from saved draft
- [ ] Email verification
- [ ] Phone number verification via OTP
- [ ] File preview before upload
- [ ] PDF generation of submitted application
- [ ] Application status tracking
- [ ] Multi-language support
- [ ] Dark mode support

## API Integration

To connect to a backend API, modify the `handleSubmit` function in `src/app/apply/page.tsx`:

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const formData = createFormDataForSubmission(formData);
  
  try {
    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      alert('Application submitted successfully!');
      clearFormDraft();
    } else {
      alert('Error submitting application. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting application. Please try again.');
  }
};
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Support

For assistance, contact: support@jobportal.com
