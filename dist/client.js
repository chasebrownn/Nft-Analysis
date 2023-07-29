import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
export const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://rpc.ankr.com/eth')
});
//# sourceMappingURL=client.js.map