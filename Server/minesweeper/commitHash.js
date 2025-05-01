const { AbiCoder, keccak256 } = require('ethers');

const roomMinesMap = {};

module.exports = async function commitHash(contract, room, mines) {
    const positions = [];
    while (positions.length < mines) {
        const rand = Math.floor(Math.random() * 25); // 0-24
        if (!positions.includes(rand)) {
            positions.push(rand);
        }
        else{
            continue; 
        }
    }

    const abi = new AbiCoder();
    const abiEncoded = abi.encode(["uint8[]"], [positions]);
    const hash = keccak256(abiEncoded);

    const tx = await contract.commitMineHash(room, hash);
    await tx.wait();
    console.log(`✅ Committed for room ${room}:`, tx.hash);

    roomMinesMap[room] = positions;
}

module.exports.roomMinesMap = roomMinesMap;
