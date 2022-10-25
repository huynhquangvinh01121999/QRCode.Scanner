export const SplitDate = (datetime) => {
    var day = datetime.substring(0, 2);
    var month = datetime.substring(2, 4);
    var year = datetime.substring(4, 8);
    console.log(`${day}-${month}-${year}`);
    return `${year}-${month}-${day}`;
}

export const GetFirstName = (fullName) => {
    var splitName = fullName.split(' ');
    return `${splitName[0]} ${splitName[1]}`
}

export const GetLastName = (fullName) => {
    var splitName = fullName.split(' ');
    return `${splitName[splitName.length - 1]}`
}