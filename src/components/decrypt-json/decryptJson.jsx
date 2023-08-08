const decryptJson = (props) => {
    return props
        .replaceAll('%20', " ")
        .replaceAll('%26', " ")
        .replaceAll('%3A', ": ")
        .replaceAll("%22", " ")
        .replaceAll("%2C", " ")
        .replaceAll("%70", " ")
        .replaceAll("%27", "'")
        .replaceAll("%3F", "?")
        .replaceAll("%24", " ");
}

export default decryptJson;