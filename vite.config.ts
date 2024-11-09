import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import  Cookies  from 'js-cookie';

// const readerIp = Cookies.get('readerIp');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://169.254.10.1', // Alamat IP dan port server Anda
        changeOrigin: true,
        secure: false, // Set ke false jika server tidak memiliki sertifikat SSL yang valid
        rewrite: (path) => path.replace(/^\/api/, '') // Menghapus prefix `/api` di permintaan
      },
    },
  },
});
