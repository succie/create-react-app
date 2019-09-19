#!/usr/bin/env node

import { prompt } from 'inquirer';
import { spawn } from 'child_process';
import { mkdir } from './utils/fs';
import Spinner from './utils/spinner';
import {
  generatePackageJson,
  generateWebpackConfig,
  generateTsConfig,
  generateIndexScript
} from './generator';

const installDependencies = (packageManager: string) => {
  const installScripts =
    packageManager === 'npm'
      ? ['install', '--save-prod']
      : packageManager === 'yarn'
      ? ['add']
      : [];

  const installDeps = spawn(
    packageManager,
    [].concat(installScripts, ['react', 'react-dom', 'redux', 'react-redux'])
  );

  return new Promise((resolve, reject) => {
    installDeps.stderr.on('data', (data: Buffer) => {
      console.error(`\n${data.toString()}`);
    });

    installDeps.on('close', () => {
      resolve();
    });

    installDeps.on('error', err => {
      reject(err);
    });
  });
};

const installDevDependencies = (packageManager: string) => {
  const installScripts =
    packageManager === 'npm'
      ? ['install', '--save-dev']
      : packageManager === 'yarn'
      ? ['add', '--dev']
      : [];

  const installDevDeps = spawn(
    packageManager,
    [].concat(installScripts, [
      '@types/react',
      '@types/react-dom',
      '@types/react-redux',
      'typescript',
      'webpack',
      'webpack-dev-server',
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
      'babel-loader',
      'css-loader',
      'mini-css-extract-plugin',
      'html-webpack-plugin'
    ])
  );

  return new Promise((resolve, reject) => {
    installDevDeps.stderr.on('data', (data: Buffer) => {
      console.error(`\n${data.toString()}`);
    });

    installDevDeps.on('close', () => {
      resolve();
    });

    installDevDeps.on('error', err => {
      reject(err);
    });
  });
};

const main = async () => {
  const config = await prompt([
    {
      type: 'input',
      name: 'appName',
      message: "What's your app name?",
      validate: (value: string) => {
        if (!value.includes(' ')) return true;
        return 'Space is not allowed.';
      }
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which you use npm or yarn?',
      choices: ['npm', 'yarn']
    }
  ]);

  const spinner = new Spinner();

  // Make application directory
  await mkdir(config.appName);

  // Change working directory to application directory
  process.chdir(config.appName);

  // Generate package.json
  await generatePackageJson(config.appName);

  spinner.start('Generating application...');
  await Promise.all([
    installDependencies(config.packageManager),
    installDevDependencies(config.packageManager),
    generateWebpackConfig(),
    generateTsConfig(),
    generateIndexScript(config.appName)
  ]);
  spinner.stop();

  console.log(`Created your app, ${config.appName}!`);
};

main();
