async function getEvents() {
    const dob = document.getElementById("dob").value;
    const resultsDiv = document.getElementById("results");

    if (!dob) {
        resultsDiv.innerHTML = "Please select a date!";
        return;
    }

    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    resultsDiv.innerHTML = "<h3>Loading historical events...</h3>";

    try {
        const response = await fetch(
            `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`
        );

        const data = await response.json();

        let output = `<h2>Top 10 Historical Events on ${day}/${month}</h2>`;

        const limitedEvents = data.events.slice(0, 10);

        limitedEvents.forEach(event => {
            output += `
                <div class="event">
                    <p><strong>${event.year}</strong> - ${event.text}</p>
                </div>
            `;
        });

        resultsDiv.innerHTML = output;

    } catch (error) {
        resultsDiv.innerHTML = "Error fetching data.";
        console.error(error);
    }
}