export const extractLastTwoUnique = (text: string) => {
    const noRuns = text.replace(/(.)(\1+)/g, '$1');
    const l = noRuns.length;
    const b = noRuns[l-1];
    const a = noRuns[l-2];
    return [a, b];
}
