$(document).ready(function() {
    "use strict";
    var PLAYER_ENDPOINT = "http://localhost:3000/Regular_user";
    function playerEndpoint(playerId) {
		return PLAYER_ENDPOINT + "/" + playerId;
	}
	var all;
    function listInformation(id) {
        return $.ajax(playerEndpoint(id), {
            method: "GET",
            dataType: "json"
        });
    }
    function reloadComments() {
    	var id;
    	if(window.location.href.indexOf("commentsPlayer") != -1)
    	      id = window.location.href.substr(window.location.href.indexOf("commentsPlayer")+"commentsPlayer".length +1)
    	else return null;
        listInformation(id).then(function(response) {
            function addComment(player) {
            	$("#new_ones").text(player.notes);
            }
            addComment(response);
        });
    }
    
    reloadComments();
    
    $("#new_comment").click(function() {
    	$('#myModal').modal('toggle');
    	$('#myModal').modal('show');
    	$("#myModal #save_comment").click(function() {
    		all=$.ajax(playerEndpoint(1), {
        		method: "GET",
        		dataType: "json"
        	}).then(function(response) {
        		var new_comment=$("#myModal #comment").val();
    			response.notes=new_comment;
        		$('#myModal').modal('hide');
    			new_comment=$("#myModal #comment").val("");
    			$("#new_ones").text(response.notes);
        		console.log(response);
        		$.ajax(playerEndpoint(1), {
     			   method: "PUT",
     			   dataType: "json",
     			   data: JSON.stringify(response),
     			   contentType: "application/json; charset=utf-8"
        		});
        	});
		});
	});
    
    $(document).on("click", "#comments_player", function(e){
        e.preventDefault();
        var object = {"commentsPlayer": $(this).attr("data-playerId")}
        
        window.location = $(this).attr("href") + "?" + $.param(object, true);
    });
});