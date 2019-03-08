var sorted_nodes = {nodes:[], total_time:0};

$(document).ready(function() {
	clock = $('.clock').FlipClock(0, {
	    clockFace: 'MinuteCounter',
	    countdown: false,
	    autoStart: false,
	    language: 'pt-br'		    
	});

	$('.start').click(function(e) {
		clock.start();
	});
	$('.stop').click(function(e) {
		clock.stop();
	});
	$('.reset').click(function(e) {
		clock.reset();
		for(var i = 0; i < 10; i++) {
			if($('#'+i).is(':checked')) {
				$('#'+i).prop('checked', false);
			}
		}
	});
	$('.result').click(function(e) {
		var final_time = clock.getTime() - 1;
		var error_time = 0;
		for(var i = 0; i < 10; i++) {
			if($('#'+i).is(':checked')) {
				error_time += sorted_nodes.nodes[i].tempo;
			}
		}
		final_time += Math.floor(error_time * 1.5);
		calculateFinalScore(final_time, sorted_nodes.total_time);
	});
});

function generateNodes() {
	sorted_nodes = {nodes:[], total_time:0};
	var ps_sorted = false;
	var pd_sorted = false;
	var ado_sorted = false;
	var lgd_sorted = false;

	document.getElementById('content').style.display = 'block';

	//1 de extremidade
	var end_index = Math.floor((Math.random() * 3));
	sorted_nodes.nodes.push(nos_extremidade[end_index]);
	sorted_nodes.total_time += nos_extremidade[end_index].tempo;

	//2 de junção
	var first_join_index = Math.floor((Math.random() * 6));
	sorted_nodes.nodes.push(nos_juncao[first_join_index]);
	sorted_nodes.total_time += nos_juncao[first_join_index].tempo;
	var second_join_index = Math.floor((Math.random() * 6));
	while(first_join_index == second_join_index) {
		second_join_index = Math.floor((Math.random() * 6));
	}
	sorted_nodes.total_time += nos_juncao[second_join_index].tempo;
	sorted_nodes.nodes.push(nos_juncao[second_join_index]);
	if(first_join_index == 4 || second_join_index == 4)
		ps_sorted = true;
	if(first_join_index == 5 || second_join_index == 5)
		pd_sorted = true;

	//3 alceados
	var first_collated_index = Math.floor((Math.random() * 7));
	sorted_nodes.total_time += nos_alceados[first_collated_index].tempo;
	sorted_nodes.nodes.push(nos_alceados[first_collated_index]);
	var second_collated_index = Math.floor((Math.random() * 7));
	while(first_collated_index == second_collated_index) {
		second_collated_index = Math.floor((Math.random() * 7));
	}
	sorted_nodes.nodes.push(nos_alceados[second_collated_index]);
	sorted_nodes.total_time += nos_alceados[second_collated_index].tempo;
	var third_collated_index = Math.floor((Math.random() * 7));
	while(first_collated_index == third_collated_index || second_collated_index == third_collated_index) {
		third_collated_index = Math.floor((Math.random() * 7));
	}
	sorted_nodes.nodes.push(nos_alceados[third_collated_index]);
	sorted_nodes.total_time += nos_alceados[third_collated_index].tempo;
	if(first_collated_index == 2 || second_collated_index == 2 || third_collated_index == 2)
		ado_sorted = true;
	if(first_collated_index == 5 || second_collated_index == 5 || third_collated_index == 5)
		lgd_sorted = true;

	//1 de arremate
	var finish_index = Math.floor((Math.random() * 3));
	if(ps_sorted) {
		if(pd_sorted)
			finish_index = 2;
		else
			finish_index = Math.floor((Math.random() * 2) + 1);
	}
	else if(pd_sorted) {
		do {
			finish_index = Math.floor((Math.random() * 3));
		} while(finish_index == 1);
	}
	sorted_nodes.nodes.push(nos_arremate[finish_index]);
	sorted_nodes.total_time += nos_arremate[finish_index].tempo;
	ps_sorted = false;
	pd_sorted = false;

	//2 ancoragem
	var first_anchorage_index = Math.floor((Math.random() * 4));
	if(ado_sorted) {
		if(lgd_sorted) {
			do {
				first_anchorage_index = Math.floor((Math.random() * 4));
			} while(first_anchorage_index == 2 || first_anchorage_index == 3);
		}
		else {
			do {
				first_anchorage_index = Math.floor((Math.random() * 4));
			} while(first_anchorage_index == 3);
		}
	} else if(lgd_sorted) {
		do {
			first_anchorage_index = Math.floor((Math.random() * 4));
		} while(first_anchorage_index == 2);
	}
	sorted_nodes.nodes.push(nos_ancoragem[first_anchorage_index]);
	sorted_nodes.total_time += nos_ancoragem[first_anchorage_index].tempo;
	var second_anchorage_index = Math.floor((Math.random() * 4));
	if(ado_sorted) {
		if(lgd_sorted) {
			do {
				second_anchorage_index = Math.floor((Math.random() * 4));
			} while(second_anchorage_index == 2 || second_anchorage_index == 3 || second_anchorage_index == first_anchorage_index);
		}
		else {
			do {
				second_anchorage_index = Math.floor((Math.random() * 4));
			} while(second_anchorage_index == 3 || second_anchorage_index == first_anchorage_index);
		}
	} else if(lgd_sorted) {
		do {
			second_anchorage_index = Math.floor((Math.random() * 4));
		} while(second_anchorage_index == 2 || second_anchorage_index == first_anchorage_index);
	}
	else {
		while(first_anchorage_index == second_anchorage_index) {
			second_anchorage_index = Math.floor((Math.random() * 4));
		}
	}

	sorted_nodes.nodes.push(nos_ancoragem[second_anchorage_index]);
	sorted_nodes.total_time += nos_ancoragem[second_anchorage_index].tempo;
	ado_sorted = false;
	lgd_sorted = false;
	
	//1 autoblocante
	var self_locking_index = Math.floor((Math.random() * 3));
	sorted_nodes.nodes.push(nos_autoblocantes[self_locking_index]);
	sorted_nodes.total_time += nos_autoblocantes[self_locking_index].tempo;

	showSortedNodes(sorted_nodes);
}

