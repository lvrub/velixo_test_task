class DateTime {

    static getTodayDate(): string {
        return new Date().toLocaleString('en-EU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });

    }
}

export default DateTime;