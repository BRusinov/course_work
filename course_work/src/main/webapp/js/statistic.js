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
            }
            _.forEach(response, updateStatistics(response));
        });
    }
    reloadStatistics();
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
});