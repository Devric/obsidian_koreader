 // UTILITY Functions
 // ==============================
 
 
 // Output: "This_is_a_tring_with_symbols_and_spaces"
export function normalizeString(str: string): string {
    // Remove leading and trailing spaces
    str = str.trim();

    // Replace symbols and spaces with underscores
    const normalizedStr = str.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]+/g, '-');

    // Replace consecutive underscores with a single underscore
    const finalStr = normalizedStr.replace(/_+/g, '_').toLowerCase();

    // Remove trailing underscores
    return finalStr.replace(/^_|_$/g, '');
}
 
 // yyyy-mm-dd
 export function getFormattedDate() {
   const today = new Date();
   const year = today.getFullYear();
   const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
   const day = String(today.getDate()).padStart(2, '0');
 
   return `${year}_${month}_${day}`;
 }
 

// yyyy-mm-dd from a datetime
 export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so we add 1
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

