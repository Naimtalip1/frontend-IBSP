# Job Application Form - Quick Start Guide

## 🚀 Getting Started

### Installation & Running

```powershell
# Navigate to project directory
cd c:\Users\naimt\job-portal\frontend

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

Then open your browser to **http://localhost:3000**

## 📋 Application Form Structure

### Pages Created
- **`/`** (Home page) - Landing page with navigation to application form
- **`/apply`** - Multi-step job application form

### Components Structure
```
src/
├── app/
│   ├── page.tsx                    # Home page
│   └── apply/
│       └── page.tsx                # Main application form
├── components/
│   └── application/
│       ├── PersonalInfoForm.tsx    # Step 1: Personal details
│       ├── EducationForm.tsx       # Step 2: Education background
│       ├── EmploymentHistoryForm.tsx # Step 3: Work experience
│       ├── SkillsForm.tsx          # Step 4: Skills & competencies
│       ├── DocumentsForm.tsx       # Step 5: File uploads
│       ├── ReferencesForm.tsx      # Step 6: References
│       └── DeclarationForm.tsx     # Step 7: Final declaration
├── types/
│   └── application.ts              # TypeScript type definitions
└── utils/
    └── formHelpers.ts              # Helper functions
```

## 📝 Form Sections

### 1. Personal Information
- Full name, IC/Passport
- Birth date, gender, nationality
- Marital status, contact details
- Addresses (with same address checkbox)
- Expected salary & preferred position

### 2. Education Background
- Highest qualification
- Institution, field of study
- CGPA, graduation year
- Additional certifications (dynamic list)

### 3. Employment History
- Add/remove multiple employment entries
- Company name, position, duration
- Currently working checkbox
- Responsibilities, reason for leaving
- Reference person details

### 4. Skills & Competencies
- Technical skills (tags)
- Soft skills (tags)
- Languages with proficiency levels
- Additional licenses/competencies

### 5. Supporting Documents
- Resume/CV (required)
- Cover letter (optional)
- Academic certificates (multiple)
- IC/Passport copy (required)
- Portfolio (optional)

### 6. References
- Add multiple references
- Minimum 2 recommended
- Name, relationship, company
- Contact details

### 7. Declaration
- Agreement checkbox
- Digital signature
- Date auto-filled

## ✨ Key Features

### Navigation
- **Next/Previous** buttons for navigation
- **Progress bar** shows completion status
- **Green checkmarks** for completed sections
- **Step indicators** (1-7)

### Validation
- Required fields marked with red asterisk (*)
- HTML5 form validation
- File type and size validation
- Email format validation
- Date validation

### User Experience
- Responsive design (mobile-friendly)
- Smooth scrolling between sections
- Visual feedback on hover/focus
- Color-coded skill tags
- File size display
- Remove/delete functionality for dynamic lists

### Form Features
- **Dynamic Lists**: Add/remove items for certifications, skills, employment, references
- **File Upload**: Drag-and-drop support
- **Auto-fill**: Copy current to permanent address
- **Currently Working**: Disables end date field
- **Tags**: Color-coded skill categories

## 🎨 Design System

### Colors
- Primary: Blue (`bg-blue-600`)
- Success: Green (`bg-green-600`)
- Warning: Yellow (`bg-yellow-50`)
- Error: Red (`text-red-500`)
- Info: Purple (`bg-purple-100`)

### Components
- Cards with shadow and hover effects
- Rounded corners (`rounded-lg`)
- Consistent padding and spacing
- Icons from Heroicons (SVG)
- Emojis for process steps

## 🔧 Customization

### Adding API Integration

Edit `src/app/apply/page.tsx`, modify the `handleSubmit` function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const formData = createFormDataForSubmission(formData);
    
    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const result = await response.json();
      alert('Application submitted successfully! Reference: ' + result.id);
      clearFormDraft();
      // Redirect to success page
      router.push('/application-success');
    } else {
      alert('Error submitting application. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error submitting application. Please try again.');
  }
};
```

### Adding Local Storage Auto-save

Import and use the helper functions:

```typescript
import { saveFormDraft, loadFormDraft } from '@/utils/formHelpers';

// On mount, load saved data
useEffect(() => {
  const saved = loadFormDraft();
  if (saved && confirm('Resume previous application?')) {
    setFormData({ ...formData, ...saved });
  }
}, []);

// Save on change
useEffect(() => {
  saveFormDraft(formData);
}, [formData]);
```

### Modifying Form Fields

Each form component is independent. To add/modify fields:

1. Update type in `src/types/application.ts`
2. Update component in `src/components/application/`
3. Update initial state if needed
4. Update validation in `src/app/apply/page.tsx`

## 📱 Testing

### Test Checklist
- [ ] All 7 steps navigate correctly
- [ ] Required field validation works
- [ ] File upload accepts correct formats
- [ ] Dynamic lists add/remove properly
- [ ] Form submits with complete data
- [ ] Responsive on mobile, tablet, desktop
- [ ] Checkboxes toggle correctly
- [ ] Date pickers work properly

### Sample Data for Testing

```typescript
// Personal Info
Name: John Doe
IC: 900101011234
Email: john.doe@example.com
Phone: +60 12-345 6789
Expected Salary: RM 5,000 - RM 7,000
Position: Software Engineer

// Education
Qualification: Bachelor's Degree
Field: Computer Science
Institution: University of Malaya
Year: 2020
CGPA: 3.75

// Skills
Technical: JavaScript, React, Node.js, TypeScript
Soft: Leadership, Communication, Problem-Solving
Languages: English (Advanced), Bahasa Malaysia (Native)
```

## 🐛 Troubleshooting

### Form not loading?
- Check console for errors
- Ensure all dependencies installed: `npm install`
- Restart dev server: `npm run dev`

### Styling issues?
- Tailwind CSS should auto-compile
- Check `tailwind.config.js` and `postcss.config.mjs`
- Clear `.next` cache: `rm -rf .next`

### File upload not working?
- Check browser console for errors
- Verify file size and type restrictions
- Ensure `accept` attribute matches file types

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🎯 Next Steps

1. **Test the application**: Run `npm run dev` and navigate to `/apply`
2. **Customize styling**: Adjust colors and spacing in components
3. **Add API**: Connect to your backend API
4. **Deploy**: Build and deploy to Vercel or your hosting platform

```powershell
# Build for production
npm run build

# Start production server
npm start
```

## 📞 Support

For questions or issues:
- Email: support@jobportal.com
- Check documentation in `/docs/APPLICATION_FORM.md`

---

**Created**: October 17, 2025  
**Version**: 1.0.0  
**Framework**: Next.js 15 + React 19 + TypeScript
