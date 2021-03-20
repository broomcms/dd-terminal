const WEB_STATUS_SUCCESS = 0;
const WEB_STATUS_FAILURE = 1;
const WEB_STATUS_INVALID_PARAM = 2;
var connID;
var invokeStatus = WEB_STATUS_SUCCESS;

var waas = tetra.waas('ingenico.coreapp.T3CoreService')
.on('invoke', function (data) {
	//extract the received data
	dataObj = JSON.parse(data.data);
	var invokeRequest = dataObj.invoke_request;
	var obj = JSON.parse(invokeRequest);
	var amount = parseInt(obj["core"].tran_amt);
	//Perform the desired processing
	console.log("I'm before Transaction. The received amount is "+amount);
	//Return response + status of the invocation to Core Application
	dataObj = JSON.parse(data.data);
	connID = dataObj["$wp_connId"];
	var response = {
		"web":{
			"tran_amt": amount
		}
	};
	var invokeResponse = JSON.stringify(response);
	this.sendResponse({invoke_response: invokeResponse, invoke_status: invokeStatus}, {connectionId: connID});
})
.start();