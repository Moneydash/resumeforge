# Resume Builder

![Resume Builder](https://img.shields.io/badge/Resume%20Builder-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, responsive resume builder application built with React, TypeScript, and Tailwind CSS. Create professional resumes with multiple templates and export them as high-quality PDFs.

## Features

- **Multiple Templates**: Choose from Classic, Modern, Minimal, and Creative resume templates
- **Live Preview**: See changes to your resume in real-time as you edit
- **PDF Export**: Export your resume as a high-quality PDF document
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Your resume data is automatically saved in your browser
- **Dark Mode Support**: Seamless experience in both light and dark modes

## Technologies Used

- **React**: UI library for building the interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **React PDF**: For generating PDF documents
- **React Hook Form**: For form handling and validation
- **Zod**: For schema validation
- **Vite**: For fast development and building

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

1. Fill out the form with your personal information, experience, education, skills, etc.
2. Select a template from the available options
3. Preview your resume in real-time
4. Export your resume as a PDF when you're satisfied with the result

## PDF Export

The application uses React PDF to generate high-quality PDF documents. The PDF export functionality includes:

- Proper formatting and styling
- Support for images and icons
- Custom page sizes based on content
- Compatibility with modern browsers

## Project Structure

```
src/
├── assets/           # Static assets like images and icons
├── components/       # React components
│   ├── form/         # Form components
│   ├── pdf/          # PDF generation components
│   ├── templates/    # Resume templates
│   └── ui/           # UI components
├── styles/           # Global styles and PDF styles
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx          # Main application component
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

- [React PDF](https://react-pdf.org/) for PDF generation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Heroicons](https://heroicons.com/) for icons

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
