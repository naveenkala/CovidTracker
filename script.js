//Initalize variable
const confirmdata  = document.querySelector('.confirm-data');
const recoverdata  = document.querySelector('.recover-data');
const deathdata  = document.querySelector('.death-data');
const activedata  = document.querySelector('.active-data');
const selectEle = document.querySelector('select'); 
let my_chart;

//Create new option tag inside select tag
function createNewOption(option)
{
	const title = option.title;
	if(title)
	{
		const optionBox = document.createElement('option');
		optionBox.innerHTML = title;
		selectEle.appendChild(optionBox)


	}
}


//Update data of chart and divs
function formatData(data)
{
	for(item in data.countryitems[0])
	{
		const singleData = data.countryitems[0][item];
		createNewOption(singleData);

		selectEle.addEventListener('change', function(e){
			if(e.target.value == singleData.title){

				let totalCases = singleData.total_cases;
				let totalRecovered = singleData.total_recovered;
				let totalDeaths = singleData.total_deaths;
				let totalActive = totalCases - (totalRecovered+totalDeaths);
				confirmdata.innerText = Number(totalCases).toLocaleString();
        		recoverdata.innerText = Number(totalRecovered).toLocaleString();
     			deathdata.innerText = Number(totalDeaths).toLocaleString();
				activedata.innerText = Number(totalActive).toLocaleString();
				createChart(totalCases,totalActive,totalRecovered,totalDeaths);
			}

		});
	}
}



//Send get request to api
const fetchedData = fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL")
.then(response => {
	return response.json();
})
.then(data => {
	formatData(data);
});


//Used to create a bar chart
function createChart(total,active,recovered,death)
{	
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		
		title:{
			text:""
		},
		axisX:{
			interval: 1
		},
		axisY2:{
			interlacedColor: "rgba(1,77,101,.2)",
			gridColor: "rgba(1,77,101,.1)",
			title: "Number of Cases"
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