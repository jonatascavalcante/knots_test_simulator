const nos_extremidade = [
	{nome: "Nó Simples", tempo: 5},
	{nome: "Nó em Oito", tempo: 5},
	{nome: "Nó de Frade", tempo: 7}];

const nos_juncao = [
	{nome: "Nó Direito", tempo: 10},
	{nome: "Nó de Escota Simples", tempo: 10},
	{nome: "Nó de Escota Dupla", tempo: 15},
	{nome: "Nó de Fita", tempo: 15},
	{nome: "Nó Pescador Simples", tempo: 15},
	{nome: "Nó Pescador Duplo", tempo: 20}];

const nos_alceados = [
	{nome: "Nó Aselha Simples p/ seio", tempo: 10},
	{nome: "Nó Aselha em Oito p/ ponta", tempo: 20},
	{nome: "Nó Aselha Dupla em oito", tempo: 15},
	{nome: "Nó Aselha em Oito Direcional", tempo: 10},
	{nome: "Nó Lais de Guia Simples em volta de um obstáculo", tempo: 15},
	{nome: "Nó Lais de Guia Duplo", tempo: 20},
	{nome: "Nó Borboleta", tempo: 10}];

const nos_arremate = [
	{nome: "Nó de Pescador Simples", tempo: 15},
	{nome: "Nó de Pescador Duplo", tempo: 20},
	{nome: "Nó Cote", tempo: 10}];

const nos_ancoragem =[
	{nome: "Nó Boca de Lobo p/ ponta", tempo: 10},
	{nome: "Nó Fiel p/ ponta", tempo: 10},
	{nome: "Nó Lais de Guia Duplo", tempo: 20},
	{nome: "Nó de Aselha Dupla em oito", tempo: 15}];

const nos_autoblocantes = [
	{nome: "Nó Prusik 3 voltas", tempo: 15},
	{nome: "Nó Machard 3 voltas", tempo: 15},
	{nome: "Nó Blocante Clássico 3 voltas", tempo: 15}];


/* Nós que repetem:
	Nó Pescador Simples (Junção e Arremate)
	Nó Pescador Duplo (Junção e Arremate)
	Nó Aselha Dupla em oito (Alceados e Ancoragem)
	Lais de Guia Duplo (Alceados e Ancoragem)
*/