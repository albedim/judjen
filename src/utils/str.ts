export const cutString = (str: string) => {
    return str.length > 28 ? str.substring(0,28) + "..." : str
}