//The code below registers a Web App to be invoked Before and After Sale or return transaction and as payment method for Sale transaction with an ID set to “ABCD1234”.
var register_cfg = {
    "web":{
        "id":"0480570D", //Web App ID
        "display_name":"Sample App", //display name
    },
    "reg_1":{
        "applicable_transactions":["0","3"], //sale & return
        "web":{
        "srv_type":"3", // After transaction
        "dol":[] // Web service output parameters
        },
        "core": {
            "dol":[] //Web service input parameters
        }
    },
    "reg_2":{
        "applicable_transactions":["0"], //sale
        "web":{
            "srv_type":"2", // Pay with non-payment cards
            "dol":["tran_status","auth_amt","tran_date", "tran_time"] // Web service output parameters
        },
        "core": {
            "dol":["tran_amt"] //Web service input parameters
        }
    },
    "reg_3":{
        "applicable_transactions":["0","3"], //sale & return
        "web":{
            "srv_type":"1", // Before transaction
            "dol":["tran_amt"] // Web service output parameters
        },
        "core": {
            "dol":["tran_amt"] //Web service input parameters
        }
    }
};

var register_service = tetra.service({
    service: 'local.service.T3CoreService',
    namespace: 'ingenico.coreapp'
});

var reg_request = JSON.stringify(register_cfg);
var Data = {
    'registration_request': reg_request
}

register_service.connect().call('RegisterApp',{data:Data}).then(function (response) {
    var res = parseInt(response.registration_status);
    switch (res) {
        case 0:
            //alert("Application not registered");
			console.log("Application not registered");
            break;
        case 1:
            //alert("Application registered");
			console.log("Application registered");
        break;
            default:
            //alert("An error occured");
			console.log("An error occured");
        break;
    }
}).disconnect();