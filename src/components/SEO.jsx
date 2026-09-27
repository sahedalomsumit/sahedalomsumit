import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    // Update tab title
    const baseTitle = 'Sahed Alom Sumit';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Product Designer & AI-Enhanced Web Developer`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    const defaultDescription = "Sahed Alom Sumit is a Product Designer & AI-Enhanced Web Developer based in Helsinki, Finland. I build websites that feel alive — where good design meets clean code, and every scroll tells a story.";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDescription);
    } else {
      // If it doesn't exist for some reason, create it
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description || defaultDescription;
      document.head.appendChild(meta);
    }

    // Update OpenGraph description if exists
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description || defaultDescription);
    }

    // Update Twitter description if exists
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description || defaultDescription);
    }
    
    // Update OpenGraph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} | ${baseTitle}` : `${baseTitle} | Product Designer & AI-Enhanced Web Developer`);
    }

  }, [title, description]);

  return null;
};

export default SEO;
