import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 5173,
    host: true,
    open: false
  },
  plugins: [
    {
      name: 'clean-urls-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const cleanUrl = req.url.split('?')[0];
          const potentialFile = path.resolve(__dirname, '.' + cleanUrl + '.html');
          if (fs.existsSync(potentialFile)) {
            req.url = cleanUrl + '.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about-us.html',
        contact: './contact-us.html',
        products: './products.html',
        buyNow: './buy-now.html',
        paymentComingSoon: './payment-coming-soon.html',
        buyDistributorship: './buy-distributorship.html',
        distributorship: './distributorship.html',
        privacyPolicy: './privacy-policy.html',
        refundPolicy: './refund-policy.html',
        returnRefund: './return-refund.html',
        termsConditions: './terms-conditions.html',
        termsAndConditions: './terms-and-conditions.html',
        disclaimer: './disclaimer.html',
        solarLights: './collections/solar-lights.html',
        ledLamps: './collections/led-lamps.html',
        ledBulbs: './collections/led-bulbs.html',
        clampMeters: './collections/clamp-meters.html'
      }
    }
  }
});
