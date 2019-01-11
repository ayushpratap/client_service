//------------------------------------------------------------------------------
'use strict';
const Alexa     = require('alexa-sdk');
const request   = require('request');

//=========================================================================================================================================
//  Global constants
//=========================================================================================================================================

const APP_ID                =   "amzn1.ask.skill.7d0ad3c5-0459-4df1-babf-601e00d7228f";
const SKILL_NAME            =   'Space Facts';
const GET_FACT_MESSAGE      =   "Here's your fact: ";
const HELP_MESSAGE          =   'You can say please call followed by the person you want to call';
const HELP_REPROMPT         =   'What can I help you with?';
const STOP_MESSAGE          =   'Goodbye!';
const URL_APOLLO            =   'http://ec2-3-84-84-67.compute-1.amazonaws.com:9000';
const GET_USER_ENDPOINT     =   '/getUser';
const MAKE_CALL_ENDPOINT    =   '/makeCall';
//=========================================================================================================================================
//  Intent functions
//=========================================================================================================================================

const handlers = 
{
    'LaunchRequest': function () 
    {
        console.log("LaunchRequest");
        this.emit('AMAZON.HelpIntent');
    },
    'GetNewFactIntent': function () 
    {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () 
    {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () 
    {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () 
    {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'OFFICEmakeMultiCall': function()
    {
        var user1 = this.event.request.intent.slots.USER_A.value;
        var user2 = this.event.request.intent.slots.USER_B.value;
        var userId = this.event.session.user.userId;
        console.log("1. "+user1);
        console.log("2. "+user2);
        console.log("3. "+userId);
        var response = "Something went wrong";
        function sendRequest(options,callback_req)
        {
            console.log("5. sendRequest");
            console.log("6. ");
            console.log(options);
            request(options,function(error,response,body)
            {
                console.log("7. ");
                console.log(body);
                callback_req(body);
            });
        }
        var getUserOptions = 
        {
            url:"https://alexa_sv9500.nectechnologies.in:8443/api/getUserMulti",
            method:"POST",
            json:true,
            rejectUnauthorized:false,
            requestCert:false,
            body:
            {
				"numberType":"extension",
				"userId" : userId,
                "user1":user1,
                "user2":user2
            }
        };
        var OaiCallJSONObject = 
        {
            "numberType":"extension",
            "userId":userId
        };
        var makeCallOptions = 
        {
            url:"https://alexa_sv9500.nectechnologies.in:8443/api/makeCallMulti",
            method:"POST",
            json:true,
            rejectUnauthorized:false,
            requestCert:false,
            agent:false,
            body: OaiCallJSONObject
        };
        console.log("4. ");
        console.log(OaiCallJSONObject);
        sendRequest(getUserOptions,function(body)
        {
            if(null == body.user1 && null == body.user2)
            {
                response = "Sorry "+user1+" and "+user2+" do not exists in database";
            }
            else if(null == body.user1)
            {
                response = "Sorry "+user1+" do not exists in database";
            }
            else if(null == body.user2)
            {
                response = "Sorry "+user2+" do not exists in database";
            }
            else
            {
               /* OaiCallJSONObject.user1 = body.user1;
                OaiCallJSONObject.user2 = body.user2;
                console.log("8. ")
                console.log(OaiCallJSONObject);
                sendRequest(makeCallOptions,function(body_call)
                {
                    if(body_call=="Making call")
                    {
                        response = "Okay calling "+username;
                    }
                    else
                    {
                        response = "Unable to make a call to "+username;
                    }
                });*/
            }
            console.log("9. "+response);
            this.emit(':tell',response);
        });
    },
    'OFFICEmakeCall' : function()
    {
    //--------------------------------------------------------------------------
        console.info('Starting execution of function : OFFICEmakeCall');
        var username        = this.event.request.intent.slots.USER.value;
        var userId          = this.event.session.user.userId;
        var voiceResponse   = "Some Error is there you may need to check";
        var getUserOptions  = {};
        var makeCallOptions = {};

        console.info('Username  = ',username);
        console.info('UserId    = ',userId);
        console.info('Default response = ',voiceResponse);

        // Make a HTTP request to Apollo server to get the user
        getUserOptions.url      =   URL_APOLLO+GET_USER_ENDPOINT;
        getUserOptions.method   =   'POST';
        getUserOptions.json     =   true;
        getUserOptions.body     =   {
                                        "username":username
                                    };
        console.log('getUserOptions ',getUserOptions);

        request(getUserOptions,function(error,res,body){
            console.info('Got the response for GetUser request');
            console.log('Response body',body);
            if("User does not exist" == body){
                voiceResponse = body;
                console.info('Response updated to = ',voiceResponse);
            }
            else{
            // Make a make call request using the body of the GetUser request
            // Set the Make Call request options
                makeCallOptions.url     = URL_APOLLO+MAKE_CALL_ENDPOINT;
                makeCallOptions.method  = 'POST';
                makeCallOption.json     = true;
                makeCallOptions.body    = {
                                                "userId":userId,
                                                "destination":body.Extension
                                          };
                console.log('makeCallOptions ',makeCallOptions);

                request(makeCallOptions,function(error,res,body){
                    console.info('Got the response for MakeCall request');
                    console.log('Response body ',body);
                    if('Sending data to Falcon' == body){
                        voiceResponse = "Trying make call to "+username;
                        console.info('voiceResponse updated to =',voiceResponse);
                    }
                    else{
                        voiceResponse = "Sorry some error occured";
                        console.info('voiceResponse updated to =',voiceResponse);
                    }
                });
            }
            this.emit(':tell',voiceResponse);
        });
    }
};

exports.handler = function (event, context, callback) 
{
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
