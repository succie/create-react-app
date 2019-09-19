import { mkdir as mkdirModule, writeFile as writeFileModule } from 'fs';

export const writeFile = (path: string, data: any) => {
  return new Promise((resolve, reject) => {
    writeFileModule(path, data, err => {
      if (err) return reject(err);
      return resolve(err);
    });
  });
};

export const mkdir = (path: string) => {
  return new Promise((resolve, reject) => {
    mkdirModule(path, err => {
      if (err) return reject(err);
      return resolve();
    });
  });
};
