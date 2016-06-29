/*
* Author: Mark van Etten
* Author URI: http://www.sunnus.nl
* Version: 1.0
* Title: Four in A Row
* Descriptions: 2 Player game. The first player who get 4 tokens in a row, horizontal,vertical or diagonal, wins.
* 
*/


/*
 * Four in A Row
 * Table object
 *
 */ 
var table = {
	tablearray:[],
	currentplayer: 1,
	isWinner:false,
	winnersize: 4,
	width : 7,
	height : 6,
	computer : true,
	
	
	/*
	 * create
	 * Creates the tablearray
	 *
	 * @param void
	 * 
	 * @return void
	 */
	create: function CreateTable(){
		this.tablearray = [];
		for (var i = 0; i < (this.width * this.height); i++)
		{
			this.tablearray[i] = 0;
			
		}
		
		//debug//console.log(this.tablearray);
		console.log("Four in Row is ready");
	},
	
	/*
	 * add
	 * Add a token (coin) to the tablearray
	 *
	 * @param int columnumber
	 * 
	 * @return true int position or false if invallid columnumber
	 */
	add: function AddToTable(index){
		var pos = index * this.height;
		var max = pos + this.height;
		
		if (this.isWinner){
			return false;
		}

		for (var i = pos ; i < max; i++ )
		{	
			if (this.tablearray[i] == 0 && i < max){
				//debug//console.log("Free Spot on : " + i);
				this.tablearray[i] = this.currentplayer;
				$("#"+i).attr("class", "player" + this.currentplayer);
				this.animate(i);
				
				this.check();
				this.turn();
				

				
				if (this.tablearray.indexOf(0) == -1){
					// It's a tie. No zero's left in the array.
					this.animatetie();
					return false;
				}
				return this.tablearray[i];
			}
		}
		
		return false;
	},
	
	/*
	 * newgame
	 * Resets the game to it first state. 
	 *
	 * @param void
	 * 
	 * @return void
	 */
	newgame: function NewGame(){
		this.create();
		$("#fourinarow").html("test");
		this.render();
	},
	
	ai: function Computer(){
		if (this.computer){
				this.add(Math.floor((Math.random() * this.width));
				// Need some work. What happens if this function returns false?
			}
		};
	},
	
	/*
	 * check
	 * Checks every possible combination in tablearray for a winner 
	 *
	 * @param void
	 * 
	 * @return true if winner or false if not.
	 */
	check: function CheckWinner(){
		var score = 0;
		var winpositions = [];
		
		//Horizontal Check
		for (var row = 0; row < this.height; row++){
			for (var col = 0; col <= this.width - this.winnersize; col++){
				for (var pos = (col * this.height) + row; pos < (col * this.height) + (this.height * this.winnersize) + row ; pos = pos + this.height){
					//debug//console.log("Checking Hor : " + col + " On row : " + row + " Array index : " + pos);
					if (this.tablearray[pos] == this.currentplayer){
						score = score + this.currentplayer;
						winpositions.push(pos);
					}
					if (score == this.currentplayer * this.winnersize){
						//debug//console.log("Player "+ this.currentplayer +" wins on Horizontal position " + pos);
						this.winner(winpositions);
						this.isWinner = true;
						return true;
					}
				}
				score = 0;
				winpositions = [];
			}
			score = 0;
			winpositions = [];
		}
		
		score = 0
		winpositions = [];
		//Vertical CheckWinner
		for (var col = 0; col <= this.width; col++){
			for (var row = 0; row <= this.height - this.winnersize; row++){
				for (var pos = (col * this.height) + row; pos < (col * this.height) + (this.winnersize) + row ; pos++){
					//debug//console.log("Checking Ver : " + col + " On row : " + row + " Array index : " + pos);
					if (this.tablearray[pos] == this.currentplayer){
						score = score + this.currentplayer;
						winpositions.push(pos);
					}
					if (score == this.currentplayer * this.winnersize){
						//debug//console.log("Player "+ this.currentplayer +" wins on Vertical position " + pos);
						this.winner(winpositions);
						this.isWinner = true;
						return true;
					}
				}
				score = 0;
				winpositions = [];
			}
			score = 0;
			winpositions = [];
		}
		
		score = 0;
		winpositions = [];
		
		
		//Diagonal Forward
		for (var row = 0; row <= this.height - this.winnersize; row++){
			for (var col = 0; col <= this.width - this.winnersize; col++){
				for (pos = col * this.height + row; pos <= (col * this.height) + (this.height + 1) * (this.winnersize - 1) + row ; pos = pos + this.height + 1){
					//debug//console.log("Checking diag forward: " + col + " on row : " + row + " array index : " + pos);
					if (this.tablearray[pos] == this.currentplayer){
						score = score + this.currentplayer;
						winpositions.push(pos);
					}
					if (score == this.currentplayer * this.winnersize){
						//debug//console.log("Player "+ this.currentplayer +" wins on Forward Diagonal position " + pos);
						this.winner(winpositions);
						this.isWinner = true;
						return true;
					}
				}
				score = 0;
				winpositions = [];
			}
			score = 0;
			winpositions = [];
		}
		
		score = 0;
		winpositions = [];
		
		
		//Diagonal Backward 
		for (var row = this.winnersize - 1; row <= this.height; row++){
			for (var col = 0; col <= this.width - this.winnersize; col++){
				for (pos = (col * this.height) + row; pos <= ((this.height - 1) * (this.winnersize - 1)) + (col * this.height) + row; pos = pos + (this.height -1)){
					console.log("Checking diag Backward: " + col + " on row : " + row + " array index : " + pos);
					if (this.tablearray[pos] == this.currentplayer){
						score = score + this.currentplayer;
						winpositions.push(pos);
					}
					if (score == this.currentplayer * this.winnersize){
						console.log("Player "+ this.currentplayer +" wins on Backward Diagonal position " + pos);
						this.winner(winpositions);
						this.isWinner = true;
						return true;
					}
				}
				score = 0;
				winpositions = [];
			}
			score = 0;
			winpositions = [];
		}
		
		return false;
	},
	
	/*
	 * turn
	 * Change the currentplayer value to 1 if 2 or 2 if 1
	 * Sets the class of HTML element to .hover1 if .hover2 and .hover2 if .hover1 
	 * @param void
	 * 
	 * @return void
	 */
	turn: function ChangeCurrentPlayer(){
		if (this.currentplayer == 1){
			this.currentplayer = 2;
			$(".hover1").attr("class", "hover2");
			this.ai();
		}
		else{
			this.currentplayer = 1;
			$(".hover2").attr("class", "hover1");
		}
	},
	
	/*
	 * animate
	 * Set the marginTop to -900px for div with id x and animate the marginTop to 0px; 
	 *
	 * @param void
	 * 
	 * @return void
	 */
	animate: function ChangePosition(id){
		$( "#"+id ).animate({ marginTop: "-900px"},0);
		$( "#"+id ).animate({ marginTop: "0px"},800);
	},
	
	/*
	 * animatetie
	 * Set the marginTop to 1300px for every div with id x and animate the marginTop to 1300px; 
	 *
	 * @param void
	 * 
	 * @return void
	 */
	animatetie: function Drop(){
		$.each(this.tablearray, function( id, value ) {
			$( "#"+id ).animate({ marginTop: "1300px"},2200);
		});
		
		$("#messagebox").html("<a href='.'><p>It's a tie<p></a>");
		$("#messagebox").toggle();
	},
	
	/*
	 * winner
	 * Show the winner on the HTML page and show's the winning row.
	 *
	 * @param array<int>
	 * 
	 * @return void
	 */
	winner: function ShowWinner(positions){
		positions.forEach(function(pos){
			$("#"+pos).animate({
				opacity: '0.6',
				
			});
		});
		
		$("#winnerrow").toggle();
		$("#winner").attr("class","player"+this.currentplayer);
		
	},
	

	/*
	 * render
	 * Create the HTML table and put the html code in div id fourinarow 
	 *
	 * @param array<int>
	 * 
	 * @return void
	 */
	render: function RenderTable(){
		
		var col = 0;
		var table = "<table id='mainGame'>";
		table += "<tr>";
		for (var col = 0; col < this.width; col++){
			table += "<td onclick='table.add("+col+")' class='hover1'></td>";
		}
		
		table += "<tr/>";
		for (var row = this.height - 1; row > -1; row--){
			table += "<tr>";
			for (var pos = row; pos < this.width * this.height; pos = pos + this.height){
				if (col >= this.width){
					col = 0;
				}
				table += "<td><div class='blank' id='"+pos+"'></div></td>";
				col++;
			}
			table += "</tr>";
			
		}
		
		table += "<tr id='winnerrow' style='display:none'><td colspan='1'><div id='winner' class='blank'></td><td colspan='"+ (this.width - 1) +"'><a href='.'><p>Wins! Play again?<p></a></td></tr>";
		table += "<div id='messagebox' class='overlay' style='display:none'><div id='message'></div></div>";
		table += "</table>";
		if($("#fourinarow").length){
			$("#fourinarow").html(table);
		}
		else{
			$('body').html(table);
		}
		
	}
}

// If the HTML page is ready (fully loaded). Create a new four in a row game.
$( document ).ready(function() {
    table.newgame();
});

	

