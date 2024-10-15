/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const linkPreconnect1 = document.createElement('link');
linkPreconnect1.rel = 'preconnect';
linkPreconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkPreconnect1);

const linkPreconnect2 = document.createElement('link');
linkPreconnect2.rel = 'preconnect';
linkPreconnect2.href = 'https://fonts.gstatic.com';
linkPreconnect2.crossOrigin = 'anonymous';
document.head.appendChild(linkPreconnect2);

const linkFont = document.createElement('link');
linkFont.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap';
linkFont.rel = 'stylesheet';
document.head.appendChild(linkFont);

export default preview;
