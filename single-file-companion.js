#!/usr/local/bin/node

/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global require, process */

const fs = require("fs");
const path = require("path");
const nativeMessage = require("./lib/messaging.js");
const backEnds = {
	"jsdom": "single-file-cli/back-ends/jsdom.js",
	"puppeteer": "single-file-cli/back-ends/puppeteer.js",
	"puppeteer-firefox": "single-file-cli/back-ends/puppeteer-firefox.js",
	"webdriver-chromium": "single-file-cli/back-ends/webdriver-chromium.js",
	"webdriver-gecko": "single-file-cli/back-ends/webdriver-gecko.js"
};

process.stdin
	.pipe(new nativeMessage.Input())
	.pipe(new nativeMessage.Transform(async function (message, push, done) {
		try {
			await processMessage(message);
			push({});
		} catch (error) {
			push({ error });
		}
		done();
		process.exit(0);
	}))
	.pipe(new nativeMessage.Output())
	.pipe(process.stdout);

function processMessage(message) {
	if (message.method == "save") {
		return save(message.pageData);
	}
	if (message.method == "externalSave") {
		return externalSave(message.pageData);
	}
}

function save(message) {
	const companionOptions = require("./options.json");
	const filename = path.resolve("../../", (companionOptions.savePath || ""), message.filename);
	fs.writeFileSync(getFilename(filename), message.content);
}

async function externalSave(message) {
	const companionOptions = require("./options.json");
	const backend = require(backEnds[companionOptions.backEnd || "puppeteer"]);
	await backend.initialize(companionOptions);
	try {
		const pageData = await backend.getPageData(message);
		const fileDirectory = path.parse(pageData.filename).dir;
		const basePath = path.resolve("../../", (companionOptions.savePath || ""), fileDirectory);
		fs.mkdirSync(basePath, { recursive: true });
		pageData.filename = path.resolve(basePath, path.relative(fileDirectory, pageData.filename));
		fs.writeFileSync(getFilename(pageData.filename), pageData.content);
		return pageData;
	} catch (error) {
		if (companionOptions.errorFile) {
			const message = "URL: " + message.url + "\nStack: " + error.stack + "\n";
			fs.writeFileSync(companionOptions.errorFile, message, { flag: "a" });
		}
		throw error;
	} finally {
		await backend.closeBrowser();
	}
}

function getFilename(filename, index = 1) {
	let newFilename = filename;
	if (index > 1) {
		const regExpMatchExtension = /(\.[^.]+)$/;
		const matchExtension = newFilename.match(regExpMatchExtension);
		if (matchExtension && matchExtension[1]) {
			newFilename = newFilename.replace(regExpMatchExtension, " - " + index + matchExtension[1]);
		} else {
			newFilename += " - " + index;
		}
	}
	if (fs.existsSync(newFilename)) {
		return getFilename(filename, index + 1);
	} else {
		return newFilename;
	}
}