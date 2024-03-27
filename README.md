# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone  https://github.com/LarryDavidd/nodejs2023Q2-service.git
```

Switch to branch part-2:

```
git checkout part-2
```

## Installing NPM modules

To install NPM modules, use the command:

```
npm install
```

## .env setting

In the absence of an .env file in the project's main directory, it is necessary to duplicate the .env.example file and rename it as .env.

## Docker

Should Docker not be installed by this stage, proceed to download, install, and initiate the Docker Desktop application.

## Vulnerabilities scanning

```
npm run docker:scan
```

## Running application

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
Or you can open it by typing http://localhost:4000/api-docs for yaml version.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
