// part of meteor, as soon as page renders, then run this function - run masonry (masonize)
Template.main.rendered = function(){
  setTimeout(function(){
    masonize(function(){
    });
  }, 500);
  $('.search-query input').focus();
};

// monitor click on "add snippet" on nav bar
Template.nav.events({
  'click .addInterest':function(event,template){
    event.preventDefault();
    Session.set('adding_interest',true);
    // currently adding a new "interest"
  }
});

Template.article.events({
  'click .like':function(event,template){
    var curLike = Likes.findOne({muser:Meteor.userId(),article:template.data._id});
    if(!curLike){
      Likes.insert({muser:Meteor.userId(),article:template.data._id});
    }
    Session.set('updated',new Date());
  },
  'click .delete':function(event, template){
    Articles.remove(this._id);
  }
});

Template.addform.events({
  'click .save':function(event,template){
    var description = template.find('.description').value;
    var name = template.find('.name').value;
    var url = template.find('.url').value;
    var height = getRandomInt(150,350);
    Articles.insert({description:description,name:name,src:url,height:height,width:'25%'});
    Session.set('adding_interest',false);
  },
  'click .cancel':function(){
    Session.set('adding_interest',false);
  },
  'click .close':function(){
    Session.set('adding_interest',false);
  },
});


// creation of the masonize function
function masonize(callback){
  var $container = $('#mainContent');
  // initialize
  $container.masonry({
    itemSelector: '.item',
    gutter:20
  })
  var msnry = $container.data('masonry');
    if(callback){callback()};
};


// lightbox plugin using javascript
$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('#my-lightbox', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox();
    });
});


// for generating random sizing for masonry
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




