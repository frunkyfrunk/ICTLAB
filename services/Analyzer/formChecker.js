
function checkForm(story) {
    let role = checkRole(story)
    let mean = checkMean(story)
    let end = checkEnd(story)
    var result = {
        isWellFormed: false,
        form: {
            role: role,
            mean: mean,
            end: end,
            fullstripped: role + " " + mean + " " + end
        },
    }
    result.isWellFormed = checkAll(result.form)
    return result
}

function checkRole(story) {
    var containsformat = story.split(/.*As a\s+|As an\s+(.*).*,\s+/i);
    var text = undefined;
    if (containsformat.length > 1) {
        text = containsformat[2].split(/,| I /i)[0]
    }
    if (text != undefined)
        return text
    else {
        return ""
    }
}

function checkMean(story) {
    var text;
    story = story.replace(' to ', ' ')
    if (story.match(/.*so that|so\s+(.*).*/i))
        text = story.split(/.*I (would like|need|want|have)* ?\s+(.*).*(so that|so)\s+/i)[2]
    else
        text = story.split(/.*I (would like|need|want|have)* ?\s+(.*).*/i)[2]
    if (text != undefined)
        return text
    else {
        return ""
    }
}

function checkEnd(story) {
    var text = story.split(/.*so that|so\s+(.*).*/i)[2]
    if (text != undefined)
        return text
    else {
        return ""
    }
}

function checkAll(form) {
    if (form.role != "" && form.mean != "" && form.end != "")
        return true
    else {
        return false
    }
}
module.exports = function (story) {
    return checkForm(story)
};