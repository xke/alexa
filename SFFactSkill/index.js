/**
 * This skill has no external dependencies or session management, and 
 * uses a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask San Francisco for a fact"
 *  Alexa: "Here's your San Francisco fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
APP_ID = "amzn1.echo-sdk-ams.app.59a9a6d7-ccd8-4d28-b0a9-3a3cd74838b0";

/**
 * Array containing San Francisco facts.
 */
var SF_FACTS = [
    "The Chinese fortune cookie was invented by a Japanese resident of San Francisco.",
    "Irish coffee was perfected and popularized in the City by the Bay.",
    "Lombard Street gets all the love, but Filbert St. between Hyde and Leavenworth Streets is the steepest: 31.5 degrees!",
    "San Francisco was part of Mexico until the Mexican-American War in 1848.",
    "During the Depression, not a single San Francisco-based bank failed.",
    "Business was so good, the city constructed the Oakland Bay Bridge and the Golden Gate Bridge during the Depression.",
    "When Al Capone was held at Alcatraz, he gave regular Sunday concerts with the inmate band, the Rock Islanders. He played the banjo.",
    "In 1901, the city outlawed burials. Most of its cemeteries are in Colma, Calif. There, the dead outnumber the living by over 1000 to 1.",
    "The 'Summer of Love' actually started in the winter. The January 1967 Human Be-In at Golden Gate Park kicked it off.",
    "Speaking of seasonal confusion, Mark Twain wasn’t as down on San Francisco’s weather as some people would have you believe. Twain never uttered the quote, 'The coldest winter I ever spent was a summer in San Francisco.'",
    "The neighborhoods of Marina, Mission Bay, and Hunters Point are all built atop a landfill.",
    "The first bubonic plague epidemic in the continental US broke out in SF’s Chinatown in 1900.",
    "As historical beginnings go, the United Nations Charter was drafted and ratified in San Francisco in 1945.",
    "And as historic endings go, the Beatles gave their last full concert at Candlestick Park on August 29, 1966.",
    "San Francisco was huge on the mid-century treaty circuit. In 1951, the Treaty of San Francisco officially ended Japanese hostilities from World War II.",
    "When prospectors caught gold fever and hightailed it to California, San Francisco's port became packed with abandoned ships. With demand to build the city booming, the ships were torn apart and repurposed into banks, businesses, and homes.",
    "Decades later, in 1906, three quarters of the city was destroyed by an earthquake and fire.",
    "Contemporary reports of the fire note that an unlikely hero helped save the city: Redwood trees. When fire hit buildings made of redwood, which has low resin content and a porous grain that takes in lots of water, they didn’t go up in smoke.",
    "In September 1859, San Francisco’s favorite eccentric resident, Joshua Abraham Norton, declared himself America’s emperor. Emperor Norton had a following: Nearly 30,000 people later packed the streets for his funeral.",
    "The bear on California’s state flag is modeled after a California grizzly named Monarch, who was held at Golden Gate Park.",
    "The U.S. Navy originally planned on painting the Golden Gate Bridge black with yellow stripes. The famed 'International Orange' color was supposed to be a sealant.",
    "In 1867, San Francisco instituted America’s first 'ugly law,' which prohibited unsightly people from showing their faces in public. (It’s since been repealed.)",
    "The city’s cable cars are the only National Historical Monument that can move.",
    "The Liberty Bell once vacationed in San Francisco! When San Francisco hosted the Panama-Pacific International Exposition in 1915, America’s most famous bell made a national train tour to be part of the fun. After the exposition ended, it returned to Philadelphia, where it’s stayed ever since. Once you’ve seen San Francisco, why travel anywhere else?"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SanFrancisco onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SanFrancisco onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SanFrancisco onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask San Francisco to tell me a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random  fact from the facts list
    var factIndex = Math.floor(Math.random() * SF_FACTS.length);
    var fact = SF_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your San Francisco fact: " + fact;

    response.tellWithCard(speechOutput, "SanFrancisco", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};

