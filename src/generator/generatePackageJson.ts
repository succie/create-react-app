import { writeFile } from '../utils/fs';

const packageJson = (appName: string) =>`
{
  "name": "${appName}",
  "version": "1.0.0",
  "private": true,
  "license": "MIT"
}
`.trim();

export const generatePackageJson = async (appName: string) => {
  writeFile('package.json', packageJson(appName));
};
