// Listen for form submission event
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Read the uploaded Excel file
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        // Convert Excel data to JSON format
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        // Pass data to renderChart function
        renderChart(excelData);
    };

    reader.readAsArrayBuffer(file);
});

// Render temporal graph using CanvasJS
function renderChart(data) {
    const chartData = [];

    // Process data and add it to chartData array
    data.forEach(function(datum) {
        chartData.push({
            x: new Date(datum.date),
            y: datum.income - datum.expenditure
        });
    });

    // Render chart using CanvasJS
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Income vs Expenditure"
        },
        axisX: {
            valueFormatString: "DD MMM YYYY"
        },
        data: [
            {
                type: "line",
                dataPoints: chartData
            }
        ]
    });

    chart.render();
}



