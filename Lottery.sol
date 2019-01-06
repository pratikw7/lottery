pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public{
        manager = msg.sender;
    }

    function enter() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    //    players.push(0xa4759274C44cF1A0e547C03797C935040d63E83c);
    }

    function random() private view returns(uint){
        return uint(keccak256(block.difficulty,now,players));
    }

    function pickWinner() public restricted{
        require(msg.sender == manager);
        uint index = random() % players.length;
         //players[1].transfer(this.balance);
         players[index].transfer(this.balance);
         players = new address[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address[])
    {
        return players;
    }
}
