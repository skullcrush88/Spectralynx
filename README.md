# Spectralynx Business Website

A modern, responsive business website built with Next.js and Tailwind CSS.

## Features

- Modern, responsive design
- SEO optimized
- Fast performance
- Mobile-friendly layout
- Easy to customize

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spectralynx.web.git
cd spectralynx.web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Deployment

This website can be easily deployed to platforms like Vercel, Netlify, or GitHub Pages.

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

### Deploying to GitHub Pages

1. Add the following to your `package.json`:
```json
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

2. Run the export command:
```bash
npm run export
```

3. Deploy the `out` directory to GitHub Pages.

## Customization

- Update the content in `app/page.tsx`
- Modify the styling in `tailwind.config.js`
- Add new pages in the `app` directory
- Update metadata in `app/layout.tsx`

## License

MIT 