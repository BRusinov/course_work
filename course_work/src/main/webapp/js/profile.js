$(document).ready(function() {
    "use strict";
    var COACH_ENDPOINT = "http://localhost:3000/Super_user";
    function showCoach(){
    	$.ajax(COACH_ENDPOINT, {
    		method: "GET",
    		dataType: "json"
    	}).then(function(response) {
    		function showTeam(coach){
    			$("#coach_name").text(coach.username);
    			$("#coach_country").text(coach.country);
    			$("#coach_age").text(coach.age);
    		}
            $(response).each(function(index, team){
            	showTeam(team);
           });
    	});
    }
    
    showCoach();
});