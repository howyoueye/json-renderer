const wrapper = document.querySelector('.wrapper');
const fetchButtons = document.getElementsByClassName('fetch-btn');

const urls = {
	user: 'https://randomuser.me/api/?results=1',
	planet: 'https://swapi.dev/api/planets/'
}

function renderData(name, value, level = 0) {
	let htmlString = `<div class="group level-${level}">${name} : `;
	
	if (typeof(value) == 'object' && value != undefined) {
		htmlString += `<button class="expand"></button>`;
		Object.keys(value).forEach(key => {
			htmlString += renderData(key, value[key], level + 1) 
		});
	} else {
		htmlString += value;
	}

	return htmlString + '</div>';
}

function handleClick(event) {
	const divs = [...event.target.parentNode.children];
	divs.forEach(div => {
		if (div.localName == 'div') {
			div.style.display = div.style.display == 'block' ? 'none' : 'block';
		}
	})
}

function assignListeners() {
	const btns = document.getElementsByClassName('expand');
	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', handleClick);
	}
}

function fetchData(event) {
	const content = event.target.textContent.toLowerCase();
	let url = urls[content];

	if (content == 'planet') {
		const random = Math.floor(Math.random() * 20 + 1);
		url = urls[content] + random;
	}

	fetch(url)
		.then(res => res.json())
		.then(data => {
			wrapper.innerHTML = '';
			wrapper.innerHTML += content == 'user'
				? renderData('user', data.results[0])
				: renderData('planet', data);
			assignListeners();
		})
}


fetchButtons[0].addEventListener('click', fetchData);
fetchButtons[1].addEventListener('click', fetchData);