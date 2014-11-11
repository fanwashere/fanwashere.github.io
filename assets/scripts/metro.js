/* Metro */

function expand(URL, element) {
	element = element.childNodes[1];
	var elementPos = element.getBoundingClientRect();
	
	var frame = document.createElement("IFRAME");
	frame.id = "content";
	frame.setAttribute("src", URL);
	frame.style.position = "absolute";
	frame.style.top = elementPos.top + window.scrollY + "px";
	frame.style.left = elementPos.left + "px";
	frame.style.backgroundColor = "black";
	frame.style.border = "none";
	frame.style.padding = "0px";
	frame.style.opacity = "0.0";

	document.body.appendChild(frame);
	
	$("#content").animate({height: $(window).height() + "px", width: $(window).width() + "px", top: window.scrollY + "px", left: "0px", opacity: "1.0"});
	
	document.documentElement.style.overflowY = 'hidden'; 
	document.body.scroll = "no";
	
	var canvas = document.createElement('canvas');
	canvas.width  = 100;
	canvas.height = 100;
	
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(100, 0);
	ctx.lineTo(0, 100);
	ctx.closePath();
	ctx.fillStyle = "#FFFFFF";
	ctx.globalAlpha = 0.5;
	ctx.fill();
	
	var div = document.createElement("div");
	div.id = "closeContent";
	div.style.position = "absolute";
	div.style.top = window.scrollY + "px";
	div.style.left = "0px";
	div.onmouseover = function() {canvas.width = canvas.width; ctx.fillStyle = "#FFFFFF"; ctx.globalAlpha = 0.5; ctx.fillRect(0, 0, 100, 100); ctx.globalAlpha = 1.0; ctx.lineWidth = "5"; ctx.strokeStyle = "#BDBDBD"; ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(80, 80); ctx.closePath(); ctx.stroke(); ctx.moveTo(20, 80); ctx.lineTo(80, 20); ctx.stroke();}
	div.onmouseleave = function() {canvas.width = canvas.width; ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(100, 0); ctx.lineTo(0, 100); ctx.closePath(); ctx.globalAlpha = 0.5; ctx.fill();}
	div.onclick = function() {$("#content").animate({opacity: "0.0"}); setTimeout(function() {document.body.removeChild(frame); document.body.removeChild(div)}, 200); document.documentElement.style.overflowY = 'auto'; document.body.scroll = "yes";}
	
	div.appendChild(canvas);
	document.body.appendChild(div);
}

function metrofy() {
	$('.metro').each(function(){
		var gridX = 0;
		var gridY = 0;
		var occupiedX = [];
		var occupiedXnext = [];
		
		var gridXmax = Math.floor(($(this).width() / 100) / 2.1);
		
		$(this).css({width: gridXmax * 210 + "px"});
		
		var tiles = $(this).children();

		for (var i = 0; i < tiles.length; i++) {
			var classID = tiles[i].className.split(" ");
			
			if (classID[0] != "tile" && classID[0] != "box") {
				tiles[i].remove();
			}
			else {
				if (classID[1] == "small" || classID[1] == "fill") {
					if (gridX >= gridXmax ) {
						gridX = 0;
						gridY++;
						occupiedX = occupiedXnext;
						occupiedXnext = [];
					}
				
					for (var j = 0; j < occupiedX.length; j++) {
						while (gridX == occupiedX[j]) {
							gridX++;
						}
						
						if (gridX >= gridXmax) {
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext;
							occupiedXnext = [];
							j = -1;
						}
					}
				
					tiles[i].style.position = "absolute";
					tiles[i].style.top = (gridY * 210) + "px";
					tiles[i].style.left = (gridX * 210) + "px";
					
					gridX++;
				}
				else if (classID[1] == "medium") {
					if (gridX >= gridXmax - 1) {
						gridX = 0;
						gridY++;
						occupiedX = occupiedXnext;
						occupiedXnext = [];
					}
					
					for (var j = 0; j < occupiedX.length; j++) {
						while (gridX == occupiedX[j] || (gridX + 1) == occupiedX[j]) {
							gridX++;
						}
						
						if (gridX >= gridXmax - 1) {
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext
							occupiedXnext = [];
							j = -1;
						}
					}
					
					tiles[i].style.position = "absolute";
					tiles[i].style.top = (gridY * 210) + "px";
					tiles[i].style.left = (gridX * 210) + "px";
					
					gridX = gridX + 2;
				}
				else  if (classID[1] == "large") {
					if (gridX >= gridXmax - 1) {
						gridX = 0;
						gridY++;
						occupiedX = occupiedXnext;
						occupiedXnext = [];
					}
					
					for (var j = 0; j < occupiedX.length; j++) {
						while (gridX == occupiedX[j] || (gridX + 1) == occupiedX[j]) {
							gridX++;
						}
						
						if (gridX >= gridXmax - 1) {
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext;
							occupiedXnext = [];
							j = -1;
						}
					}
					
					tiles[i].style.position = "absolute";
					tiles[i].style.top = (gridY * 210) + "px";
					tiles[i].style.left = (gridX * 210) + "px";
					
					occupiedXnext.push(gridX, gridX + 1);
					gridX = gridX + 2;
				}
				
				if (classID[2] == "last") {
					gridX = 0;
					gridY++;
					occupiedX = occupiedXnext;
					occupiedXnext = [];
				}
			}
		}
		
		if (occupiedXnext.length > 0) {
			gridY++;
		}
		
		$(this).css({height: (gridY + 1) * 210 + "px"});
	});
}