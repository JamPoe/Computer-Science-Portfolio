var Bot = require('bot');
var PF = require('pathfinding');
var bot = new Bot('qo390idu', 'training', 'http://vindinium.org'); //Put your bot's code here and change training to Arena when you want to fight others.
// var bot = new Bot('9r1kjwd2', 'arena', 'http://52.8.116.125:9000'); //Put your bot's code here and change training to Arena when you want to fight others.
var goDir;
var Promise = require('bluebird');
Bot.prototype.botBrain = function() {
    return new Promise(function(resolve, reject) {
        _this = bot;
        //////* Write your bot below Here *//////
        //////* Set `myDir` in the direction you want to go and then bot.goDir is set to myDir at the bottom *////////
        /*                                      * 
         * This Code is global data!            *
         *                                      */
        // Set myDir to what you want and it will set bot.goDir to that direction at the end.  Unless it is "none"
        var myDir;
        // Sets "myPos" equivilent to the x and y coordinates of your bot
        var myPos = [bot.yourBot.pos.x, bot.yourBot.pos.y];
        // First, enemyBots is created as an empty array, when a new match starts, each bot gets a random "id." Due to this, there is if
        // statements checking if your bot's current id does not equal that number, in which id adds that bot to the list (array) of
        // enemies
        var enemyBots = [];
        if(bot.yourBot.id != 1) enemyBots.push(bot.bot1);
        if(bot.yourBot.id != 2) enemyBots.push(bot.bot2);
        if(bot.yourBot.id != 3) enemyBots.push(bot.bot3);
        if(bot.yourBot.id != 4) enemyBots.push(bot.bot4);
        
        // This is not being used, but is for reference
        var lowestHealthIndex = 0;
        // A for loop looking through the array of enemies
        for(i = 0; i < bot.enemyBots.length; i++) {
            // Checks if the current enemy targeted has more health than other enemies, look through the list again
            if(enemyBots[lowestHealthIndex].life > enemyBots[i].life) {
                lowestHealthIndex = i;
                // More would be added to this, but overall this is meant to be able to identify and chase the weakest enemy
            }
        }
        /*                                      * 
         * This Code Decides WHAT to do         *
         *                                      */
        // This sets "task" to an empty variable, since it will be changing
        var task;
        // Bot goes to tavern for health if health is equal to or less than 30
        if(bot.yourBot.life <= 30) {
            task = "tavern";
        }
        // If health is above 30 and if there is at least 1 vacant mine, look for the closest vacant mine
        else if(bot.yourBot.life > 30 && bot.freeMines.length >= 1) {
            task = "freemines";
        }
        // If absolutely no vacant mines can be found, attack the nearest enemy bot
        else if(bot.freeMines.length === 0 || bot.freeMines.length === undefined || bot.freeMines.length === null || bot.yourBot.life > 30) {
            task = "attack";
        }
        /*                                      * 
         * This Code Determines HOW to do it    *
         *                                      */
        // Checks if the task is equal to "freemines" in which is executes the code below 
        if(task === "freemines") {
            // Sends "Finding a free mine..." to the console so you know it is functioning correctly
            console.log("Finding a free mine...");
            // "closestMine" is set equivilent to the first object in the bot.freeMines array (since the first object always starts with 0)
            var closestMine = bot.freeMines[0];
            // A for loop. This sets "i" to 0 (representing the first object, makes it less then the length of the freeMines array 
            // (length in an array involves the amount of objects, than the amount of symbols in a phrase), and constantly counts up
            for(i = 0; i < bot.freeMines.length; i++) {
                // Checks if the current distance between your bot's position and the closest mine is greater than other objects in the 
                // array and if so, closestMine equals the next free mine on the list (this works because it is looping and thus
                // contantly checking with the if statement, eventually leading to the closest mine)
                if(bot.findDistance(myPos, closestMine) > bot.findDistance(myPos, bot.freeMines[i])) {
                    closestMine = bot.freeMines[i];
                }
            }
            // myDir is an already existing variable, which will calculate directions when given a path
            // bot.findPath is finding the path between your bot and the closest mine that was calculated
            myDir = bot.findPath(myPos, closestMine);
            // This logs the coordinates of the closest mine to the console, for reference to ensure it is functioning correctly
            console.log("Going to " + closestMine);
            // bot.goDir is used by online matches to determine your direction, so with this, your bot can function on both practice
            // matches and online matches
            bot.goDir = myDir;
        }
        
        // Checks if the task is equal to "tavern"
        else if(task === "tavern") {
            // Logs "Finding a tavern..." to the console, informing that it is looking for health
            console.log("Finding a tavern...");
            // "closestTavern" is set to equal the first object of the bot.taverns "list" or array
            var closestTavern = bot.taverns[0];
            // Creates a for loop for the taverns
            for(i = 0; i < bot.taverns.length; i++) {
                // Checks if the distance between your bot and the first tavern on the "list" is greater in distance than the next one
                // on the list and if so, set "closestTavern" to the next tavern in the array
                if(bot.findDistance(myPos, closestTavern) > bot.findDistance(myPos, bot.taverns[i])) {
                    closestTavern = bot.taverns[i];
                }
            }
            console.log("Going to " + closestTavern);
            // Sets the direction to the path between you and the closest tavern
            myDir = bot.findPath(myPos, closestTavern);
            // Sets the direction for online matches
            bot.goDir = myDir;
        }
        // Checks if the task is equal to "attack"
        else if(task === "attack") {
            // Sets "closestEnemy" to the x and y coordinates of the first enemy on enemyBots
            var closestEnemy = [enemyBots[0].pos.x, enemyBots[0].pos.y];
            for(i = 0; i < bot.enemyBots.length; i++) {
                // If the distance is greater than the next one on the list, bump up the value of closestEnemy to eventually find the closest
                if(bot.findDistance(myPos, closestEnemy) > bot.findDistance(myPos, enemyBots[i])) {
                    closestEnemy = [enemyBots[i].pos.x, enemyBots[i].pos.y];
                }
            }
            myDir = bot.findPath(myPos, closestEnemy);
            // Logs to the console the coordinates of the enemy being persued, which really helped me debug an error at one point
            console.log("Attacking " + closestEnemy);
            bot.goDir = myDir;
        }
        /*                                                                                                                              * 
         * This Code Sets your direction based on myDir.  If you are trying to go to a place that you can't reach, you move randomly.   *
         * Otherwise you move in the direction set by your code.  Feel free to change this code if you want.                            */
        // If the bots direction equals "none," or basically if the bot has nothing to do, and if there are no freemines to get,
        // switch the task to "attack"
        // Otherwise, if there is something to do, go in the direction assigned
        if(myDir === "none") {
            if(bot.freeMines.length === 0 || bot.freeMines.length === undefined || bot.freeMines.length === null) {
                task === "attack";
            }
        } else {
            bot.goDir = myDir;
        }
        ///////////* DON'T REMOVE ANTYTHING BELOW THIS LINE *//////////////
        resolve();
    });
}
bot.runGame();