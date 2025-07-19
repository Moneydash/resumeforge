# Resume Builder

![Resume Builder](https://img.shields.io/badge/Resume%20Builder-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, responsive resume builder application built with React, TypeScript, and Tailwind CSS. Create professional resumes with multiple templates, live preview, and export them as high-quality PDFs. Includes authentication, protected routes, and dark mode support.

## Features

- **Multiple Professional Templates**: Choose from the Galaxy and Greek Gods template collections (e.g., Zeus, Athena, Apollo, Andromeda, Comet, etc.), each with unique layouts and styles.
- **Live Preview**: Instantly see your resume in the selected template as you edit.
- **PDF Export**: Download your resume as a high-quality PDF, ready for job applications.
- **Authentication**: Sign in with Google or GitHub for a secure, personalized experience.
- **Protected Routes**: Resume editing and template selection are protected and require login.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Local Storage**: Your resume data is automatically saved in your browser for convenience.
- **Dark Mode Support**: Enjoy a seamless experience in both light and dark modes.
- **Modern UI/UX**: Clean, professional, and user-friendly interface.

## Technologies Used

- **React**: UI library for building the interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **React Hook Form & Yup**: For form handling and schema validation
- **Vite**: For fast development and building
- **Sonner (shadcn/ui)**: For modern toast notifications
- **React Router**: For client-side routing and protected routes

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Sign in with Google or GitHub.
2. Fill out the form with your personal information, experience, education, skills, etc.
3. Select a template from the Galaxy or Greek Gods collections.
4. Preview your resume in real-time.
5. Export your resume as a PDF when you're satisfied with the result.

## PDF Export

The application allows you to export your resume as a high-quality PDF, preserving the selected template's design and formatting. PDF export is available directly from the preview page.

## Project Structure

```
src/
├── api/              # API utilities (e.g., axios instance)
├── assets/           # Static assets like images and icons
├── components/       # React components
│   ├── forms/        # Form sections for resume fields
│   ├── templates/    # Resume templates (Galaxy & Greek Gods)
│   ├── ui/           # UI components (inputs, buttons, etc.)
│   └── ...           # Other shared components
├── contexts/         # React context providers (e.g., Theme)
├── lib/              # Utility functions
├── pages/            # Main pages (Home, Login, Templates, Preview)
├── schema/           # Yup validation schemas
├── styles/           # Global and template-specific styles
├── types/            # TypeScript type definitions
├── utils/            # Helper utilities
├── App.tsx           # Main application component
├── main.tsx          # App entry point
└── routes.tsx        # Route definitions (with lazy loading)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [React](https://react.dev/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Hook Form](https://react-hook-form.com/) and [Yup](https://github.com/jquense/yup) for form handling and validation
- [Sonner (shadcn/ui)](https://ui.shadcn.com/docs/components/sonner) for toast notifications
- [Heroicons](https://heroicons.com/) and [Lucide](https://lucide.dev/) for icons
