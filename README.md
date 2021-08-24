# pedantic

[![Release](https://github.com/0-vortex/pedantic/actions/workflows/release.yml/badge.svg)](https://github.com/0-vortex/pedantic/actions/workflows/release.yml)
 [![Release](https://github.com/0-vortex/pedantic/actions/workflows/development.yml/badge.svg)](https://github.com/0-vortex/pedantic/actions/workflows/development.yml)
 [![Release](https://github.com/0-vortex/pedantic/actions/workflows/compliance.yml/badge.svg)](https://github.com/0-vortex/pedantic/actions/workflows/compliance.yml)
 [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

- [Overview](#overview)
- [Requirements](#requirements)
- [Folder structure](#folder-structure)
- [Installation](#installation)
- [Application requirements](#application-requirements)
- [How to use](#how-to-use)
- [Infrastructure](#infrastructure)
- [Contributing](#contributing)

## Overview

WIP

## Requirements

In order to run the project from a container we need `node>=15`, `npm>=7` and `docker>=20` installed on our development machines.

## Folder structure

A quick look at the top-level files and directories you'll see in a Gatsby project.

```
├──── pedantic
│  ├── .github/
│  ├── .husky/
│  ├── src/
│  ├── .dockerignore
│  ├── .editorconfig
│  ├── .eslintrc.js
│  ├── .gitattributes
│  ├── .gitignore
│  ├── .lintstagedrc.js
│  ├── .npmrc
│  ├── compose.yaml
│  ├── Dockerfile
│  ├── nest-cli.json
│  ├── npm-shrinkwrap.json
│  ├── package.json
│  ├── README.md
│  ├── release.config.js
│  ├── tsconfig.build.json
│  └── tsconfig.json
```

## Installation

Clone the package via `git`:

```shell
git clone git@github.com:0-vortex/pedantic.git
```

Go into the cloned repository and install `node` dependencies:

```shell
npm ci
```

## Application requirements

This repository is featuring granular controls fully orthogonal to environment variables as specified by [the twelve-factor app](https://12factor.net) guidelines.

In order for the application to run we need the following environment variables set similar to the following example.
Without these variables the application will fail to start, so in order for the app to start locally we need to create an `.env` file with the following values:

```shell script
# Global env
DEBUG=*
HOST=0.0.0.0
PORT=3000

# Database ORM configuration
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_PORT=5432
TYPEORM_USERNAME=pedantic-crawler
TYPEORM_PASSWORD=FJK3zrH2WGxKck7tT2JG4MY6wbHkeX9s
TYPEORM_DATABASE=pedantic-dev
TYPEORM_SYNCHRONIZE=false

```

## How to use

To develop locally just run:

```shell
npm start
```

## Infrastructure

In order for our project to work it needs the infrastructure to be up. Once ``docker`` is running all we need to do is:

```bash
npm run docker:up
```

You can then visit [127.0.0.1:3000](http://localhost:3000) to interact with the running sessions.

There are additional ``docker`` commands built into our default script usage.

One is to stop the current ``docker`` container without wiping data:

```bash
npm run docker:down
```

One is to remove the current ``docker`` container while wiping data:

```bash
npm run docker:destroy
```

## Contributing

This repository uses `husky` with pre-commit and message hooks. All you need to do after staging some files is to run:

```shell
npm run push
```
