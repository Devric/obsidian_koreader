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

type tDoc = {
	entries: tEntry[],
	title: string,
	author: string,
	file: string,
}

type tFullDoc = {
	version: string,
	documents: tDoc[],
	created_on: number,
}


/*
const FULLDOC: tFullDoc = 
{
    "version": "json/1.0.0",
    "documents": [
        {
            "entries": [
                {
                    "page": 98,
                    "note": "thid is roberts tettment",
                    "chapter": "Chapter Ten",
                    "time": 1714440856,
                    "drawer": "strikeout",
                    "sort": "highlight",
                    "text": "after a half week of drinking, disgust, and desultory investigation, that he was wasting his time. Isolated experiments were yielding nothing, that was clear. If there was a rational answer to the problem (and he had to believe that there was), he could only find it by careful research.\nTentatively, for want of better knowledge, he had set up a possible basis, and that was blood. It provided, at least, a starting point. Step number one, then, was reading about blood."
                },
                {
                    "page": 101,
                    "chapter": "Chapter Ten",
                    "time": 1714440901,
                    "drawer": "invert",
                    "sort": "highlight",
                    "text": "to"
                },
                {
                    "page": 102,
                    "chapter": "Chapter Ten",
                    "time": 1714440936,
                    "drawer": "underscore",
                    "sort": "highlight",
                    "text": "the street.\n“Policeman!” he found himself calling. “Oh, policeman!”\nHe laughed for a mile without stopping, wondering just what was so funny about it.\nHe put down the book. He’d been reading again about the lymphatic system. He vaguely remembered reading about it months before"
                }
            ],
            "title": "I Am Legend",
            "author": "Richard Matheson",
            "file": "/storage/emulated/0/Books/PushBooks/I Am Legend_9780765357151.epub"
        },
        {
            "entries": [
                {
                    "page": 194,
                    "note": "anotyer test",
                    "chapter": "Ten",
                    "time": 1714439848,
                    "drawer": "lighten",
                    "sort": "highlight",
                    "text": "still angry at myself and what I’d done to Tim—not so much the others, I admit—and angry at Savannah for what had happened on the pier.\nI could barely remember how it had started. One minute I was thinking that I loved her more than I’d ever imagined possible, and the next minute we were fighting. I was outraged by her subterfuge yet couldn’t understand why I was this angry"
                },
                {
                    "page": 273,
                    "note": "tedt john ",
                    "chapter": "Fourteen",
                    "time": 1714439634,
                    "drawer": "underscore",
                    "sort": "highlight",
                    "text": "about coins—we were alone as much as possible. Back in Chapel Hill, once Savannah was finished with her classes for the day, our afternoons and evenings were spent together. We walked through the stores along Franklin Street, went to the North Carolina Museum of History in Raleigh, and even spent a couple of hours at the North Carolina Zoo. On my second to last evening in town, we went to dinner at the fancy restaurant the shoe salesman"
                }
            ],
            "title": "Dear John",
            "author": "Nicholas Sparks",
            "file": "/storage/emulated/0/Books/PushBooks/Dear John - Nicholas Sparks.epub"
        }
    ],
    "created_on": 1714441072
}
*/

// get Template
const eta = new Eta({ views: path.join(__dirname, "templates") })

// DRAWER {
// 	type -> icon
// 	title ->
// }
const NOTE_STYLES: { [key: string]: { type: string; title: string } } = {
    lighten:    { type: "quote"     , title: "Quotable/Concept/General Idea" } ,
    invert:     { type: "important" , title: "Striking/Intense"              } ,
    strikeout:  { type: "danger"    , title: "Attention!"                    } ,
    underscore: { type: "question"  , title: "Thought Provoking"             } ,
};;


const file = getFilesFromFolder(path.join(__dirname,  'in'))

let FULLDOC: tFullDoc = JSON.parse(read(`./in/${file}`).success)

const ENHANCED_DOC: tDoc[] = FULLDOC.documents.map((doc: tDoc) => {

	doc.entries = doc.entries.map((entry: tEntry) => {

		let values: tDrawer = NOTE_STYLES[entry.drawer]

		entry.modified_drawer = values
		entry.timestring = formatDate(new Date(entry.time * 1000))

		return entry
	})

	return doc
})

FULLDOC.documents = ENHANCED_DOC


// CORE loop
// ==============================

FULLDOC.documents.forEach((doc) => {
	// console.log(doc.title)
	// console.log(doc.file)
	// console.log(doc.author)

	const filename = `${doc.title}`

	console.log(filename)

	const res = eta.render("./simple", doc)

	console.log(res)

	 write(normalizeString(filename), res)
})

deleteFilesInFolder('./in')

