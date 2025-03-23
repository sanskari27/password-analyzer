import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	outDir: 'dist',
	dts: {
		entry: 'src/index.ts',
		resolve: true,
	},
	clean: true,
	format: ['esm', 'cjs'],
	sourcemap: true,
	splitting: false,
});
