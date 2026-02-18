const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Helper to generate SVG with distinct colors
const generateSVG = (name, color, text) => `
<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" dominant-baseline="middle" text-anchor="middle">${text}</text>
  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="20"/>
</svg>`;

const images = [
    { name: 'hero-model.svg', color: '#1a1a1a', text: 'HERO IMAGE' },
    { name: 'craft-atelier.svg', color: '#4a4a4a', text: 'ATELIER CRAFT' },
    { name: 'collection-spring.svg', color: '#57534e', text: 'SPRING COLLECTION' },
    { name: 'collection-essentials.svg', color: '#292524', text: 'ESSENTIALS' },
    { name: 'product-1.svg', color: '#0f172a', text: 'CASHMERE KNIT' },
    { name: 'product-2.svg', color: '#334155', text: 'WOOL BLAZER' },
    { name: 'product-3.svg', color: '#475569', text: 'SILK BLOUSE' },
    { name: 'product-4.svg', color: '#64748b', text: 'LINEN TROUSERS' },
];

images.forEach(img => {
    fs.writeFileSync(path.join(dir, img.name), generateSVG(img.name, img.color, img.text));
    console.log(`Generated ${img.name}`);
});
