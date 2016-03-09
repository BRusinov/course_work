$(document).ready(function() {
    "use strict";
    $("#new_comment").click(function() {
    	$('#myModal').modal('toggle');
    	$('#myModal').modal('show');
    	$("#myModal #save_comment").click(function() {
    		var new_comment=$("#myModal #comment").val();
			$('#myModal').modal('hide');
			new_comment=$("#myModal #comment").val("");
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
    		var scored_goals=$("#statistic #scored_goals").val();
    		var made_assists=$("#statistic #made_assists").val();
    		var minutes_played=$("#statistic #minutes_played").val();
			$('#statistic').modal('hide');
			$("#goals").append("<td>"+scored_goals+"</td>");
			$("#assists").append("<td>"+made_assists+"</td>");
			$("#minutes").append("<td>"+minutes_played+"</td>");
    		scored_goals=$("#statistic #scored_goals").val("");
    		made_assists=$("#statistic #made_assists").val("");
    		minutes_played=$("#statistic #minutes_played").val("");
		});
	});
    $("#new_player").click(function() {
    	$('#add').modal('toggle');
    	$('#add').modal('show');
    	$("#add #add_player").click(function() {
			var name=$("#add #name").val();
			$('#add').modal('hide');
			$("#table_body").append("<tr><td>"+name+"</td><td><button type='button' class='btn btn-info' id=comments_player>View comments</button></td>" +
					"<td><button type='button' class='btn btn-success' id='tasks_player'>View tasks</button></td>" +
					"<td><button type='button' class='btn btn-warning' id='statistic_player'>View statistic</button></td></tr>");
    		name=$("#statistic #scored_goals").val("");
		});
	});
    
});