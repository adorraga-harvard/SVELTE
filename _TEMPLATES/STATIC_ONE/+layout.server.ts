// src/routes/AMADOR/+layout.server.ts
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const yamlPath = path.resolve('./src/routes/AMADOR/navigation.yaml');
  const yamlContent = fs.readFileSync(yamlPath, 'utf-8');
  const yamlData = yaml.load(yamlContent) as any;

  return {
    targetPath: yamlData.targetPath,
    friendlyName: yamlData.friendlyName,
    navigation: yamlData.navigation
  };
};
