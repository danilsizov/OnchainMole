const normalization = require('./normalization')

const hierarchyCluster = async (data, keys, weights, linkageMethod, distanceThreshold = 2.0, maxClusters = 10) => {
    let distanceMatrix = [];

    // Initialize cluster property for non-zero items
    for (let i = 0; i < data.length; i++) {
        data[i].cluster = i;
    }

    for (let i = 0; i < data.length; i++) {
        let row = [];
        for (let j = 0; j < data.length; j++) {
            row.push(calculateDistance(data[i], data[j], keys, weights));
        }
        distanceMatrix.push(row);
    }

    const clusterSizes = new Array(data.length).fill(1);

    let currentClusters = new Set(data.map(item => item.cluster));

    while (currentClusters.size > maxClusters) {
        // Find the two closest clusters using Ward's method
        let [i, j, minDistance] = findClosestClusters(distanceMatrix, clusterSizes);

        if (minDistance > distanceThreshold) {
            break;
        }
      
        // Merge the two closest clusters
        mergeClusters(i, j, data, clusterSizes);
      
        // Update the distance matrix
        updateDistanceMatrix(i, j, distanceMatrix);

        currentClusters = new Set(data.map(item => item.cluster));
    }

    const finalClusters = [];
    for (const item of data) {
        if (!finalClusters[item.cluster]) {
            finalClusters[item.cluster] = [];
        }
        finalClusters[item.cluster].push(item);
    }

    // Convert object to array and filter out empty elements
    const finalClustersArray = Object.values(finalClusters).filter(cluster => cluster.length > 0);

    // Sort the clusters by length
    finalClustersArray.sort((a, b) => b.length - a.length);

    return finalClustersArray;
}

const calculateDistance = (a, b, keys, weights) => {
    let distance = 0;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const weight = weights[i];
        const diff = a[key] - b[key];

        // Include any domain-specific transformations or calculations here
        // For example: const transformedDiff = someFunction(diff);

        distance += Math.abs(diff * weight);
    }

    return distance;
}

const findClosestClusters = (distanceMatrix, clusterSizes) => {
    let minDistance = Infinity;
    let iIndex = -1;
    let jIndex = -1;
  
    for (let i = 0; i < distanceMatrix.length; i++) {
        for (let j = i + 1; j < distanceMatrix[i].length; j++) {
            const wardDistance = (clusterSizes[i] * clusterSizes[j]) / (clusterSizes[i] + clusterSizes[j]) * distanceMatrix[i][j];
            if (wardDistance < minDistance) {
                minDistance = wardDistance;
                iIndex = i;
                jIndex = j;
            }
        }
    }
    
    return [iIndex, jIndex, minDistance];
};

const mergeClusters = (i, j, data, clusterSizes) => {
    let newSize = 0;
    for (const item of data) {
        if (item.cluster === j) {
            item.cluster = i;
            newSize++;
        }
        if (item.cluster === i) {
            newSize++;
        }
    }
    clusterSizes[i] = newSize;
    clusterSizes[j] = 0;
};

const updateDistanceMatrix = (i, j, distanceMatrix) => {
    // Remove j-th row
    distanceMatrix.splice(j, 1);
  
    // Remove j-th column from all remaining rows
    for (let k = 0; k < distanceMatrix.length; k++) {
      distanceMatrix[k].splice(j, 1);
    }
}

module.exports = hierarchyCluster