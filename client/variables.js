
// display of all articles
Template.main.articles = function(){
  var search = {};
  return Articles.find(search,{limit:20});
};

// adding a new post
Template.main.adding_interest = function(){
  return Session.get('adding_interest');
};

// number of likes
Template.article.numlikes = function(){
  return Likes.find({article:this._id}).count();
};

// has clicked the like button
Template.article.likethis = function(){
  var doesLike = Likes.findOne({muser:Meteor.userId(),article:this._id});
  if(doesLike)
  return "You Like This!";
};

Template.article.delete = function(){
  return Articles.find({article:this._id})
};


// updates to the new post
Template.main.updated = function(){
  return Session.get('updated');
};
