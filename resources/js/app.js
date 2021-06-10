const WEB_STATUS_SUCCESS = 0;
const WEB_STATUS_FAILURE = 1;
const WEB_STATUS_INVALID_PARAM = 2;

var connID;
var invokeStatus = WEB_STATUS_SUCCESS;

tetra.waas('ingenico.coreapp.T3CoreService').on('ChipDetectedEvent',function(response){
    console.log('ChipDetectedEvent: '+response);
});

waas = tetra.waas('ingenico.coreapp.T3CoreService')
.on('invoke', function (data) {

    //extract the received data
    dataObj = JSON.parse(data.data);

    // Setting vars for calculation
    var invokeRequest = dataObj.invoke_request;
    var obj = JSON.parse(invokeRequest);
    var srv_type = obj.core.srv_type;
    console.log('srv_type: '+srv_type);
    var amount = parseInt(obj["core"].tran_amt)/100;

    // Get discount info from merchant
    if (srv_type==1){

        console.log("I'm before Transaction. The received amount is "+amount);
        console.log('Get discount info from merchant');

    // Get discount paiement from customer
    }else if(srv_type==2){

        console.log('Get discount paiement from customer');

    // Process discount
    }else if(srv_type==3){

        console.log('Process discount');

    }

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
}).start();