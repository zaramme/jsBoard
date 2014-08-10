$(function(){

	    	$("#area_55").append("<div class=\"piece\"><img src=\"./images/koma/1010.png\" /></div>");

$.ajax({
	url: './json/init.json',
	dataType: 'json',
	success: function(data){
		for(objName in data.board)
		{
	    	$("#area_" + data.board[objName].pos).append("<div class=\"piece\"><img src=\"./images/koma/"
	    	+ data.board[objName].img +".png\" /></div>");
		}
	}
});

$(document).on("click", ".piece", function(){
		$(this).parent().addClass("selected");
	});
	
});