function showSortedNodes(sorted_nodes) {
	document.getElementById('nodes').innerHTML = '<br>';
	sorted_nodes.nodes.forEach(function showNode(item, index) {
		document.getElementById('nodes').innerHTML += index+1 + 'º) ' + item.nome + '<br>';
	})
	document.getElementById('nodes').innerHTML += "<br>Tempo: " + sorted_nodes.total_time + "seg (" + Math.floor(sorted_nodes.total_time/60) + "min e " 
			+ sorted_nodes.total_time%60 + "seg)";
	clock.reset();
	createTitleDiv(sorted_nodes);
}

function createTitleDiv(sorted_nodes) {
	var insideDiv = $("<div class=\"col-xs-12\" />)");
	var title = $("<br><b><p>Nós com Erro</p></b>");
	$("#row").empty();
	title.appendTo(insideDiv);
	for(var i = 0; i < 10; i++) {
		var title = $("<input type=\"radio\" id=\"" + i + "\"> " + sorted_nodes.nodes[i].nome + "</input><br>");
		title.appendTo(insideDiv);
	}
	insideDiv.appendTo('#row');
}

function calculateFinalScore(final_time, node_time) {
	if(final_time <= node_time) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 2,0/2,0");
	} else if(final_time <= node_time + 15) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,9/2,0");
	} else if(final_time <= node_time + 20) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,8/2,0");
	} else if(final_time <= node_time + 25) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,7/2,0");
	} else if(final_time <= node_time + 30) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,6/2,0");
	} else if(final_time <= node_time + 35) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,5/2,0");
	} else if(final_time <= node_time + 40) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,4/2,0");
	} else if(final_time <= node_time + 45) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,2/2,0");
	} else if(final_time <= node_time + 50) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 1,0/2,0");
	} else if(final_time <= node_time + 55) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 0,8/2,0");
	} else if(final_time <= node_time + 60) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 0,6/2,0");
	} else if(final_time <= node_time + 65) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 0,4/2,0");
	} else if(final_time <= node_time + 70) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 0,2/2,0");
	} else if(final_time > node_time + 70) {
		alert("Tempo Final: " + Math.floor(final_time/60) + "min e " + final_time%60 + "seg - Nota: 0,0/2,0");
	}
}
