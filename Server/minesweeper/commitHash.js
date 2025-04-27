const { AbiCoder, keccak256 } = require('ethers');

// This will store room -> mines array
const roomMinesMap = {};

module.exports = async function commitHash(contract, room, mines) {
    const positions = [];
    while (positions.length < mines) {
        const rand = Math.floor(Math.random() * 25); // 0 to 24
        if (!positions.includes(rand)) {
            positions.push(rand + 1); // 1 to 25
        }
    }

    const abi = new AbiCoder();
    const abiEncoded = abi.encode(["uint8[]"], [positions]);
    const hash = keccak256(abiEncoded);

    const tx = await contract.commitMineHash(room, hash);
    await tx.wait();
    console.log(`✅ Committed for room ${room}:`, tx.hash);

    // Save the generated mines for this room
    roomMinesMap[room] = positions;
}

// Export the map so other files can access it too
module.exports.roomMinesMap = roomMinesMap;
