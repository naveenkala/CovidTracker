//Initalize variable
const confirmdata  = document.querySelector('.confirm-data');
const recoverdata  = document.querySelector('.recover-data');
const deathdata  = document.querySelector('.death-data');
const activedata  = document.querySelector('.active-data');
const selectEle = document.querySelector('select'); 
let my_chart;

//Create new option tag inside select tag
function createNewOption(name)
{
	if(name)
	{
		const optionBox = document.createElement('option');
		optionBox.innerHTML = name;
		selectEle.appendChild(optionBox)


	}
}


//Update data of chart and divs
function formatData(data)
{   

    //Initalize the graph and divs
    let globalTotalCases = data.Global.TotalConfirmed;
    let globalTotalRecovered = data.Global.TotalRecovered;
    let globalTotalDeaths = data.Global.TotalDeaths;
    let globalTotalActive = globalTotalCases - (globalTotalRecovered+globalTotalDeaths);
    confirmdata.innerText = Number(globalTotalCases).toLocaleString();
    recoverdata.innerText = Number(globalTotalRecovered).toLocaleString();
    deathdata.innerText = Number(globalTotalDeaths).toLocaleString();
	activedata.innerText = Number(globalTotalActive).toLocaleString();
	createChart("Global",globalTotalCases,globalTotalActive,globalTotalRecovered,globalTotalDeaths);
    
    //Create options in select tag
    for(let ind = 0 ; ind < data.Countries.length-1; ind++)
	{
      let  countryName = data.Countries[ind].Country;
		createNewOption(countryName);
        selectEle.addEventListener('change', function(e){
			if(e.target.value == countryName){

				let totalCases = data.Countries[ind].TotalConfirmed;
				let totalRecovered = data.Countries[ind].TotalRecovered;
				let totalDeaths = data.Countries[ind].TotalDeaths;
				let totalActive = totalCases - (totalRecovered+totalDeaths);
				confirmdata.innerText = Number(totalCases).toLocaleString();
        		recoverdata.innerText = Number(totalRecovered).toLocaleString();
     		    deathdata.innerText = Number(totalDeaths).toLocaleString();
				activedata.innerText = Number(totalActive).toLocaleString();
				createChart(e.target.value,totalCases,totalActive,totalRecovered,totalDeaths);
			}

		});
	}
}


//Send get request to api
const fetchedData = fetch("https://api.covid19api.com/summary")
.then(response => {
	return response.json();
})
.then(data => {
	formatData(data);
});


//Used to create a bar chart
function createChart(title,total,active,recovered,death)
{	
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		
		title:{
			text:"Corona Cases"
		},
		axisX:{
			interval: 1
		},
		axisY2:{
			interlacedColor: "rgba(1,77,101,.2)",
			gridColor: "rgba(1,77,101,.1)",
			title
		},
		data: [{
			type: "bar",
			name: "case-type",
			axisYType: "secondary",
			color: "#014D65",
			dataPoints: [
				{ y: active, label: "Active" },
				{ y: recovered, label: "Recovered" },
				{ y: death, label: "Deaths" },
				{ y: total, label: "Total" }
			]
		}]
	});
	chart.render();
}