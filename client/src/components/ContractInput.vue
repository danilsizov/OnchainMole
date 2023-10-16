<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-8">
                <input class="contract_input_input" v-model="contract" />
            </div>
            <div class="col-2 d-flex">
                <select class="contract_net_select" v-model="selectedNetwork">
                    <option value="BSC">BSC</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Arbitrum">Arbitrum</option>
                    <option value="Polygon">Polygon</option>
                    <option value="Avalanche">Avalanche</option>`
                </select>
            </div>
            <div class="col-2 d-flex">
                <button class="contract_input_btn" @click="getTransactions">Get Data</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="custom_card">
                    <div class="card_title">
                        Total Amount of Deposits/Withdrawals
                    </div>
                    <div class="xl_card_content">
                        <Bar id="my-chart-id" :key="chartUpdateKey" :options="chartOptionsU" :data="chartDataU"
                            v-if="loaded" class="med_chart" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="custom_card">
                    <div class="card_title">
                        Active users/All users
                    </div>
                    <div class="card_content_text">
                        {{ users_amount.active }} / {{ users_amount.all }}
                    </div>
                </div>
                <div class="custom_card">
                    <div class="card_title">
                        Total tokens supply
                    </div>
                    <div class="card_content_text">
                        {{ total_supply }}
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="custom_card">
                    <div class="card_title">
                        Shares of user's TVL
                    </div>
                    <div class="card_content">
                        <Doughnut :data="doughnutData" :options="doughnutOptions" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="custom_card">
                    <div class="card_title">
                        Users segmentation by pool data
                    </div>
                    <div class="card_content pool_segments">
                        <Bubble :data="poolSegmentData" :key="chartUpdateKey" :options="poolSegmentOptions" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="custom_card">
                    <div class="card_title">
                        Deposit/Withdrawal by segments
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar, Doughnut, Bubble } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LogarithmicScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LogarithmicScale)

import axios from 'axios';
export default {
    name: 'ContractInput',
    components: { Bar, Doughnut, Bubble },
    computed: {
        chartDataU() { return this.chartData },
        chartOptionsU() { return this.chartOptions },
        chartPoolSegmentDataU() { return this.poolSegmentData },
        chartPoolSegmentOptionsU() { return this.poolSegmentOptions }
    },
    data() {
        return {
            contract: '0xe2AD2c5702f6c9073f85b00E4743066E1D1035f8',
            transations: [],
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Deposits',
                    data: [],
                    backgroundColor: 'green'
                }],
            },
            selectedNetwork: 'BSC',
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            doughnutOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            },
            doughnutData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            poolSegmentData: {
                datasets:[]
            },
            poolSegmentOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    y: { // Specify the y-axis here
                        type: 'logarithmic',
                        position: 'left',
                        ticks: {
                            min: 1, // minimum value for logarithmic scale should be greater than 0
                            max: 200, // example maximum value
                            callback: function(value) {
                                return Number(value.toString()); // return value
                            }
                        },
                        title: {
                            display: true,
                            text: 'Logarithmic Scale'
                        }
                    },
                    x: { // Specify the y-axis here
                        type: 'logarithmic',
                        position: 'left',
                        ticks: {
                            min: 0.5, // minimum value for logarithmic scale should be greater than 0
                            max: 8000, // example maximum value
                            callback: function(value) {
                                return Number(value.toString()); // return value
                            }
                        },
                        title: {
                            display: true,
                            text: 'Logarithmic Scale'
                        }
                    }
                }
            },
            loaded: false,
            chartUpdateKey: 0,
            users_amount: {
                all: 0, active: 0
            },
            total_supply: 0
        }
    },
    methods: {
        async getTransactions() {
            await axios.get('http://localhost:2000/?contract=' + this.contract + '&network=' + this.selectedNetwork)
                .then((res) => {
                    console.log(res.data.transactions)

                    let transactions = res.data.transactions

                    this.users_amount.all = transactions.users_amount.all
                    this.users_amount.active = transactions.users_amount.active

                    this.total_supply = this.formatNumber(transactions.total_supply);

                    this.doughnutData = {
                        labels: transactions.users_shares.labels,
                        datasets: [
                            {
                                data: transactions.users_shares.data,
                                backgroundColor: transactions.users_shares.backgroundColor
                            },
                        ]
                    }

                    this.chartData = {
                        labels: transactions.txGraph.deposit.aggregatedLabels,
                        datasets: [
                            {
                                label: 'Deposits',
                                data: transactions.txGraph.deposit.aggregatedDepositData,
                                backgroundColor: '#389466'
                            },
                            {
                                label: 'Withdrawal',
                                data: transactions.txGraph.withdrawal.aggregatedWithdrawalData,
                                backgroundColor: 'red'
                            },
                        ]
                    };

                    transactions.segments.averageLinkClusters.forEach( (segment, index) => {
                        let addresses = []
                        segment.forEach( (address) => {
                            addresses.push({
                                x: address.total_volume,
                                y: address.txs_amount,
                                r: 10
                            })
                        })
                        this.poolSegmentData.datasets.push({
                            backgroundColor: 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')',
                            label: index,
                            data: addresses
                        })
                    })
                    this.loaded = true;
                    this.chartUpdateKey++;
                })
        },

        formatNumber(value) {
            let stringValue = value.toString();
            let integerPart = stringValue.split('.')[0];

            let integerLength = integerPart.length;

            // If the number is already 7 characters or less, return it
            if (stringValue.length <= 7) {
                return parseFloat(stringValue).toFixed(7 - integerLength - 1);
            }

            // Based on the integer length, adjust the decimal points
            switch (integerLength) {
                case 7:
                    return parseFloat(value).toFixed(0);
                case 6:
                    return parseFloat(value).toFixed(0);
                case 5:
                    return parseFloat(value).toFixed(1);
                case 4:
                    return parseFloat(value).toFixed(2);
                case 3:
                    return parseFloat(value).toFixed(3);
                case 2:
                    return parseFloat(value).toFixed(4);
                case 1:
                    return parseFloat(value).toFixed(5);
                default:
                    return parseFloat(value).toFixed(6);
            }
        }
    }
}
</script>

<style>
.b-container {
    margin-right: 20px;
}

.contract_input_input {
    padding: 10px 18px;
}

.contract_net_select {
    padding: 10px 8px;
}

.contract_input_input,
.contract_net_select {
    border-radius: 0.4285rem;
    font-size: .7500000025rem;
    -webkit-transition: color .3s ease-in-out, border-color .3s ease-in-out, background-color .3s ease-in-out;
    transition: color .3s ease-in-out, border-color .3s ease-in-out, background-color .3s ease-in-out;
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    font-weight: 400;
    line-height: 1.428571;
    color: hsla(0, 0%, 100%, .8);
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid #2b3553;
    box-sizing: border-box;
}

.contract_input_btn {
    cursor: pointer;
    background: #e14eca;
    background-image: -webkit-gradient(linear, right top, left bottom, from(#e14eca), color-stop(#ba54f5), to(#e14eca));
    background-image: linear-gradient(to bottom left, #e14eca, #ba54f5, #e14eca);
    background-size: 210% 210%;
    background-position: 100% 0;
    background-color: #e14eca;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #fff;
    border: none;
    border-radius: 0.4285rem;
    padding: 0px 40px;
    height: 38px;
    font-size: .875rem;
    line-height: 1.35em;
    font-weight: 600;
}

.contract_input_card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.custom_card {
    background: #27293d;
    border: 0;
    width: 100%;
    margin-bottom: 30px;
    overflow: hidden;
    padding: 15px 5px;
    box-sizing: border-box;
}

.card_title {
    font-size: 20px;
    color: white;
    font-weight: 200;
    text-align: left;
    padding-left: 20px;
}

.xl_card_content {
    height: 450px;
}

.card_content_text {
    color: white;
    font-size: 56px;
    font-weight: 900;
}

.pool_segments{
    height: 600px;
}
</style>