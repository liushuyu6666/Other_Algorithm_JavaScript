export default function kMP(string, pattern) {
    const next = getNextArray(pattern);

    let i = 0,
        j = 0;
    while (i < string.length && j < pattern.length) {
        if (string.charAt(i) === pattern.charAt(j)) {
            i++;
            j++;
        } else {
            if (j === 0) i++;
            else j = next[j - 1];
        }
    }

    if (j === pattern.length) {
        return i - j;
    } else {
        return -1;
    }
}

export function getNextArray(pattern) {
    const next = [0];

    let i = 0,
        j = 1;
    while (j < pattern.length) {
        if (pattern.charAt(i) === pattern.charAt(j)) {
            next.push(next[j - 1] + 1);
            i++;
            j++;
        } else {
            if (
                i - 1 >= 0 &&
                pattern.charAt(next[i - 1]) === pattern.charAt(j)
            ) {
                next.push(next[i - 1] + 1);
                i++;
                j++;
            } else {
                next.push(0);
                i = 0;
                j++;
            }
        }
    }
    return next;
}
