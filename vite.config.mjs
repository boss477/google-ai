import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into their own chunks for better caching & size limits
          if (id.includes('node_modules')) {
            if (id.match(/react|react-dom|react-router|framer-motion/)) {
              return 'react-vendor';
            }
            if (id.includes('recharts')) {
              return 'recharts';
            }
            if (id.includes('d3')) {
              return 'd3';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Default chunk strategy: group by top-level package name
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});