$(document).ready(function() {
    "use strict";
    var PLAYER_ENDPOINT = "http://localhost:3000/Regular_user";
    var TEAM_ENDPOINT = "http://localhost:3000/Team"; 
    function listAll(){
        return $.ajax(PLAYER_ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }
    
    function listTeam(){
        return $.ajax(TEAM_ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }
    
    function reloadPlayers() {
        listAll().then(function(response) {
            function addPlayer(player) {
    			$("#table_body").append("<tr><td>"+player.username+"</td><td><a href='comments.html' role='button' class='btn btn-info' id='comments_player' data-playerId="+player.id+">View comments</a></td>" +
    					"<td><a href='tasks.html' role='button' class='btn btn-success' id='tasks_player' data-playerId="+player.id+">View tasks</a></td>" +
    					"<td><a href='statistic.html' role='button' class='btn btn-warning' id='statistic_player' data-playerId="+player.id+">View statistic</a></td></tr>");
    			
            }
            console.log(response);
            $(response).each(function(index, player){
                	addPlayer(player);
               });
        });
    }
    $(document).on("click", "#comments_player", function(e){
        e.preventDefault();
        var object = {"commentsPlayer": $(this).attr("data-playerId")}
        
        window.location = $(this).attr("href") + "?" + $.param(object, true);
    });
    
    $(document).on("click", "#statistic_player", function(e){
        e.preventDefault();
        var object = {"statisticsPlayer": $(this).attr("data-playerId")}
        
        window.location = $(this).attr("href") + "?" + $.param(object, true);
    });
    
    $(document).on("click", "#tasks_player", function(e){
        e.preventDefault();
        var object = {"tasksPlayer": $(this).attr("data-playerId")}
        
        window.location = $(this).attr("href") + "?" + $.param(object, true);
    });

    reloadPlayers();
    $("#new_player").click(function() {
    	$('#add').modal('toggle');
    	$('#add').modal('show');
    	$("#add #add_player").click(function() {
			var name=$("#add #name").val();
			var age=$("#add #age").val();
			var country=$("#add #country").val();
			var goals=$("#add #new_goals").val();
			var assists=$("#add #new_assists").val();
			var minutes=$("#add #new_minutes").val();
			var fines=$("#add #fines").val();
			var violations=$("#add #violations").val();
			var matches=$("#add #matches").val();
			var notes=$("#add #notes").val();
			var tasks_matches=$("#add #tasks_matches").val();
			var tasks_training=$("#add #tasks_training").val();
			var results=$("#add #results").val();
			var diet=$("#add #diet").val();
			var transfer_value=$("#add #transfer_value").val();
			var yellow_cards=$("#add #yellow_cards").val();
			var red_cards=$("#add #red_cards").val();
			var wage=$("#add #wage").val();
			var contract=$("#add #contract").val();
			$('#add').modal('hide');
			$("#table_body").append("<tr><td>"+name+"</td><td><a href='comments.html' role='button' class='btn btn-info' id='comments_player'>View comments</a></td>" +
					"<td><a href='tasks.html' role='button' class='btn btn-success' id='tasks_player'>View tasks</a></td>" +
					"<td><a href='statistic.html' role='button' class='btn btn-warning' id='statistic_player'>View statistic</a></td></tr>");
        	var player = {
    	    	      	username: name,
    	    	      	age:age,
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
    	    	      	tasks:[tasks_matches,tasks_training],
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
    
    $("#team_details").click(function() {
    	$('#view').modal('toggle');
    	$('#view').modal('show');
    	listTeam().then(function(response) {
			function showDetails(team){
				$("#team_details").attr("team_id", team.id);
				$("#team_goals").text(team.scored_goals);
				$("#team_conceded").text(team.goals_conceded);
				$("#team_position").text(team.position);
				$("#team_champions_league").text(team.participation.Champions_League);
				$("#team_cup").text(team.participation.Cup);
				$("#team_matches").text(team.matches);
				$("#new_team_goals").val("0");
				$("#new_team_conceded").val("0");
				$("#new_team_position").val("0");
				$("#new_champions_league").val("0");
				$("#new_cup").val("0");
				$("#new_team_matches").val("0");
				
			}
        $(response).each(function(index, player){
        		showDetails(player);
        	});
        });
	})
   
	$("#view #update").click(function(){
		listTeam().then(function(response) {
			var team=response[0];
			var team_goals=$("#new_team_goals").val();
			var conceded=$("#new_team_conceded").val();
			var position=$("#new_team_position").val();
			var league=$("#new_champions_league").val();
			var cup=$("#new_cup").val();
			var matches=$("#new_team_matches").val();
			var results_goals=parseFloat(team_goals)+parseFloat(team.scored_goals);
			team.scored_goals=results_goals;
			var results_conceded=parseFloat(conceded)+parseFloat(team.goals_conceded);
			team.goals_conceded=results_conceded;
			team.position=position;
			team.participation.Champions_League=league;
			team.participation.Cup=cup;
			team.matches=matches;
			console.log(team);
			var id=$("#team_details").attr("team_id");
			$.ajax(TEAM_ENDPOINT+"/"+id, {
	  			   method: "PUT",
	  			   dataType: "json",
	  			   data: JSON.stringify(team),
	  			   contentType: "application/json; charset=utf-8"
	     		});
		})
		$("#view").modal("hide");
		alert("Updated successfully!");
	})
	$("#back").click(function() {
		$("#view").modal('hide');
	});
	
});