const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Assuming the timestamp is in seconds. If it's in milliseconds, remove the * 1000.
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

module.exports = formatDate