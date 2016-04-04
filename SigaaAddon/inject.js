window.onload = null;//remove popup
    var enableLogin = function(){ 

	    var form = $("form[name='loginForm']");

	    if(form && form.size() > 0){
		    form.find("input[name='user.login']").prop("disabled", false);
		    form.find("input[name='user.senha']").prop("disabled", false);
		    form.find("input[name='entrar']").prop("disabled", false);
		}

    	console.log("Enabled Login!");
	};
	enableLogin();
	setTimeout(enableLogin, 1000);
	setTimeout(enableLogin, 2000);
	setTimeout(enableLogin, 3000);




//add link
var link = $("<a id='show-horario' href='#'>Ver horario</a>").css("margin-right", "10px");
link.insertBefore($("#turmas-portal .mais:last-child a"));


function Course(el){
	this.name = el.find("a").text();
	this.schedules = [];
	var days = el.find("td:nth-child(3) center").html().split("<br>");

	for(var i = 0; i < days.length -1; i++ ){
		var aux = days[i].split(" ");

        var day = aux[0];
        var schedules = aux[1].split("-");

        var start = parseFloat(schedules[0]);
        while(start  < parseFloat(schedules[1])){
            this.schedules.push({day: day, schedule: start+":00"});
            start += 2;    
        }
	}
}

function makeSchedule(classes){
    var days = ["SEG", "TER", "QUA", "QUI", "SEX"];
    var schedules = [];
    for(var i = 8; i < 22; i += 2)
    	schedules.push(i+":00");

    var table = [[""].concat(days)];
    for(var j = 1; j < schedules.length + 1; j++){//build empty table
    	table.push([]);
    	table[j].push(schedules[j-1]);
    	for(var i = 1; i < table[0].length;i++)
    		table[j].push("");
    }

    //make courses
    var coursesEl = classes.find("tbody tr:nth-child(odd)");
    var courses = [];
    coursesEl.each(function(i,e){
        courses.push( new Course($(this)) );
    });


     for(var i = 0; i <  courses.length; i++){//put courses in table
     	for(var j = 0; j <  courses[i].schedules.length; j++){
	     	var cellLabels = courses[i].schedules[j];

	     	var cell = findCell(table, cellLabels);
	     	table[cell.r][cell.c] = courses[i].name;
     	}
     }

     var tableEl = matrixToTable(table);

    //##style table##
    var headColor = "#999999",
        bodyColor = "#DDDDDD"; 
    var stlyteTable = { margin: "auto", "background-color": "white"};
    //td from head
    tableEl.find("tr:first-child").css({"font-weight": "bold", "background-color": headColor});
    tableEl.find("td:first-child").css({"font-weight": "bold", "background-color": headColor});
    tableEl.find("td:not(tr:first-child td, td:first-child)").css("background-color", bodyColor);
    
    tableEl.find("td").css("border", "1px solid black");
    tableEl.addClass("table");
    tableEl.css(stlyteTable);
   
    return tableEl;
}
function findCell(table, cellLabels){
	var r, c;
	for(var i in table[0])//find column
		if(table[0][i] == cellLabels.day)
			c = i;
	
	for(var i in table)//find row
		if(parseInt(table[i][0]) == parseInt(cellLabels.schedule))
			r = i;

	return {r: r, c: c}; 
}

function matrixToTable(matrix){
	var table = $("<table> <tbody>");
	for(var i = 0; i < matrix.length; i++){
		var line = $("<tr>");
		table.append(line);
		for(var j = 0; j < matrix[i].length; j++){
			var cell = $("<td>");
			cell.text(matrix[i][j]);
			line.append(cell);
		}
	}

	return table;
}

var PainelSchedule = function() {
    var painel, link, link2;
    var tries = 0;
    return {
        init: function() {
            link = $('#show-horario');
            if (link != undefined) {
                link.bind('click', this.show);
            } else if (tries < 10) {
                setTimeout('PainelModulos.init()', 50);
                tries++;
            }
        },
        show: function() {
            if (!painel) {
                painel = new YAHOO.ext.BasicDialog("painel-schedules", {
                    autoCreate: true,
                    title: 'Horarios',
                    modal: false,
                    animateTarget: 'show-horario',
                    width: 900,
                    height: 200,
                    shadow: true,
                    resizable: false
                });
            }
            painel.show();
            painel.body.getUpdateManager()
            var mgr = painel.body.getUpdateManager();
            if (!mgr.beforeUpdate.fireDirect) {
                mgr.beforeUpdate.fireDirect = function() {}
            }

            var buildBody = function(){
            	$("#painel-schedules").find(".ydlg-bd").empty();
            	$("#painel-schedules").find(".ydlg-bd").append(makeSchedule($("#turmas-portal")));
            };

            /*mgr.update({
                url: '',
                callback: buildBody
            });*/
            buildBody();
            YAHOO.ext.DialogManager.bringToFront(painel);
        }
    };
}();
PainelSchedule.init();

