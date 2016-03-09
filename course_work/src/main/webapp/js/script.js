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
});