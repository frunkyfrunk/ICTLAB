function checkForm(story) {
    return {
      role: story.split(/.*As a\s+|As an\s+(.*).*,\s+/i)[2].split(",")[0],
      mean: story.split(/.*I (would like|need|want|have)* ?\s+(.*).*so that|so\s+/i)[2].replace('to',''),
      end: story.split(/.*so that|so\s+(.*).*/i)[2],
      full: story
    };
}
console.log(checkForm("As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."))
