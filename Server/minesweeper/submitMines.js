module.exports = async function submitMines(contract, room, mines) {

    try {
        const tx= await contract.submitMines(room, mines);
        await tx.wait();
        console.log(`✅ Submitted mines for room ${room}:`, tx.hash); 
    } catch (error) {
        console.error('Error submitting mines:', error);
        return;  
    }
}