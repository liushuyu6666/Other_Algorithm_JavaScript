export function getAllMatches(string, pattern) {
    let indexes = [],
        index = string.indexOf(pattern),
        copyString = string,
        prev = 0;
    while (index !== -1) {
        indexes.push(index + prev);
        copyString = copyString.substring(index + 1);
        prev += index + 1;
        index = copyString.indexOf(pattern);
    }

    return indexes;
}
