const sp = require('wordsworth').getInstance();

async function checkSpelling(story){
    sp.initialize( 
        './data/seed.txt',
        './data/training.txt', function() {      
          console.log('Initialized!');            
          console.log(sp.analyze(story));
        }
    );
}
module.exports = function (story) {
    return checkSpelling(story)
};