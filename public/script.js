function askQuestion() {
    const question = document.getElementById('question').value;
    if (!question) return;

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('answer').innerText = data.answer;
    })
    .catch(error => console.error('Error:', error));
}
