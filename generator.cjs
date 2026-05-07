const fs = require('fs');
const path = require('path');

const pages = [
  'UIUXDesign',
  'FullStackDevelopment',
  'LowNoCodeDevelopment',
  'AppDevelopment',
  'AIAutomationHub',
  'ToolsServices',
  'FrontendDevelopment',
  'BackendDevelopment',
  'IOSAppDevelopment',
  'GoogleExtension'
];

pages.forEach(page => {
  const file = path.join(__dirname, 'src', 'pages', page + '.jsx');
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `import RevealOnScroll from '../components/RevealOnScroll'
import ContactSection from '../components/ContactSection'
import { useSEO } from '../hooks/useSEO'
import { Link } from 'react-router-dom'

export default function ${page}() {
  useSEO({
    title: '${page} | Sahed Alom Sumit',
    description: '${page} services',
  })

  return (
    <>
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <RevealOnScroll>
          <header className="mb-20">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase">${page}</h1>
          </header>
        </RevealOnScroll>
      </section>
      <RevealOnScroll><ContactSection /></RevealOnScroll>
    </>
  )
}
`);
    console.log('Created ' + file);
  }
});
