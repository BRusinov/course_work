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
			$('#task').modal('hide');
			$("#match").append("<p>"+new_matches+"</p>");
			$("#training").append("<p>"+new_training+"</p>");
    		new_matches=$("#task #new_matches").val("");
    		new_training=$("#task #new_training").val("");
		});
	});
});