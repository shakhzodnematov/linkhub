const fs = require('fs');
const path = require('path');

const SVG_ICONS = {
  telegram: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-.99.53-1.41.52-.46-.01-1.36-.26-2.02-.48-.82-.27-1.47-.41-1.42-.87.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 8.01-3.43 3.81-1.56 4.6-1.83 5.12-1.84.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.16-.03.25z"/></svg>`,
  github: `<svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
  code: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  send: `<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
  'play-circle': `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`,
  archive: `<svg viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`,
  link: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
};

module.exports = (req, res) => {
  const configPath = path.join(process.cwd(), 'config.json');
  const templatePath = path.join(process.cwd(), 'index.html');

  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    const config = JSON.parse(configData);
    const { profile, links } = config;

    let socialsHtml = '';
    if (profile.socials && Array.isArray(profile.socials)) {
      profile.socials.forEach(social => {
        const iconSvg = SVG_ICONS[social.icon.toLowerCase()] || SVG_ICONS.link;
        socialsHtml += `
          <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${social.name}">
            ${iconSvg}
          </a>`;
      });
    }

    let linksHtml = '';
    if (links && Array.isArray(links)) {
      links.forEach(link => {
        if (link.active) {
          const iconSvg = SVG_ICONS[link.icon.toLowerCase()] || SVG_ICONS.link;
          linksHtml += `
            <a href="${link.url}" class="link-card" target="_blank" rel="noopener noreferrer">
              <span class="link-icon">
                ${iconSvg}
              </span>
              <span class="link-title">${link.title}</span>
              <span class="link-arrow">
                <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
            </a>`;
        }
      });
    }

    const renderedHtml = htmlTemplate
      .replace(/{{NAME}}/g, profile.name)
      .replace(/{{BIO}}/g, profile.bio)
      .replace(/{{AVATAR}}/g, profile.avatar)
      .replace(/{{SOCIALS}}/g, socialsHtml)
      .replace(/{{LINKS}}/g, linksHtml);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(renderedHtml);
  } catch (err) {
    res.status(500).send('Xatolik yuz berdi: ' + err.message);
  }
};
