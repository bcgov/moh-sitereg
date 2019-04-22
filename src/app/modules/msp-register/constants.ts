export function funcRemoveStrings(termToRemove: string[], sourceText: string) {
    let output = sourceText;
    termToRemove.forEach((term) => {
        output = output.replace(term, '');
    });
    return output;
}
