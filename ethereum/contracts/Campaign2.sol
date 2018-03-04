pragma solidity ^0.4.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string name) public {
        address newCampaign = new Campaign(minimum, msg.sender, name);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    string public test;

    function Campaign(uint minimum, address creator, string _name) public {
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        if (!approvers[msg.sender]) {
            approversCount++;
        }
        approvers[msg.sender] = true;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory request = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(request);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender] && !request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete && request.approvalCount > (approversCount / 2));
        request.complete = true;

        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function approved(uint index) public view returns (bool) {
        Request storage request = requests[index];
        bool status = request.approvals[msg.sender];
        return status;
    }
}