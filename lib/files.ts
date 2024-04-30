import fs from 'fs'
import path from 'path'

export function write(filename: string, data: any) {
	fs.writeFile(`./out/NOTE_${filename.toUpperCase()}.md`, data, (err) => {
	if (err) {
		console.error('Error writing to file:', err);
		return;
	}
	console.log('Data has been written to file successfully.');
	});
}

export function read(filePath: string): { success: string, error: string}  {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log('File contents:', data);
		return {success: data, error: ""}
    } catch (err) {
        console.error('Error reading file:', err);
		return {success: "", error: "error"}
    }
}


export function deleteFilesInFolder(folderPath: string): boolean {
    try {
        // Read the contents of the folder
        const files = fs.readdirSync(folderPath);

        // Iterate through each file and delete it
        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            // Check if it's a file before attempting to delete
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
                console.log('File deleted successfully:', filePath);
            }
        });

        return true;
    } catch (err) {
        console.error('Error deleting files in folder:', err);
        return false;
    }
}

// get latest file from folder
export function getFilesFromFolder(folderPath: string): string {
    try {
        // Read the contents of the folder
        const files = fs.readdirSync(folderPath);
        
        // Filter out directories and .DS_Store file from the list of files
        const fileNames = files.filter(file => {
            return file !== '.DS_Store' && fs.statSync(path.join(folderPath, file)).isFile();
        });

        // Sort the remaining file names lexicographically
        const sortedFiles = fileNames.sort((a, b) => {
            // Compare the file names directly
            return b.localeCompare(a);
        });

        // Return the first (latest) file name
        return sortedFiles[0];
    } catch (err) {
        console.error('Error reading folder:', err);
        return '';
    }
}
