const hierarchyCluster = require('../../dataAnalytics/hierarchyCluster')
const normalization = require('../../dataAnalytics/normalization')

const getPoolInvestorsClusters = async (addresses) => {
    addresses.forEach(address => {
        address.total_volume = 0
        address.txs_amount = address.txs.length
        address.txs.forEach(tx => {
            address.total_volume += tx.value > 0 ? tx.value : tx.value * -1
        })
    })

    // Then, apply Min-Max scaling to total_volume and txs_amount
    const totalVolumes = addresses.map(address => address.total_volume);
    const scaledTotalVolumes = normalization.zScoreNormalization(totalVolumes);

    const txsAmounts = addresses.map(address => address.txs_amount);
    const scaledTxsAmounts = normalization.minMaxScaling(txsAmounts);

    addresses.forEach((address, index) => {
        address.normalized_total_volume = scaledTotalVolumes[index];
        address.normalized_txs_amount = scaledTxsAmounts[index];
    });


    const averageLinkClusters = await hierarchyCluster(addresses, ['normalized_total_volume', 'normalized_txs_amount'], [0.7, 0.3], 'average');
    return {averageLinkClusters}
}

module.exports = getPoolInvestorsClusters