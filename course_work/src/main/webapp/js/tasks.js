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
    function reloadTasks() {
    	var id;
    	if(window.location.href.indexOf("tasksPlayer") != -1)
    	      id = window.location.href.substr(window.location.href.indexOf("tasksPlayer")+"tasksPlayer".length +1)
    	else return null;
        listInformation(id).then(function(response) {
        
            function addTasks(player) {
            	$("#match").text(player.tasks[0]);
            	$("#training").text(player.tasks[1]);
            }
            addTasks(response);
        });
    }
    
    reloadTasks();
    
    $("#new_task").click(function() {
    	$('#task').modal('toggle');
    	$('#task').modal('show');
    	$("#task #save_task").click(function() {
    		var new_matches=$("#task #new_matches").val();
    		var new_training=$("#task #new_training").val();
    		var new_array=[new_matches,new_training];
    		var matchToString=new_array[0].toString();
    		var trainingToString=new_array[1].toString();
    		all=$.ajax(playerEndpoint(1), {
        		method: "GET",
        		dataType: "json"
        	}).then(function(response) {
        		response.tasks[0]=matchToString;
        		response.tasks[1]=trainingToString;
        		$.ajax(playerEndpoint(1), {
      			   method: "PUT",
      			   dataType: "json",
      			   data: JSON.stringify(response),
      			   contentType: "application/json; charset=utf-8"
         		});
    			$("#match").text(response.tasks[0]);
    			$("#training").text(response.tasks[1]);
        	});
			$('#task').modal('hide');

    		new_matches=$("#task #new_matches").val("");
    		new_training=$("#task #new_training").val("");
		});
	});
});