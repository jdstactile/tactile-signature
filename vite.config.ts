import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { type ConfigEnv, type PluginOption, defineConfig, loadEnv } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode, command }: ConfigEnv) => {
  const env = loadEnv(mode || '', process.cwd());
  const isBuild = command === 'build';
  const port = Number(env.VITE_PORT || 3020);

  return {
    base: isBuild ? '/tactile-signature/' : '/',
    build: {
      outDir: 'dist',
    },
    plugins: [
      react(),
      svgr({ dimensions: false, svgo: false, typescript: true }) as PluginOption,
      viteTsconfigPaths(),
      ...(!isBuild ? [pluginChecker({ typescript: true })] : []),
    ],
    server: {
      host: true,
      port,
      strictPort: true,
    },
  };
});
