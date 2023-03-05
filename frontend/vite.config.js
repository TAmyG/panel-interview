import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 5173, // you can replace this port with any port
    },
    test: {
        globals: true,
        environment: 'jsdom',
        //setupFiles: './src/test/setup.js',
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', '/src/test/setup.js'],
        },
    },
});
