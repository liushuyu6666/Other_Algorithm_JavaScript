export function insertIntoString(string, pattern, index) {
    return string.substring(0, index) + pattern + string.substring(index);
}

export default function insertMIntoString(string, pattern, indexes) {
    const patternLen = pattern.length;

    let finalStr = string,
        finalIdx = [];
    for (let i = 0; i < indexes.length; i++) {
        const idx = i * patternLen + indexes[i];
        finalIdx.push(idx);
        finalStr = insertIntoString(finalStr, pattern, idx);
    }

    return [finalStr, finalIdx];
}
