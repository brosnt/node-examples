//Simple example of using nools to enforce payment hold rules defined in an external .nools file
var nools = require("nools");

//compile the .nools file
var ruleFilePath = __dirname + "/rules/payments.nools";
var flow = nools.compile(ruleFilePath);

//define Payment object, then add a couple of Payment objects to the session 
//("asserting facts" in RETE rule engine speak)
var Payment = flow.getDefined("Payment");
var session = flow.getSession();

var p1 = new Payment(1000);
var p2 = new Payment(12000.98);
var p3 = new Payment(21020.10)
var p4 = new Payment(15892.23)

session.assert(p1);
session.assert(p2);
session.assert(p3);
session.assert(p4);

//execute the RETE algorithm against all the facts (Payment objects) in the session.
//This will run in a separate thread, asynchronous to the thread executing this flow
session.match().then(
  function() {
	  //promise that is resolved once there are no more rules to execute
	  console.log("Completed matching of facts against our ruleset");
	  console.log("p1 Amount=["+ p1.amount +"], HeldForReview=["+ p1.holdForManualReview +"], Rejected=["+ p1.rejected +"]");
	  console.log("p2 Amount=["+ p2.amount +"], HeldForReview=["+ p2.holdForManualReview +"], Rejected=["+ p2.rejected +"]");
	  console.log("p3 Amount=["+ p3.amount +"], HeldForReview=["+ p3.holdForManualReview +"], Rejected=["+ p3.rejected +"]");
	  console.log("p4 Amount=["+ p4.amount +"], HeldForReview=["+ p4.holdForManualReview +"], Rejected=["+ p4.rejected +"]");

	  //cleanup - purge the current session of all facts (releases memory)
	  session.dispose();
  }		
);

console.log("Initiated Rules execution @ " + ruleFilePath);


