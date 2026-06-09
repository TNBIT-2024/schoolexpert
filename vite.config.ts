import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Copy user uploaded logo to public/schoolexpert_logo.png
try {
  const sourcePath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\73c70ccf-a0dd-4aa9-a396-67b3c5ee6ccc\\media__1780467189035.jpg';
  const publicDir = path.resolve(__dirname, 'public');
  const targetPath = path.resolve(publicDir, 'schoolexpert_logo.png');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log('Successfully copied original user logo to public/schoolexpert_logo.png');
  }
} catch (err) {
  console.error('Error copying logo:', err);
}

// Copy Founding Partners poster to public/founding_partners_poster.png
try {
  const sourcePath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\0c27cafd-9a7e-4c8e-a80e-acd96a69de87\\media__1780727187402.png';
  const publicDir = path.resolve(__dirname, 'public');
  const targetPath = path.resolve(publicDir, 'founding_partners_poster.png');

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log('Successfully copied Founding Partners poster to public/founding_partners_poster.png');
  } else {
    console.warn('Founding Partners poster source path not found:', sourcePath);
  }
} catch (err) {
  console.error('Error copying poster:', err);
}




function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
