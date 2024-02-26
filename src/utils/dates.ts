export const formatDate = (dateString: undefined | string) => {
    if (!dateString) {
        return "Invalid Date"
    }
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('it-IT', options);
    return formattedDate;
};