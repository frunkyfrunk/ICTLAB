const nlp = require("compromise");

function checkForm(story) {
    var result = {
        isWellFormed: false,
        form: {
            role: checkRole(story),
            mean: checkMean(story),
            end: checkEnd(story)
        },
    }
    result.isWellFormed = checkAll(result.form)
    return result
}

function checkRole(story){
   //var text = story.split(/.*As a\s+|As an\s+(.*).*,\s+/i)[2])
    var text = nlp(story).match("As a #Noun").out()
    if(text != undefined)
        return text
    else{
        return "Missing"
    }
}

function checkMean(story){
    var text = story.split(/.*I (would like|need|want|have)* ?\s+(.*).*so that|so\s+/i)[2]
    if(text != undefined)
        return text
    else{
        return "Missing"
    }
}

function checkEnd(story){
    var text = story.split(/.*so that|so\s+(.*).*/i)[2]
    if(text != undefined)
        return text
    else{
        return "Missing"
    }
}

function checkAll(form){
    if(form.role != "Missing" && form.mean != "Missing" && form.end != "Missing")
        return true
    else{
        return false
    }
}
//console.log(checkForm("As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."))
console.log(checkForm("I want to see an error when I cannot see recommendations after I upload an article"))