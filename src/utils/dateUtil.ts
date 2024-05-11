export const getDateString = (fullDate:Date) => {
    let date = fullDate.getDate();
    let month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();

    let dateStr = date.toString();
    let monthStr = month.toString();

    if(date<10){
        dateStr = '0'+date.toString();
    }
    if(month<10){
        monthStr = '0'+month.toString();
    }

    return year.toString() + "-" + monthStr + "-" + dateStr;
}