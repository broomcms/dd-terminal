var serviceRegister = tetra.service({
    service: 'local.service.T3CoreService',
    namespace: 'ingenico.coreapp'
});

var reg_request = {
    "web":{
    "id":"0480570D", //Web App ID
    "display_name":"Discount App", //display name
    },
    "reg_1":{
    "applicable_transactions":["0","3"], //sale & return
    "web":{
    "srv_type":"1", // Before transaction
    "dol":["tran_amt"] // Web service output parameters
    },
    "core": {
    "dol":["tran_amt"] //Web service input parameters
    }
    },
};
var request = JSON.stringify(reg_request);
var Data = {
'registration_request': request
}
// then connects to the service


serviceRegister.connect().call('RegisterApp',{data:Data}).then(function (response) {
    var res = parseInt(response.registration_status);
    switch (res) {
        case 0:
            alert("Application not registered");
            break;
        case 1:
            alert("Application registered");
            break;
            default:
            alert("An error occured");
        break;
    }
}).disconnect();