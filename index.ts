import { Eta } from "eta"
import * as path from 'path'; // Import the path module

import {
	write,
	read, 
	deleteFilesInFolder,
	getFilesFromFolder
} from './lib/files'

import {
	formatDate,
	getFormattedDate,
	normalizeString,
} from './lib/util'


type tDrawer = {
	type: string,
	title: string,
}

type tEntry = {
	"page"             : number,
	"note"?            : string,
	"chapter"          : string,
	"time"             : number,
	"timestring"?	   : string,
	"drawer"           : string,
	"sort"             : string,
	"text"             : string,
	"modified_drawer"? : tDrawer,
}

type tGroupChater = {

}

type tDoc = {
	entries: tEntry[],
	title: string,
	author: string,
	file: string,
	chapters?: any,
}

type tFullDoc = {
	version: string,
	documents: tDoc[],
	created_on: number,
}


// get Template
const eta = new Eta({ views: path.join(__dirname, "templates") })

// DRAWER {
// 	type -> icon
// 	title ->
// }
const KOREADER_NOTE_MAPPER: { [key: string]: { type: string; title: string } } = {
    lighten:    { type: "quote"     , title: "Quotes"     } ,
    invert:     { type: "important" , title: "Attention!" } ,
    strikeout:  { type: "danger"    , title: "Wow!!"      } ,
    underscore: { type: "question"  , title: "Huh?"       } ,
};;


const file = getFilesFromFolder(path.join(__dirname,  'in'))

let FULLDOC: tFullDoc = JSON.parse(read(`./in/${file}`).success)

const ENHANCED_DOC: tDoc[] = FULLDOC.documents.map((doc: tDoc) => {

	// Enhance Drawer
	doc.entries = doc.entries.map((entry: tEntry) => {

		let values: tDrawer = KOREADER_NOTE_MAPPER[entry.drawer]

		entry.modified_drawer = values
		entry.timestring = formatDate(new Date(entry.time * 1000))

		return entry
	})

	// Group by chapters
	const groupedEntries: Record<string, tEntry[]> = {};
	doc.entries.forEach((entry: tEntry) => {
		const chapter = entry.chapter;
		if (!groupedEntries[chapter]) {
			groupedEntries[chapter] = [];
		}
		groupedEntries[chapter].push(entry);
	});

	// Transform entries within each chapter
	for (const chapter in groupedEntries) {
		groupedEntries[chapter] = groupedEntries[chapter].map((entry: tEntry) => {
			let values: tDrawer = KOREADER_NOTE_MAPPER[entry.drawer];
			entry.modified_drawer = values;
			entry.timestring = formatDate(new Date(entry.time * 1000));
			return entry;
		});
	}

	doc.entries = [] // remove, so its not duplicate data
	doc.chapters = groupedEntries

	return doc
})

console.log(ENHANCED_DOC)

// Map it back
FULLDOC.documents = ENHANCED_DOC


// CORE loop
// ==============================

FULLDOC.documents.forEach((doc) => {
	const filename = `${doc.title}`

	// const res = eta.render("./entries", doc)
	const res = eta.render("./chapters", doc)

	console.log(res)
	 write(normalizeString(filename), res)
})

// After complete creating each md
 deleteFilesInFolder('./in')

