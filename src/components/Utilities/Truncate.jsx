

const TruncateString = ({str , num}) => {
    if (str) {

    return str.length > num ? str.slice(0,num) + "..." : str;
    } else  {
        return "Unknown"
    }
};

export default TruncateString;
