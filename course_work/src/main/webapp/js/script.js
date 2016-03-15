$(document).ready(function() {
    "use strict";
    var PLAYER_ENDPOINT = "http://localhost:3000/Regular_user";
	function playerEndpoint(playerId) {
		return PLAYER_ENDPOINT + "/" + playerId;
	}
	var all;
    function listInformation() {
        return $.ajax(playerEndpoint(1), {
            method: "GET",
            dataType: "json"
        });
    }
    
    function listAll(){
        return $.ajax(PLAYER_ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }
    
    function reloadComments() {
        listInformation().then(function(response) {
            function addComment(player) {
            	$("#new_ones").text(player.notes);
            }
            addComment(response);
        });
    }
    
    function reloadPlayers() {
        listAll().then(function(response) {
            function addPlayer(player) {
    			$("#table_body").append("<tr><td>"+player.username+"</td><td><a href='comments.html' role='button' class='btn btn-info' id=comments_player>View comments</a></td>" +
    					"<td><a href='tasks.html' role='button' class='btn btn-success' id='tasks_player'>View tasks</a></td>" +
    					"<td><a href='statistic.html' role='button' class='btn btn-warning' id='statistic_player'>View statistic</a></td></tr>");
            }
            console.log(response);
            $(response).each(function(index, player){
                	addPlayer(player);
               });
        });
    }
    
    function reloadStatistics() {
        listInformation().then(function(response) {
            function updateStatistics(player) {
            	$("#goals").text(player.statistics.goals);
            	$("#assists").text(player.statistics.assists);
            	$("#minutes").text(player.statistics.minutes);
            }
            _.forEach(response, updateStatistics(response));
        });
    }
    
    reloadComments();
    reloadPlayers();
    reloadStatistics();
    
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
    $("#update_statistic").click(function() {
    	$('#statistic').modal('toggle');
    	$('#statistic').modal('show');
    	$("#statistic #update").click(function() {
    		all=$.ajax(playerEndpoint(1), {
        		method: "GET",
        		dataType: "json"
        	}).then(function(response) {
        		var scored_goals=$("#statistic #scored_goals").val();
        		var made_assists=$("#statistic #made_assists").val();
        		var minutes_played=$("#statistic #minutes_played").val(); 	   	
        		response.statistics={
        				goals:scored_goals,
        				assists:made_assists,
        				minutes:minutes_played
        		};
        		$.ajax(playerEndpoint(1), {
      			   method: "PUT",
      			   dataType: "json",
      			   data: JSON.stringify(response),
      			   contentType: "application/json; charset=utf-8"
         		});
        		$('#statistic').modal('hide');
    			$("#goals").text(response.statistics.goals);
    			$("#assists").text(response.statistics.assists);
    			$("#minutes").text(response.statistics.minutes);
        		scored_goals=$("#statistic #scored_goals").val("");
        		made_assists=$("#statistic #made_assists").val("");
        		minutes_played=$("#statistic #minutes_played").val("");
			});

		});
	});
    $("#new_player").click(function() {
    	$('#add').modal('toggle');
    	$('#add').modal('show');
    	$("#add #add_player").click(function() {
			var name=$("#add #name").val();
			var country=$("#add #country").val();
			var goals=$("#add #new_goals").val();
			var assists=$("#add #new_assists").val();
			var minutes=$("#add #new_minutes").val();
			var fines=$("#add #fines").val();
			var violations=$("#add #violations").val();
			var matches=$("#add #matches").val();
			var notes=$("#add #notes").val();
			var tasks=$("#add #tasks").val();
			var results=$("#add #results").val();
			var diet=$("#add #diet").val();
			var transfer_value=$("#add #transfer_value").val();
			var yellow_cards=$("#add #yellow_cards").val();
			var red_cards=$("#add #red_cards").val();
			var wage=$("#add #wage").val();
			var contract=$("#add #contract").val();
			$('#add').modal('hide');
			$("#table_body").append("<tr><td>"+name+"</td><td><a href='comments.html' role='button' class='btn btn-info' id=comments_player>View comments</a></td>" +
					"<td><a href='tasks.html' role='button' class='btn btn-success' id='tasks_player'>View tasks</a></td>" +
					"<td><a href='statistic.html' role='button' class='btn btn-warning' id='statistic_player'>View statistic</a></td></tr>");
        	var player = {
    	    	      	username: name,
    	    	      	country:country,
    	    	      	statistics:{
    	    	      		goals:goals,
    	    	      		assists:assists,
    	    	      		minutes:minutes
    	    	      	},
    	    	      	fines:fines,
    	    	      	violations:violations,
    	    	      	matches:matches,
    	    	      	notes:notes,
    	    	      	tasks:tasks,
    	    	      	results:results,
    	    	      	diet:diet,
    	    	      	transfer_value:transfer_value,
    	    	      	yellow_cards:yellow_cards,
    	    	      	red_cards:red_cards,
    	    	      	wage:wage,
    	    	      	contract:contract
    	    	      };
    	    	      var createPromise = $.ajax(PLAYER_ENDPOINT, {
    	    	        method: "POST",
    	    	        contentType: "application/json; charset=utf-8",
    	    	        data: JSON.stringify(player),
    	    	        dataType: "json"
    	    	      }).then(function(response) {
    	    	        console.log(response);
    	    	        return response;
    	    	      });
			name=$("#statistic #scored_goals").val("");
    	});
	});
   
});