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
    
});