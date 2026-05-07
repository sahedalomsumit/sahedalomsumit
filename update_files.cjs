const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

const updates = [
  { file: 'FigmaDesign.jsx', parentLink: '/services/ui-ux-design', parentName: 'UI/UX Design' },
  { file: 'CustomDevelopment.jsx', parentLink: '/services/low-no-code-development', parentName: 'Low/No-Code' },
  { file: 'SEOOptimization.jsx', parentLink: '/services/full-stack-development', parentName: 'Full-Stack' },
  { file: 'WordPressDevelopment.jsx', parentLink: '/services/low-no-code-development', parentName: 'Low/No-Code' },
  { file: 'WebflowDevelopment.jsx', parentLink: '/services/low-no-code-development', parentName: 'Low/No-Code' },
  { file: 'FramerDevelopment.jsx', parentLink: '/services/low-no-code-development', parentName: 'Low/No-Code' },
  { file: 'ShopifyDevelopment.jsx', parentLink: '/services/low-no-code-development', parentName: 'Low/No-Code' },
  { file: 'AndroidAppDevelopment.jsx', parentLink: '/services/app-development', parentName: 'App Development' },
  { file: 'AIAutomation.jsx', parentLink: '/services/ai-automation-hub', parentName: 'AI & Automation' }
];

updates.forEach(u => {
  const filePath = path.join(srcDir, u.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // regex to match the breadcrumb up to <span className="text-white">
    const breadcrumbRegex = /(<nav[^>]*>[\s\S]*?<Link to="\/services"[^>]*>Services<\/Link>\s*<span>\/<\/span>)([\s\S]*?<span className="text-white">)/;
    
    if (breadcrumbRegex.test(content)) {
      content = content.replace(breadcrumbRegex, `$1\n              <Link to="${u.parentLink}" className="hover:text-emerald-500 transition">${u.parentName}</Link>\n              <span>/</span>$2`);
      fs.writeFileSync(filePath, content);
      console.log('Updated breadcrumbs in', u.file);
    } else {
      console.log('Could not match breadcrumb in', u.file);
    }
  }
});
