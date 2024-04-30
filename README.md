# obsidian_koreader

```bash
bun install
```

To run:

```bash
bun run index.ts
```
Converts Koreader into Markdown with Obsidian Callouts & ^links

- /in - this folder is the json input from koreader, can by synced using folderSync
- /out - this is the folder for MD output based on the 'latest' file of 'in' folder. it will ignore all other files

- The /in folder will automatically cleaned out after creating md
- The out folder will be replaced by the latest eg: NOTE_NAME_OF_BOOK.md
- Internal pages are marked with ^book_chpater_page_highlitedText as ref links



## TODO
- cron server
- cron job
- automatic sync
- bun test have issues, cant be ran

