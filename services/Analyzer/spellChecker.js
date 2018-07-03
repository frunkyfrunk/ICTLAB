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

//checkSpelling("hellow mai namuh isuh mert and what is yours?");
//checkSpelling("Gawd bless murica if you know what i am sayink?");
//checkSpelling("it iz all oveer teh bills are nott paidd")

module.exports = function (story) {
    return checkSpelling(story)
};