const widget = document.getElementById('floatingWidget');

function activeMenu() {
    if (!widget.classList.contains('active')) {
        widget.classList.remove('inactive');
        widget.classList.add('active');
    }
}
function deactiveMenu() {
    if (widget.classList.contains('active')) {
        widget.classList.remove('active');
        widget.classList.add('inactive');
    }
}

document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) {
        deactiveMenu();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('active')) {
        deactiveMenu();
    }
});

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        handleMenuItemClick(value);
    });
});

function handleMenuItemClick(value) {
    console.log(`${value} clicked`);
}
//     switch (value) {
//         case '1':
//             console.log('First Option clicked');
//             // Perform operation for First Option
//             break;
//         case '2':
//             console.log('Second Option clicked');
//             // Perform operation for Second Option
//             break;
//         case '3':
//             console.log('Third Option clicked');
//             // Perform operation for Third Option
//             break;
//         case '4':
//             console.log('Fourth Option clicked');
//             // Perform operation for Fourth Option
//             break;
//         case '5':
//             console.log('Fifth Option clicked');
//             // Perform operation for Fifth Option
//             break;
//         case '6':
//             console.log('Sixth Option clicked');
//             // Perform operation for Sixth Option
//             break;
//         default:
//             console.log('Unknown option clicked');
//     }
// }