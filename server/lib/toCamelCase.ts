/**
 * Take string `s` that is currently in snake_case and convert it to camelCase
 *
 * @usage Convert field names from the database to object properties
 */
export function snakeToCamelCase(s: string) {
    const splitString = s.split("_");

    const n = splitString.length;

    if (n == 1) {
        return s;
    }

    for (let i = 1; i < n; i++) {
        let substr = splitString[i];
        splitString[i] = substr[0].toUpperCase() + substr.slice(1);
    }

    return splitString.join("");
}

/**
 * Convert the keys of a database response object from snake_case to camelCase
 */
export function withCamelCaseKeys(rows: Object | Object[]) {
    if (Array.isArray(rows)) {
        const convertedRows = [];

        // @note: we could typecheck each row (recursively) to ensure they're not nested arrays,
        //      but with the way our database is set up, we don't have any nested arrays
        //      and thus every row should be a single database row, i.e. an object
        for (const row of rows) {
            // reduce object to new object with mapped keys
            const convertedRow = Object.keys(row).reduce((acc, property) => {
                acc[snakeToCamelCase(property)] = row[property];
                return acc;
            }, {});

            convertedRows.push(convertedRow);
        }

        return convertedRows;
    }
}
