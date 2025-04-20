// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockBase {
    struct User {
        string name;
        bool isRegistered;
    }

    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        string label;
        uint timestamp;
    }

    mapping(address => User) public users;
    address[] public registeredUsers;
    string[] public expenseLabels;
    Transaction[] public transactions;

    // Event for when a transaction is made
    event TransactionMade(address indexed sender, address indexed receiver, uint amount, string label, uint timestamp);

    function register(string memory _name) public {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender] = User(_name, true);
        registeredUsers.push(msg.sender);
    }

    function getMyName(address user) public view returns (string memory) {
        require(users[user].isRegistered, "Not registered");
        return users[user].name;
    }

    function isRegistered(address user) public view returns (bool) {
        return users[user].isRegistered && bytes(users[user].name).length > 0;
    }

    function getTotalRegisteredUsers() public view returns (uint) {
        return registeredUsers.length;
    }

    function addExpense(string memory label) public {
        require(users[msg.sender].isRegistered, "Not registered");
        expenseLabels.push(label);
    }

    function getLastExpenseLabel() public view returns (string memory) {
        require(expenseLabels.length > 0, "No expenses found");
        return expenseLabels[expenseLabels.length - 1];
    }

    function sendTransaction(address to, uint amount, string memory label) public {
        require(users[msg.sender].isRegistered, "Sender not registered");
        require(users[to].isRegistered, "Receiver not registered");
        require(amount > 0, "Amount must be greater than 0");

        // Emit an event for transaction
        transactions.push(Transaction({
            sender: msg.sender,
            receiver: to,
            amount: amount,
            label: label,
            timestamp: block.timestamp
        }));

        // Emit event to notify frontend (optional)
        emit TransactionMade(msg.sender, to, amount, label, block.timestamp);

        // Optional: Update expense label list if needed
        expenseLabels.push(label); 
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    // Fetch transactions for a particular user (sender or receiver)
    function getTransactionsByUser(address user) public view returns (Transaction[] memory) {
        uint count = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].sender == user || transactions[i].receiver == user) {
                count++;
            }
        }

        Transaction[] memory userTransactions = new Transaction[](count);
        uint index = 0;

        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].sender == user || transactions[i].receiver == user) {
                userTransactions[index] = transactions[i];
                index++;
            }
        }

        return userTransactions;
    }
}
