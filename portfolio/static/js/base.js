const content = ['Backend Developer', 'AI Enthusiast', 'Python Developer', 'Biochemist']
const element = document.getElementById('intro-content')
const nav = document.getElementById('nav')
let index = 0
let charIndex = 0
let initial = 0

function simulateType() {
    if (index >= content.length) {
        return;
    }
  
    if (charIndex < content[index].length) {
        element.textContent += content[index].charAt(charIndex);
        charIndex++;
    }
  
    if (charIndex >= content[index].length) {
        setTimeout(clear, 1000);
    } else {
        setTimeout(simulateType, 50);
    }
}

function clear() {
    if (charIndex > 0) {
        element.textContent = content[index].substring(0, charIndex-1)
        charIndex--;
        setTimeout(clear, 100)
    }
    else {
        index++;
        if (index >= content.length) {
            index = 0;
        }
        setTimeout(simulateType, 300)
        
    }
}

// async function sendMail(e) {
//     e.preventDefault();
//     const btn = document.getElementById('mail-btn');
//     console.log('here')
//     btn.textContent = '';
//     const span = document.createElement('span');
//     span.classList.add('spinner-border', 'spinner-border-sm');
//     span.attributes.role = 'status';
//     btn.appendChild(span);

//     const message = document.getElementById('message').value;
//     const email = document.getElementById('email').value;
//     const name = document.getElementById('name').value;
//     const subject = document.getElementById('subject').value;
//     console.log(email);

//     const payload = {
//         name,
//         email,
//         subject,
//         message
//     };
//     const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken
//         },
//         body: JSON.stringify(payload)
//     };

//     try {
//         const response = await fetch('/contact', requestOptions);
//         const data = await response.json();
//         const checkmark = document.getElementById('checkmark');
//         const form = document.getElementById('form')
//         if (response.status === 200) {
//             form.classList.add('hidden')            
//             checkmark.classList.remove('hidden')
//         }
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

simulateType()
