// src/routes/AMADOR/+layout.server.ts
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { LayoutServerLoad } from './$types';
import { fileURLToPath } from 'url'; // 1. Import this helper

// 2. Get the directory of the CURRENT file (__dirname is not available in ES Modules)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const load: LayoutServerLoad = async () => {
	// 3. Join the current directory path with your filename
	const yamlPath = path.join(__dirname, 'navigation.yaml');
	const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
	const yamlData = yaml.load(yamlContent) as any;

	return {
		targetPath: yamlData.targetPath,
		friendlyName: yamlData.friendlyName,
		navigation: yamlData.navigation
	};
};