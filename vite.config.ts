import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index:          resolve(__dirname, 'index.html'),
        wewe:           resolve(__dirname, 'wewe-tool.html'),
        ers:            resolve(__dirname, 'ers-tool-feedback.html'),
        tone:           resolve(__dirname, 'tone-tool.html'),
        persona:        resolve(__dirname, 'persona-tool.html'),
        emotionalAppeal:resolve(__dirname, 'emotional-appeal-tool.html'),
        sscc:           resolve(__dirname, 'sscc.html'),
        abDuration:     resolve(__dirname, 'ab-duration-tool.html'),
        f2b:            resolve(__dirname, 'f2b-tool.html'),
      },
    },
  },
});
