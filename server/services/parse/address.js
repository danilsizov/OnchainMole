require('dotenv').config()
const axios = require('axios')

const get_addresses_portfolio = async (addresses) => {
    for(let i = 0; i < addresses.length; i++){
        try{
            {
                let url = 'https://pro-openapi.debank.com/v1/user/all_token_list'
                const res = await axios.get(url, {
                    params: {
                        id: addresses[i].addr
                    },
                    headers: {
                        'accept': 'application/json',
                        'AccessKey': process.env.DEBANK_API
                    }
                })
                console.log(res.data)
                addresses[i].tokens = res.data

                url = 'https://pro-openapi.debank.com/v1/user/all_complex_protocol_list'
                const res_protocols = await axios.get(url, {
                    params: {
                        id: addresses[i].addr
                    },
                    headers: {
                        'accept': 'application/json',
                        'AccessKey': process.env.DEBANK_API
                    }
                })

                addresses[i].protocols = res_protocols.data
            }
        } catch(err){
            console.log(err)
        }
    };

    return addresses
}

module.exports = get_addresses_portfolio