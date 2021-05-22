const WEB_STATUS_SUCCESS = 0;
const WEB_STATUS_FAILURE = 1;
const WEB_STATUS_INVALID_PARAM = 2;

var connID;
var invokeStatus = WEB_STATUS_SUCCESS;

// keypress capture and log
$(document).on('keypress',function(e) {
    console.log(e.which);
});

var waas = tetra.waas('ingenico.coreapp.T3CoreService')
.on('invoke', function (data) {

    //extract the received data
    dataObj = JSON.parse(data.data);

    // Setting vars for calculation
    var invokeRequest = dataObj.invoke_request;
    var obj = JSON.parse(invokeRequest);
    var amount = parseInt(obj["core"].tran_amt)/100;
   
    // Show step 1 (Merchant input)
    $( document ).ready(function() {
        $("body").css({"margin": "0"}); // Fix page margin
        $(".step1").show();
        tetra.weblet.show();
        $('.startingamount').text("$ "+amount);
    });

    tetra.weblet.on("close", function() {
        tetra.weblet.hide();
        $(".step1").hide();
    });

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

// Interface Navigation
$( document ).ready(function() {

    $(document).on('keypress',function(e) {
        if (e.which==22){eventswitcher("next");}
        if (e.which==23){eventswitcher("previous");}
    });

    function eventswitcher(e){
        current = $(".terminal:visible").attr("rel");
        if (current==1){ // Merchant click event on input amount page
            if (e=="next"){ // Go to step 2
                $(".step1").hide();
                $(".step2").show();

                // Calculating step 2
                var amt_string = $('.startingamount').text();
                var amount = parseInt(amt_string.split(" ")[1]);
                var dol = parseFloat($("#dol").val()) || 0;
                var pou = parseFloat($("#pou").val()) || 0;
                var amount_dol = 0;
                var amount_pou = 0;
                if ($("#dol").val()){amount_dol = dol;}
                if ($("#pou").val()){amount_pou = (amount / 100 * pou);}
                var amount = (amount - amount_dol - amount_pou);
            
                // Showing merchant transaction
                $('.dolamount').text("$ "+dol);
                $('.pouamount').text(pou+" %");
                $(".amount_dol").val(amount_dol);
                $(".amount_pou").val(amount_pou);          
                $('.newtransaction').text("$ "+amount);
            }else{ // Back to transaction
                if (e=="previous"){
                    $(".step2").hide();
                    $(".step1").hide();
                    tetra.weblet.hide();
                }
            }
        }
        if (current==2){ // Merchant click event from Merchant confirms transaction
            if (e=="next"){ // Go to transaction
                $(".step2").hide();
                tetra.weblet.hide();
            }
            if (e=="previous"){ // Go to step 1
                $(".step1").show();
                $(".step2").hide();
            }
        }

        // TODO: step 3 and 4 needs to be extracted from mockup and added here
        if (current==3){ // Customer enters pin
            if (e=="next"){ 

            }
            if (e=="previous"){

            }
        }
        if (current==4){ // Customer confirms transaction
            if (e=="next"){ 

            }
            if (e=="previous"){
                
            }
        }
    }
});   

