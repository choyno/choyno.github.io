var twitterUsername = "envato";
var twitterEnabled = true;
var tweetCount = 5;
var tweetRotationDuration = 7000;
var latitude = 41.038966;
var longitude = 28.984451;
var zoom = 15;

$(document).ready(function() {
	

    


var    verticalScroll =[];
 
    
    function setupVerticalScroll(id){
        
        if(verticalScroll[id]===undefined || id==='#home'){
          
            if($('#profile').hasClass('current')){
        var el=$('.horizontal-scroll-holder');
        el.sly({
        horizontal: 1,
        itemNav: "basic",
        dragHandle: 1,
        dynamicHandle: 1,
        dragging: 1,
        scrollBy: 1,
        speed: 300,
        cycleBy: 'items',
        scrollBar: $('.horizontal-scroll-holder').parent().find(".scrollbar"),
        cycleInterval: 1000,
        startPaused: 1,
        easing: "easeOutBack" // with jQuery Easing plugin
    },{
                load: function () {
                    $('.current.page').find('.init').animate({opacity:1},function(){
                        $(this).removeClass('init');
                    });
            
                }
            });
           
           
            
        }else{
            
            var elmnt=$('#'+id+' .vertical-scroll-holder');
            elmnt.sly({
               
                itemNav: "basic",
                dragHandle: 1,
                dynamicHandle: 1,
                dragging: 1,
                scrollBy: 1,
                speed: 300,
                cycleBy: 'items',
                scrollBar: elmnt.parent().find(".scrollbar"),
                cycleInterval: 1000,
                startPaused: 1,
                easing: "easeOutBack" // with jQuery Easing plugin
            },{
                load: function () {
                  
           $('.current.page').find('.init').animate({opacity:1},function(){
                        $(this).removeClass('init');
                    });
                }
            });
           
        
            }
            verticalScroll[id]=true;
         
             
    }
}

// -----------------------------------------------------------------


    //    Menu -----------------------------------------------------------------
    $('.menu a,.brand-holder a').address($(this).attr('href'));
      
    $('.menu li').first().addClass('active');
    
setupVerticalScroll("#profile");
   
    $('.menu a,.brand-holder a').click(function(){
        var el=$(this);
        $('.menu .active').removeClass('active');
        el.parent().addClass('active');
       var openingPage=$("#"+el.attr('data-opening-id'));
       var closingPage=$(".page.current");
        changePage(openingPage,closingPage,el.attr('data-opening-id'));
       
    });
    
    $.address.change(function(event) {  
       
    var pageID=event.value.split('/')[1];
   if(pageID!=''){
    
     var el=$(".menu-holder [href=#"+pageID+"]");
     
        $('.menu .active').removeClass('active');
        el.parent().addClass('active');
       var openingPage=$("#"+pageID);
       var closingPage=$(".page.current");
        changePage(openingPage,closingPage,pageID);
   }    
}); 
    
    function changePage(openingPage,closingPage,id){
      
        closingPage.stop(true).slideUp(function(){
            closingPage.removeClass('current');
            openingPage.slideDown(function(){
                openingPage.addClass('current');
                setupVerticalScroll(id);
                checkGoogleMap();
                checkContactForm();
               setupPortfolio();
               setupSkills();
            });
        });
       
    }
   
    // ------------------------------------------------------------------

function setupPortfolio(){

    if($('.page.current #grid').length>0){
        
        $('.filter-options li').on('click', function() {
        var $this = $(this),
            $grid = $('#grid');

        // Hide current label, show current label in title
        $('.filter-options .active').removeClass('active');
        $this.addClass('active');

        // Filter elements
        $grid.shuffle($this.data('group'));
    });

    // instantiate the plugin
    $('#grid').shuffle({
        group : 'all',
        speed : 1000,
        easing: 'ease-in-out'
    });
    
setTimeout(function(){
    $('#grid').parent().animate({opacity:1},function(){
                        $(this).removeClass('init');
                    });
    
    
},500);
}
    
}
function setupSkills(){
    if($('.page.current .skill').length>0){
       var counter=1;
        $('.page.current .skill').each(function(){
            var el=$(this);
            var level=el.find('.level').attr('data-level');
            
            el.find('.level').delay(counter*300).animate({width:level+"%"},800,"easeOutBack");
            counter++;
        });
        
    }
}




    $("a[data-rel^='prettyPhoto']").prettyPhoto();
    


 
// Twitter -----------------------------------------------------------------
if($('.tweets-holder').length>0 && twitterEnabled){
    var tweetsHtml;
      var statusHTML = [];
     
    //This method parse the json file into tweet area
   parseTweets = function(twitters) {
       
        $('.tweet-loader').fadeOut();
     
       
      
       
        for (var i=0; i<twitters.length; i++){
            
           makeTweet(i,twitters);
        
       
        
        
        checkTwitterModule();
       } 
    };
    
    var makeTweet= function(i,twitters){
         var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\&lt;\&gt;]*[^.,;'">\:\s\&lt;\&gt;\)\]\!])/g, function(url) {
                return '<a href="'+url+'">'+url+'</a>';
            }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
                return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
            });
            if(i===1){
                statusHTML.push('<li ><span>'+status+'</span></li>');
            }else{
                statusHTML.push('<li class="hide" ><span>'+status+'</span></li>');
            }
            tweetsHtml=statusHTML.join('');
    };
    var checkTwitterModule= function(){
    
        $('.tweets-holder ul').html('');
        $('.tweets-holder ul').html(tweetsHtml);
      
        swapTweet(); 
    };
    //Embed and shows your two recent tweets
 


    var twitterScript = document.createElement("script");
    twitterScript.type = "text/javascript";
    
    
    twitterScript.src = "https://api.twitter.com/1/statuses/user_timeline.json?screen_name="+twitterUsername+"&count="+tweetCount+"&callback=parseTweets";
    $('body').append(twitterScript);

 
    // Swap the tweets   
    var swapTweet=function swapTweet() {
        
    


        $('.tweets-holder ul li:first').slideUp( function () {
            $(this).appendTo($('.tweets-holder ul')).slideDown();
        });

        setTimeout(function(){

            swapTweet();
        },tweetRotationDuration);
      

    };
      
    checkTwitterModule();
}else{
    if(!twitterEnabled){
        $('.tweets-holder').remove();
            
    }
        
        
}
var gmapIsActive=false;
function checkGoogleMap(){
  
    if($('.page.current').find('.map-holder').length>0 && !gmapIsActive){
    
   
     
        gmapIsActive=true; 
            
        $('.map-holder').gmap3({
            map:{
                options:{
                    center:[latitude, longitude],
     
                    zoom:zoom,
                    mapTypeControl: true,
   
                    navigationControl: true,
                    scrollwheel: true,
                    streetViewControl: false
                }
            },
            marker:{
                latLng:[latitude, longitude]
            }
        });
    
 
    }
} 
var contactFormSetuped=false;
function checkContactForm(){
    if($('.page.current').find('.contact-form').length>0 && !contactFormSetuped){
        contactFormSetuped=true;
     
        //  triggers contact form validation
        var formStatus=$(".contact-form").validate();
        //   ===================================================== 

        //sending contact form
        $(".contact-form").submit(function(e){
            e.preventDefault();
            if(formStatus.errorList.length===0)
            { 
                $(".contact-form .submit").fadeOut(function(){
                    $('#loading').css('visibility','visible');
                    $.post('submit.php',$(".contact-form").serialize(),
				
                        function(data){
                            $(".contact-form input,.contact-form textarea").not('.submit').val('');
                                
                            $('.message-box').html(data);
						
						
                            $('#loading').css('visibility','hidden');
                            $(".contact-form .submit").removeClass('disabled').css('display','block');
                        }
				
                        ); 
                });     
 
				
            }
			
			
			
        });
    //   ===================================================== 
    }
}

});
