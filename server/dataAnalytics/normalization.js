const minMaxScaling = (array) => {
    const min = Math.min(...array);
    const max = Math.max(...array);
    
    return array.map(x => (x - min) / (max - min));
}

const zScoreNormalization = (array) => {
    const mean = array.reduce((a, b) => a + b) / array.length;
    const stdDev = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / array.length);
    
    return array.map(x => (x - mean) / stdDev);
}

const normalization = {
    minMaxScaling, zScoreNormalization
}

module.exports = normalization