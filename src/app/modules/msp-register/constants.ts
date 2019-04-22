export function funcRemoveStrings(termToRemove: string[], sourceText: string) {
    let output = sourceText;
    termToRemove.forEach((term) => {
        output = output.replace(term, '');
    });
    return output;
}

export function  funcRandomNumber8Digit() {
    return Math.floor(Math.random() * 89999999 + 10000000).toString();
}

export function  funcRandomNumber7Digit() {
    return Math.floor(Math.random() * 8999999 + 1000000).toString();
}
