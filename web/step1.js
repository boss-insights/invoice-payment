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
    // Filter state dropdown by country
    document.getElementById('country').addEventListener('change', function() {
        // Clear dropdown
        const stateOptions = document.querySelectorAll('#state option');
        stateOptions.forEach(function(option) {
            option.selected = false;
        });
        // Select country
        const country = this.options[this.selectedIndex].value;
        const stateOrProvince = country === 'can' ? 'Province' : 'State';
        // Set label for state/province dropdown
        const stateLabel = document.querySelector('label[for="state"]');
        stateLabel.textContent = stateOrProvince;
        // If no country is selected, set state dropdown to disabled - else, hide other country's states/provinces
        const stateDropdown = document.getElementById('state');
        if (country === '') {
            stateDropdown.disabled = true;
        } else {
            stateDropdown.disabled = false;
            const stateOptions = stateDropdown.options;
            for (let i = 0; i < stateOptions.length; i++) {
                const option = stateOptions[i];
                if (option.classList.contains(country)) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            }
        }
    });
});
