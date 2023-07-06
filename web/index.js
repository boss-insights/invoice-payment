document.addEventListener('DOMContentLoaded', function() {
    // Disable button and show spinner
    document.getElementById('createAccount').addEventListener('submit', function(event) {
        document.getElementById('submitForm').disabled = true;
        const submissionText = document.querySelectorAll('.submissionText, .d-none');
        submissionText.forEach(function(element) {
            element.classList.remove('d-none');
        });
        const defaultText = document.querySelectorAll('.defaultText');
        defaultText.forEach(function(element) {
            element.classList.add('d-none');
        });
    });
});

