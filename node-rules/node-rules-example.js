//Simple example of using node-rules to perform a decision on a Payment object
var RuleEngine = require('node-rules');

//define the rules
var rules = [{
   "condition" : function(R) {
      R.when(this && (this.amount >  10000));
   },
   "consequence" : function(R) {
      this.holdForManualReview = true;
      R.stop();
   }
}];
 
//sample fact to run the rules on
var payment = {
 "paymentId":"432561",
 "amount":19009.23,
 "cardType":"VISA",
 "holdForManualReview":false,
};
 
//initialize the rule engine
var R = new RuleEngine(rules);
 
//Now pass the fact on to the rule engine for results
R.execute(payment,function(result){

	if(result.holdForManualReview)
 		console.log("Payment Placed on Hold");
	else
 		console.log("Payment Automatically Allowed to Proceed");
});



