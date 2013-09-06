var intervals = [];

function SetupInterval(server, guid){
	//only setup if value are provided
	if(!server || !guid){
		return false;
	}
	
	var url = UrlGeneration(server, guid);
	
	if(!UrlExists(url)){
		var interval = setInterval(function(){
			console.log("interval fired");
			PerformKeepAlive(url);
		},1000*60*1);
		
		var obj = {};
		obj["name"] = url;
		obj["interval"] = interval;
		intervals.push(obj);
		
		PerformKeepAlive(url);
		
		return true;
	}
	else{
		return false;
	}
	
}

function UrlExists(url){
	var temp = $.grep(intervals, function(elem, i){
		return elem.name == url;
	});
	
	return temp.length != 0;
}

function UrlGeneration(url, guid){
	return url + '/' + guid;
}

function PerformKeepAlive(url){
	console.log("calling server: " + url);
	$.get(url, null, function(data, status, xhr){
		console.log("server called: " + url);
	}, null);
}