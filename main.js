const wrapper = document.querySelector('.wrapper');
const fetchButtons = document.getElementsByClassName('fetch-btn');

const urls = {
	user: 'https://randomuser.me/api/?results=1',
	planet: 'https://swapi.dev/api/planets/'
}

function render(name, value, level = 0) {
	let htmlString = `<div class="group level-${level}">${name} : `;
	
	if (typeof(value) == 'object' && value != undefined) {
		htmlString += `<button class="expand"></button>`;
		Object.keys(value).forEach(key => {
			htmlString += render(key, value[key], level + 1) 
		});
	} else {
		htmlString += value;
	}

	return htmlString + '</div>';
}

function assignListeners() {
	const btns = document.getElementsByClassName('expand');
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', handleClick);
	}
}

function handleClick(event) {
	const divs = [...event.target.parentNode.children];
	divs.forEach(div => {
		if (div.localName == 'div') {
			div.style.display = div.style.display == 'block' ? 'none' : 'block';
		}
	})
}

function fetchData(event) {
	const content = event.target.textContent.toLowerCase();
	const random = Math.floor(Math.random() * 20 + 1);
	const url = content == 'planet' ? urls[content] + random : urls[content];

	fetch(url)
		.then(res => res.json())
		.then(data => {
			data = content == 'user' ? data.results[0] : data;
			wrapper.innerHTML = '';
			wrapper.innerHTML += render(content, data);
			assignListeners();
		})
}

[...fetchButtons].forEach(btn => btn.addEventListener('click', fetchData));