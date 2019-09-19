import { writeFile } from '../utils/fs';

const tsconfig = `
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react",
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
`.trim();

export const generateTsConfig = async () => {
  writeFile('tsconfig.json', tsconfig);
};
