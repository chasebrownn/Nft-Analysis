import { publicClient } from './client.js';
import { isAddress, parseAbiItem } from 'viem';
import express from 'express';
// const data = await publicClient.readContract({
//     address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
//     abi: wagmiAbi,
//     functionName: 'totalSupply',
// })
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
// 0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB -> CryptoPunks
app.use('/:address', async (req, res, next) => {
    var address_str = req.params.address.toString();
    console.log(isAddress(address_str)); // use this to error handle -> if false, error
    console.log(`0x${address_str.substring(2)}`);
    console.log(isAddress(`0x${address_str.substring(2)}`));
    const logs = await publicClient.getLogs({
        address: `0x${address_str.substring(2)}`,
        event: parseAbiItem('event PunkOffered(uint256 indexed, uint256, address indexed)'),
        fromBlock: 17784991n,
        toBlock: 17787483n
    });
    //console.log(logs);
    //console.log(logs.length);
    let returnMe = castArray(logs);
    console.log(returnMe);
    let obj = {};
    logs.forEach(element => obj[element.eventName] = element.address);
    //res.json({'logs': logs});
    res.send(returnMe);
});
function castArray(arr) {
    let localJson = {};
    for (let i = 0; i < arr.length; i++) {
        localJson += '{ "Address" : ' + JSON.stringify(arr[i].address) + ' }';
        console.log(JSON.stringify(arr[i].address));
    }
    console.log(arr.length);
    return localJson;
}
//const server = http.createServer(express);
app.listen(3000);
//# sourceMappingURL=index.js.map