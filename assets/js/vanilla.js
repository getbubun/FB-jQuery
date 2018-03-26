// main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {
    
    $("#Facebookfeed").hide();
    $("#Facebookprofile").hide();
    $("#goBackBtn").hide();
    $("#photos").hide();

  //Function for Button 1 for profile info  
  
    $("#facebookBtn1").on('click',function(){
      $("#photos").show();
        $("#Facebookfeed").hide("100");
        $("#Facebookprofile").show("100");
        $("#facebook").hide();
        $("#goBackBtn").show();
        $("#work").hide();
        $("#family").hide();
        $("#contact").hide();
        $("#basic").show();
        
        
      // function for sidebar  
      $("#click1").on("click",function(){
        $("#basic").show();
        $("#work").hide();
        $("#family").hide();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click2").on("click",function(){
        $("#basic").hide();
        $("#work").show();
        $("#family").hide();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click3").on("click",function(){
        $("#basic").hide();
        $("#work").hide();
        $("#family").show();
        $("#contact").hide();
        $("#goBackBtn").show();
      });

      $("#click4").on("click",function(){
        $("#basic").hide();
        $("#work").hide();
        $("#family").hide();
        $("#contact").show();
        $("#goBackBtn").show();
      });  

        var myFacebookToken = $("#apiid").val(); //call api token from webpage
    
        $.ajax('https://graph.facebook.com/me?fields=picture.width(250).height(250),id,name,first_name,last_name,birthday,about,hometown,languages,gender,education,work,relationship_status,quotes,family,website,email,cover.width(815).height(320)&access_token='+myFacebookToken,{

          success : function(response){
              console.log(response);
              console.log(typeof(response));
              // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src", "" + response.picture.data.url + "");
              
              //About me Section
              $("#myFirstName").text(response.first_name);
              $("#myLastName").text(response.last_name);
              $("#myName").text(response.name);
              $("#myProfileId").html('<a target="blank" href="https://facebook.com/'+response.id+'">https://facebook.com/'+response.id+'</a>');
              $("#myGender").text(response.gender);
              $("#myBirthday").text(response.birthday);
              var languages = response.languages;
              var myLanguage = $.map(response.languages, function(index) {
                return index.name;
              });
              $("#myLanguage").text(myLanguage);
              $("#myHomeTown").text(response.hometown.name); 
              $("#myQuotes").text(response.quotes);

              // Work and Education  
              var work = response.work;
              var myWork = $.map(work, function(index) {
                return index.employer.name;
              });
              $("#myWork").text(myWork);

              var education = response.education;
              var myEducation = $.map(education, function(index) {
                return index.school.name;
              });
              $("#myEducation").text(myEducation);
      
              // Family and Relationship
              $("#myRelation").html(response.relationship_status);
              var family = response.family;
              var myFamily = $.map(family, function(index) {
                return index.name;
              });
              $("#myFamily").text(myFamily);

              //Contact
              $("#myEmail").text(response.email);            
              $("#myWebsite").html(response.website);

              
          }, // end of success      
                
          //error handling
          error: function(jqXHR) {
            alert(jqXHR.responseJSON.error.message + " Please reload the page and Enter valid API token");
          },
        });//end argument list end ajax call 
    });// end get facebookbtn1 info

    //Function for Button 2 for Feed info   
    $("#facebookBtn2").on('click',function(){

        $("#Facebookfeed").show();
        $("#Facebookprofile").hide();
        $("#facebook").hide();
        $("#goBackBtn").show();
        $("#fb-profile").show();
        $("#photos").show();

        var myFacebookToken = $("#apiid").val();//call the api token from webpage
        
        $.ajax('https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source},picture.width(250).height(250),cover,likes&access_token='+myFacebookToken,{

            success : function(response){

              console.log(response);
              console.log(typeof(response));

              // Cover photo
              $(".myCoverPic").attr("src", "" + response.cover.source + "");  
              
              // Profile photo
              $(".myProfilePic").attr("src", "" + response.picture.data.url + "");

              var postData = response.posts.data;
              var feeds = $.map(postData, function(value, index) {
                if (index <= 10) { //for 10 posts
                  return value;
                }
              });

              //first Post
              var feed1 = $.map(feeds, function(value, index) {
                if (index == 0) {
                  return value;
                }
              });

              //for status
              if (feed1[0].type == "status") {
                $("#post1").html(response.name + " says : </br>" + feed1[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              }

              //for photo
              else if (feed1[0].type == "photo") {
                $("#post1").text("" + feed1[0].story + "");
                $(".photoPost1").html("<img src=" + feed1[0].full_picture + " " + "class=" + " img-responsive" + ">");
              }

              //for video
              else if (feed1[0].type == "video") {
                $("#post1").text("" + feed1[0].story + "");
                $(".photoPost1").html("<video controls> <source  src=" + "" + feed1[0].source + " " + "type= " + "video/mp4" + "></video>");
              }
              //first post ends here

              //second post starts here
              var feed2 = $.map(feeds, function(value, index) {
                if (index == 1) {
                  return value;
                }
              });

              //for status
              if (feed2[0].type == "status") {
                $("#post2").html(response.name + " says : </br>" + feed2[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              }
                
              //for photo
              else if (feed2[0].type == "photo") {
                $("#post2").text("" + feed2[0].story + "");
                $(".photoPost2").html("<img src=" + feed2[0].full_picture + " " + "class=" + " img-responsive" + ">");
              }

              //for video
              else if (feed2[0].type == "video") {
                $("#post2").text("" + feed2[0].story + "");
                $(".photoPost2").html("<video controls> <source  src=" + "" + feed2[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 

              else {}
              //second post ends here

              //third post starts here
              var feed3 = $.map(feeds, function(value, index) {
                if (index == 2) {
                  return value;
                }
              });
                
              //for status 
              if (feed3[0].type == "status") {
                $("#post3").html(response.name + " says : </br>" + feed3[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              }

              //for photo
              else if (feed3[0].type == "photo") {
                $("#post3").text("" + feed3[0].story + "");
                $(".photoPost3").html("<img src=" + feed3[0].full_picture + " " + "class=" + " img-responsive" + ">");
              }

              //for video shared
              else if (feed3[0].type == "video") {
                $("#post3").text("" + feed3[0].story + "");
                $(".photoPost3").html("<video controls> <source  src=" + "" + feed3[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 

              else {}
              //third post ends here

              //fourth post starts here
              var feed4 = $.map(feeds, function(value, index) {
                if (index == 3) {
                return value;
                }
              });

              //for status
              if (feed4[0].type == "status") { 
                $("#post4").html(response.name + " says : </br>" + feed4[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed4[0].type == "photo") { 
                $("#post4").text("" + feed4[0].story + "");
                $(".photoPost4").html("<img src=" + feed4[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed4[0].type == "video") { 
                $("#post4").text("" + feed4[0].story + "");
                $(".photoPost4").html("<video controls> <source  src=" + "" + feed4[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 

              else {}
              //fourth post ends here

              //fifth post starts here
              var feed5 = $.map(feeds, function(value, index) {
                if (index == 4) {
                  return value;
                }
              });

              //for status
              if (feed5[0].type == "status") { 
                $("#post5").html(response.name + " says : </br>" + feed5[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed5[0].type == "photo") { 
                $("#post5").text("" + feed5[0].story + "");
                $(".photoPost5").html("<img src=" + feed5[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed5[0].type == "video") { 
                $("#post5").text("" + feed5[0].story + "");
                $(".photoPost5").html("<video controls> <source  src=" + "" + feed5[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 

              else {}
              //fifth post ends here

              //sixth post starts here
              var feed6 = $.map(feeds, function(value, index) {
                if (index == 5) {
                  return value;
                }
              });
           
              //for status
              if (feed6[0].type == "status") { 
                $("#post6").html(response.name + " says : </br>" + feed6[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed6[0].type == "photo") { 
                $("#post6").text("" + feed6[0].story + "");
                $(".photoPost6").html("<img src=" + feed6[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed6[0].type == "video") { 
                $("#post6").text("" + feed6[0].story + "");
                $(".photoPost6").html("<video controls> <source  src=" + "" + feed6[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 
              else {}
              //sixth post ends here

              //seventh post starts here
              var feed7 = $.map(feeds, function(value, index) {
                if (index == 6) {
                  return value;
                }
              });
           
              //for status
              if (feed7[0].type == "status") { 
                $("#post7").html(response.name + " says : </br>" + feed7[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed7[0].type == "photo") { 
                $("#post7").text("" + feed7[0].story + "");
                $(".photoPost7").html("<img src=" + feed7[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed7[0].type == "video") { 
                $("#post7").text("" + feed7[0].story + "");
                $(".photoPost7").html("<video controls> <source  src=" + "" + feed7[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 
              else {}
              //seventh post ends here

              //eightth post starts here
              var feed8 = $.map(feeds, function(value, index) {
                if (index == 7) {
                  return value;
                }
              });
           
              //for status
              if (feed8[0].type == "status") { 
                $("#post8").html(response.name + " says : </br>" + feed8[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed8[0].type == "photo") { 
                $("#post8").text("" + feed8[0].story + "");
                $(".photoPost8").html("<img src=" + feed8[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed8[0].type == "video") { 
                $("#post8").text("" + feed8[0].story + "");
                $(".photoPost8").html("<video controls> <source  src=" + "" + feed8[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 
              else {}
              //eight post ends here

              //nineth post starts here
              var feed9 = $.map(feeds, function(value, index) {
                if (index == 8) {
                  return value;
                }
              });
           
              //for status
              if (feed9[0].type == "status") { 
                $("#post9").html(response.name + " says : </br>" + feed9[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed9[0].type == "photo") { 
                $("#post9").text("" + feed9[0].story + "");
                $(".photoPost9").html("<img src=" + feed9[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed9[0].type == "video") { 
                $("#post9").text("" + feed9[0].story + "");
                $(".photoPost9").html("<video controls> <source  src=" + "" + feed9[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 
              else {}
              //nine post ends here

              //tenth post starts here
              var feed10 = $.map(feeds, function(value, index) {
                if (index == 9) {
                  return value;
                }
              });
           
              //for status
              if (feed10[0].type == "status") { 
                $("#post10").html(response.name + " says : </br>" + feed10[0].message).css({
                "background-color": "white",
                "font-size": "200%"
                });
              } 

              //for photo
              else if (feed10[0].type == "photo") { 
                $("#post10").text("" + feed10[0].story + "");
                $(".photoPost10").html("<img src=" + feed10[0].full_picture + " " + "class=" + " img-responsive" + ">");
              } 

              //for video
              else if (feed10[0].type == "video") { 
                $("#post10").text("" + feed10[0].story + "");
                $(".photoPost10").html("<video controls> <source  src=" + "" + feed10[0].source + " " + "type= " + "video/mp4" + "></video>");
              } 
              else {}
              //tenth post ends here


          } //end success function
    });//end argument list end ajax call         
  }); // end get facebookbtn2 info

    $("#goBackBtn").on("click",function(){

        $("#Facebookfeed").hide();
        $("#Facebookprofile").hide();
        $("#goBackBtn").hide();
        $("#facebook").show("100");
        $("#photos").hide();


    });// end it card on click
});
  
