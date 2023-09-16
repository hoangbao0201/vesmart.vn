const convertDate = (date: Date) => {
    const now = new Date();
    const passedTime = new Date(date);
    const diffInSeconds = Math.floor(
        (now.getTime() - passedTime.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
        return "Vừa xong";
    }
    if (diffInSeconds < 3600) {
        // less than 1 hour
        return `${Math.floor(diffInSeconds / 60)} phút trước`;
    }
    if (diffInSeconds < 86400) {
        // less than 1 day
        return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    }
    if (diffInSeconds < 604800) {
        // less than 1 week
        return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    }
    // if more than a week, return the date
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    return passedTime.toLocaleDateString("vi-VN", options);
};

export default convertDate;
