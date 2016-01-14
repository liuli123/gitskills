
function showmenu(id) {
	var list = document.getElementById("list"+id);
	var menu = document.getElementById("menu"+id)
	if (list.style.display=="none") {
		document.getElementById("list"+id).style.display="block";
		menu.className = "title1";
	}else {
		document.getElementById("list"+id).style.display="none";
		menu.className = "title";
	}
} 

function showLay1(){
  lay1.style.visibility="visible";
  lay2.style.visibility="hidden";
  lay3.style.visibility="hidden";
}
function showLay2(){
  lay1.style.visibility="hidden";
  lay2.style.visibility="visible";
  lay3.style.visibility="hidden";
}
function showLay3(){
  lay1.style.visibility="hidden";
  lay2.style.visibility="hidden";
  lay3.style.visibility="visible";
}