var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 500
    };
    var userData = req.body;
    var userScores = userData.scores;
    var userName = userData.name;
    var userPhoto = userData.photo;
    var TotalDifference = 0;

    console.log(userData);

    for (var i = 0; i < friends.length; i++) {
      // console.log(friends[i].name);
      TotalDifference = 0;

      for (var f = 0; f < 10; f++) {
        TotalDifference += Math.abs(
          parseInt(userScores[f] - parseInt(friends[i].scores[f]))
        );

        if (TotalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = TotalDifference;
        }
      }
    }
    friends.push(userData);
    res.json(bestMatch);
    console.log(bestMatch);
  });
};
