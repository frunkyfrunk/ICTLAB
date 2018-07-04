//Checking for duplicates using the cosine distance formula
function calculateCosineDistance(story1, story2) {
    var sentence1 = story1.replace(/,/g, "").split(" ");
    var sentence2 = story2.replace(/,/g, "").split(" ");
    var words = {};
    for (var i = 0; i < sentence1.length; i++) {
        var word = sentence1[i].toLowerCase();
        if (words[word] == null)
            words[word] = {
                0: 1,
                1: 0
            };
        else words[word][0]++;
    }

    for (var i = 0; i < sentence2.length; i++) {
        var word = sentence2[i].toLowerCase();
        if (words[word] == null)
            words[word] = {
                0: 0,
                1: 1
            };
        else words[word][1]++;
    }
    var denominator = 0;
    var sqrt1 = 0;
    var sqrt2 = 0;

    for (var key in words) {
        var word = words[key];
        denominator += word[0] * word[1];

        sqrt1 += Math.pow(word[0], 2);
        sqrt2 += Math.pow(word[1], 2);
    }

    var nominator = Math.sqrt(sqrt1) * Math.sqrt(sqrt2);
    return denominator / nominator;
}

function mainloop(stories, treshold) {
    let duplicates = [];
    for (var i in stories) {
        var story = stories[i];
        for (var j in stories) {
            if (j != i) {
                var neighbour = stories[j]
                var distance = calculateCosineDistance(neighbour, story);
                if (distance > treshold && duplicates.some(i=> i.story1 == neighbour) == false) {
                    duplicates.push({
                        story1: story,
                        story2: neighbour,
                        distance: distance
                    })
                }
            }
        }
    }
    return duplicates;
}
module.exports = function (stories, treshold) {
    return mainloop(stories, treshold)
};