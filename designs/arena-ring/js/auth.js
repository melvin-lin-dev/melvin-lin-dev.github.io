$(() => {
    $('section .auth form').on('submit', submit);
});

function validation(data, validation) {
    message = {};

    for (const key in data) {
        value = data[key];
        rules = validation[key];

        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];

            if (rule === 'required' && !value) {
                message[key] = `The ${key} field is required.`;
                break;
            }

            if (rule.match('min:') && value.length < (num = rule.split(':')[1])) {
                message[key] = `The ${key} must be at least ${num} characters.`;
                break;
            }

            if (rule.match('max:') && value.length > (num = rule.split(':')[1])) {
                message[key] = `The ${key} must not be greater than ${num} characters.`;
                break;
            }

            if (rule.match('in:') && ($enum = rule.split(',', rule.split(':', rule)[1])).includes(value)) {
                message[$key] = `The ${key} must be `.join('/', $enum);
                break;
            }
        }
    }

    return message;
}

function displayMessage(message, status = 'success') {
    let alert = $('#alert');
    let statusClass = 'alert-' + status;
    alert.addClass(statusClass);
    alert.addClass('active');
    alert.find('p').html(message);

    setTimeout(() => {
        alert.removeClass('active');

        setTimeout(() => {
            alert.removeClass(statusClass);
        }, 400);
    }, 2000);
}

function submit(e) {
    e.preventDefault();

    $('section .auth p[id*="error-"]').html('');

    let data = {};
    $(e.currentTarget).serializeArray().forEach(field => {
        data[field.name] = field.value;
    });

    data['gender'] = $('.auth form input[name*="gender"]:checked').val();
    data['agreement'] = $('.auth form input#agreement:checked').val();

    let message = validation(data, {
        'name': ['required', 'min:5', 'max:50'],
        'email': ['required'],
        'password': ['required', 'min:8'],
        'gender': ['required', 'in:male,female'],
        'agreement': ['required']
    });

    if (Object.keys(message).length) {
        for (let key in message) {
            $(`section .auth #error-${key}`).html(message[key]).addClass('display');
        }
    } else {
        displayMessage('Register Success');
    }
}
