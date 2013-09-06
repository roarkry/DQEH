$(document).ready(function(){
	var bgPage = chrome.extension.getBackgroundPage();

	//setup the popup and input boxes
	chrome.tabs.getSelected(null, function(tab){
		var url = tab.url.toLowerCase().match(/http.*secure/);
		var guid = tab.url.match(/[A-z0-9]{8}-[A-z0-9]{4}-[A-z0-9]{4}-[A-z0-9]{4}-[A-z0-9]{12}/);
		
		if(guid && guid.length > 0){
			$("#guid").val(guid);
		}
		if(url && url.length > 0){
			$("#url").val(url);
		}
	});
	
	//bind to the button
	$("#button").click(function(){
		var url = $("#url").val();
		var guid = $("#guid").val();
		
		var result = bgPage.SetupInterval(url, guid);
		if(result){
			$("#output").html("<b>Session Persistence Setup!</b>");
			appendSession(bgPage.UrlGeneration(url, guid));
		}
		else{
			$("#output").html("<b>Session Persistence Rejected!</b>");
		}
	});
	
	//bind clear sessions button
	$("#clearsessions").click(function(){
		$.each(bgPage.intervals, function(i, elem){
			clearInterval(elem.interval);
		});
		
		bgPage.intervals = [];
		$("#sessions").html("");
	});
	
	//on load, setup the session list
	$.each(bgPage.intervals, function(i, elem){
		appendSession(elem.name);
	});
});

function appendSession(url){
	$("#sessions").append("<li><a href='" + url + "' target='_blank'>" + url + "</a></li>");
}

