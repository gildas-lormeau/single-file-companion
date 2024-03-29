# SingleFile Companion

SingleFile Companion is a program that runs outside the browser. It can:

- make the saving process more transparent when the auto-save is active in
  SingleFile,
- auto-save pages in an anonymous session in a separate browser,
- save pages in another directory than the download directory.

It is recommended to use
[SingleFile Companion Lite](https://github.com/gildas-lormeau/single-file-companion-lite)
if you only want to save pages in a directory other than the download directory.

It uses the
[Native Messaging API](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Native_messaging)
to communicate with SingleFile.

## Install

- Install [Node.js](https://nodejs.org)

- Install [jq](https://stedolan.github.io/jq/), the JSON processor

- Download the
  [SingleFile Companion project](https://github.com/gildas-lormeau/single-file-companion/archive/master.zip)
  zip file and unzip it somewhere on your disk.

- Run `npm install` in the root folder where you unzipped SingleFile Companion.

- Go into the subfolder corresponding to your OS and your browser. For example,
  if you use Chome on Linux:

`cd companion`

`cd linux`

`cd chrome`

- Make `install.sh` executable (Linux/Unix/BSD etc.).

`chmod +x install.sh`

- Run `install`

`./install.sh` (Linux/Unix/BSD etc.)

`install.bat` (Windows)

- Enable the option `Destination > save with SingleFile Companion` or
  `Auto-save > save the page with SingleFile Companion` in SingleFile

## Options

The `options.json` file allows configuring SingleFile Companion. Here are the
entries you can edit:

- `savePath`: path where to save files (default: `SingleFile/companion` path)
  These options are also available when the option
  `Auto-save > save the page with SingleFile Companion` is enabled:
- `backEnd`: backend used to save the page (default: `"puppeteer"`)
- `errorFile`: path of the file where errors are stored (default: `undefined`)
- `browserHeadless`: whether the browser is launched in headless mode (default:
  `true`)
- `browserDebug`: whether the browser is launched with the developer tools
  opened (default: `false`)
