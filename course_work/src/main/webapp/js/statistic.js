$(document).ready(function() {
    "use strict";
    var PLAYER_ENDPOINT = "http://localhost:3000/Regular_user";
    function playerEndpoint(playerId) {
		return PLAYER_ENDPOINT + "/" + playerId;
	}
    function listInformation(id) {
        return $.ajax(playerEndpoint(id), {
            method: "GET",
            dataType: "json"
        });
    }
    function reloadStatistics() {
    	var id;
    	if(window.location.href.indexOf("statisticsPlayer") != -1)
    	      id = window.location.href.substr(window.location.href.indexOf("statisticsPlayer")+"statisticsPlayer".length +1)
    	else return null;
        listInformation(id).then(function(response) {
            function updateStatistics(player) {
            	$("#goals").text(player.statistics.goals);
            	$("#assists").text(player.statistics.assists);
            	$("#minutes").text(player.statistics.minutes);
            	$("#fines").text(player.fines);
            	$("#yellow").text(player.yellow_cards);
            	$("#red").text(player.red_cards);
            	$("#player_name").text(player.username);
            	$("#player_age").text(player.age);
            	$("#player_country").text(player.country);
            	$("#player_violations").text(player.violations);
            	$("#player_matches").text(player.matches);
            	$("#player_notes").text(player.notes);
            	$("#player_tasks").text(player.tasks);
            	$("#player_results").text(player.results);
            	$("#player_diet").text(player.diet);
            	$("#player_value").text(player.transfer_value);
            	$("#player_wage").text(player.wage);
            	$("#player_contract").text(player.contract);
            }
            _.forEach(response, updateStatistics(response));
        });
    }
    reloadStatistics();
    

    $("#update_statistic").click(function() {
    	$('#statistic').modal('toggle');
    	$('#statistic').modal('show');
    	$("#statistic #update").click(function() {
    		var all=$.ajax(playerEndpoint(1), {
        		method: "GET",
        		dataType: "json"
        	}).then(function(response) {
        		console.log(response);
        		var scored_goals=$("#statistic #scored_goals").val();
        		var made_assists=$("#statistic #made_assists").val();
        		var minutes_played=$("#statistic #minutes_played").val(); 
        		var fines=$("#statistic #fines").val();
        		var yellow=$("#statistic #yellow").val();
        		var red=$("#statistic #red").val();
        		var new_goals=parseFloat(scored_goals)+parseFloat(response.statistics.goals);
        		var new_assists=parseFloat(made_assists)+parseFloat(response.statistics.assists)
        		var new_minutes=parseFloat(minutes_played)+parseFloat(response.statistics.minutes);
        		var new_fines=parseFloat(fines)+parseFloat(response.fines);
        		var new_yellow=parseFloat(yellow)+parseFloat(response.yellow_cards);
        		var new_red=parseFloat(red)+parseFloat(response.red_cards);
        		response.fines=new_fines;
        		response.yellow_cards=new_yellow;
        		response.red_cards=new_red;
        		alert(response.fines);
        		alert(response.yellow_cards);
        		alert(response.red_cards);
        		response.statistics={
        				goals:new_goals,
        				assists:new_assists,
        				minutes:new_minutes
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
        		scored_goals=$("#statistic #scored_goals").val("");
        		made_assists=$("#statistic #made_assists").val("");
        		minutes_played=$("#statistic #minutes_played").val("");
			});

		});
	});
});