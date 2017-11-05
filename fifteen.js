
var num_space = 15; 												
var move = "none";//direction											 
var newbox;	//array of tiles												
var counter = 0;
var addvar = 0;
var str;
var inProgress = false;	//check if tile is moving							

//Loads tiles when webpage loads
window.onload = function()
{
	var box = document.getElementById('puzzlearea').getElementsByTagName('div');
	newbox = box;
	var btn = document.getElementById('shufflebutton');
	btn.onclick = shuffle;
	for(var i = 0; i < box.length; i++)
	{
		box[i].className = 'puzzlepiece';
		box[i].onmouseover = canMove;
		box[i].onmouseout = clear;
		box[i].onclick = moveTile;

		if(i >= 0 && i <= 3)
		{
			box[i].style.left += i * 100 + 'px';
			box[i].style.top = 0 + 'px';
			box[i].style.backgroundPosition = -i * 100 + 'px ' + '0px';
		}
		else if(i >= 4 && i <= 7)
		{
			box[i].style.left += (i - 4) * 100 + 'px';
			box[i].style.top = 100 + 'px';
			box[i].style.backgroundPosition = -(i - 4) * 100 + 'px '+ '-100px';
		}
		else if(i >= 8 && i <= 11)
		{
			box[i].style.left += (i - 8) * 100 + 'px';
			box[i].style.top = 200 + 'px';
			box[i].style.backgroundPosition = -(i - 8) * 100 + 'px '+ '-200px';
		}
		else
		{
			box[i].style.left += (i - 12) * 100 + 'px';
			box[i].style.top = 300 + 'px';
			box[i].style.backgroundPosition = -(i - 12) * 100 + 'px ' + '-300px';
		}
		
	}
	        
}

//Check if tile can move
function canMove()
{
	if(!inProgress)
	{
		if((parseInt(this.style.left) + parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top === getY())
		{
		this.className = this.className + " movablepiece";
		move = "right";
		}
		else if(parseInt(this.style.left) === (parseInt(getX()) + parseInt(this.offsetWidth)) && this.style.top === getY())
		{
			this.className = this.className + " movablepiece";
			move = "left";
		}
		else if((parseInt(this.style.top) + parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "down";
		}
		else if(parseInt(this.style.top) === (parseInt(getY()) + parseInt(this.offsetHeight)) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "up";
		}
		else
		{
			move = "none";
		}
	}
	

}

//remove .moveablepiece class when mouse exits tile
function clear()
{
	this.className = 'puzzlepiece';
}

//Check method for shuffle
function can_Move(el)
{
	if((parseInt(el.style.left) + parseInt(el.offsetWidth)) === parseInt(getX()) && el.style.top === getY())
	{
		move = "right";
		return "right";
	}
	else if(parseInt(el.style.left) === (parseInt(getX()) + parseInt(el.offsetWidth)) && el.style.top === getY())
	{
		move = "left";
		return "left";
	}
	else if((parseInt(el.style.top) + parseInt(el.offsetHeight)) === parseInt(getY()) && el.style.left === getX())
	{
		move = "down";
		return "down";
	}
	else if(parseInt(el.style.top) === (parseInt(getY()) + parseInt(el.offsetHeight)) && el.style.left === getX())
	{
		move = "up";
		return "up";
	}
	else
	{
		move = "none";
		return "none";
	}

}

//Animates tile movement
function shift()
{
	var indx = 0;
	for(var i = 0; i < newbox.length; i++)
	{
		if(newbox[i].textContent === str)
		{
			indx = i;	
		}
	}
	
	if(addvar != 100)
	{
		if(move === "left" || move === "right")
		{
			newbox[indx].style.left = parseInt(newbox[indx].style.left) + counter + 'px';
		}
		else
		{
			newbox[indx].style.top = parseInt(newbox[indx].style.top) + counter + 'px';
		}
		addvar += 1;
		inProgress = true;
		setTimeout("shift()", "1 * 1000");
	}
	else
	{
		addvar = 0;
		inProgress = false;
		move = "none";
	}	
	
}

//Gets direction and then calls shift() to move tile
function moveTile()
{
	if(!inProgress)
	{
		switch(move)
		{
				case "right":
					counter = 1;
					num_space -= 1;
					str = this.textContent;
					shift();
				break;

				case "left":
					counter =- 1;
					num_space += 1;
					str = this.textContent;
					shift();
				break;

				case "down":
					counter = 1;
					num_space -= 4;
					str = this.textContent;
					shift();
				break;

				case "up":
					counter =- 1;
					num_space += 4;
					str = this.textContent;
					shift();
				break;

		}
	}
}

//Move method for shuffle
function move_Tile(el)
{
	
	switch(move)
	{
		case "right":
			el.style.left = parseInt(el.style.left) + 100 + 'px';
			num_space -= 1;
		break;

		case "left":
			el.style.left = parseInt(el.style.left) - 100 + 'px';
			num_space += 1;
		break;

		case "down":
			el.style.top = parseInt(el.style.top) + 100 + 'px';
			num_space -= 4;
		break;

		case "up":
			el.style.top = parseInt(el.style.top) - 100 + 'px';
			num_space += 4;
		break;

	}
}

//shuffles tiles
function shuffle()
{
	var num = 100;
	for(var i = 0; i < num; i++)
	{
		var list_A = [];
		for(var p = 0; p < newbox.length; p++)
		{
			if(can_Move(newbox[p]) != "none")
			{
				list_A.push(p);
			}

		}

		if(list_A.length != 0)
		{
			var n = list_A[Math.floor((Math.random() * list_A.length) + 0)];
			can_Move(newbox[n]);
			move_Tile(newbox[n]);
		}
	}
	move = "none";
}

//Returns the corresponding X for the empty tile
function getX()
{
		if(num_space >= 0 && num_space <= 3)
		{
			return num_space * 100 + 'px';
		}
		else if(num_space >= 4 && num_space <= 7)
		{
			return (num_space - 4) * 100 + 'px';
		}
		else if(num_space >= 8 && num_space <= 11)
		{
			return (num_space - 8) * 100 + 'px';
		}
		else
		{
			return (num_space - 12) * 100 + 'px';
		}
}

//Returns the corresponding Y for the empty tile
function getY()
{
	if(num_space >= 0 && num_space <= 3)
	{
			return '0px';
	}
	else if(num_space >= 4 && num_space <= 7)
	{
			return '100px';
	}
	else if(num_space >= 8 && num_space <= 11)
	{
			return '200px';
	}else
	{
			return '300px';
	}
}