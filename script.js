'use strict'

const athleteType = document.getElementById('athleteType');
const soccerFields = document.getElementById('soccerFields');
const swimmerFields = document.getElementById('swimmerFields');
const form = document.getElementById('athleteForm');
const tbody = document.querySelector('#athleteTable tbody');

function renderTable() {
    tbody.innerHTML = "";

    Athlete.all.forEach((athlete) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${athlete.id}</td>
            <td>${athlete.name}</td>
            <td>${athlete.sport}</td>
            <td>${athlete.rank}</td>
            <td>${athlete.country}</td>
            <td>${athlete.age}</td>
            <td>${athlete instanceof Soccer ? athlete.position : athlete.distance}</td>
            <td>${athlete instanceof Soccer ? athlete.number : athlete.style}</td>
            <td>${athlete instanceof Soccer ? athlete.club : athlete.record}</td>
            <td><button class="delete-btn" data-id="${athlete.id}">Удалить</button></td>
        `;

        tbody.appendChild(row);
    });
}

tbody.addEventListener('click', (event) => {
    if (!event.target.classList.contains('delete-btn')) return;

    const id = Number(event.target.dataset.id);
    const athlete = Athlete.all.find(a => a.id === id);

    if (athlete) {
        athlete.delete();
        renderTable();
        localStorage.setItem('athletes', JSON.stringify(Athlete.all));
    }
});

athleteType.addEventListener('change', () => {
    if (athleteType.value === 'soccer') {
        soccerFields.classList.remove('hidden');
        swimmerFields.classList.add('hidden');
    } else if (athleteType.value === 'swimmer') {
        swimmerFields.classList.remove('hidden');
        soccerFields.classList.add('hidden');
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const type = athleteType.value;

    const name = document.getElementById('name').value;
    const rank = document.getElementById('rank').value;
    const country = document.getElementById('country').value;
    const age = +document.getElementById('age').value;

    let athlete;

    if (type === 'soccer') {
        athlete = new Soccer();
        athlete.sport = "Футбол";
        athlete.position = document.getElementById('position').value;
        athlete.number = +document.getElementById('number').value;
        athlete.club = document.getElementById('club').value;
    } else if (type === 'swimmer') {
        athlete = new Swimmer();
        athlete.sport = "Плавание";
        athlete.distance = +document.getElementById('distance').value;
        athlete.style = document.getElementById('style').value;
        athlete.record = +document.getElementById('record').value;
    }

    athlete.name = name;
    athlete.rank = rank;
    athlete.country = country;
    athlete.age = age;

    athlete.save();
    renderTable();
    form.reset();

    localStorage.setItem('athletes', JSON.stringify(Athlete.all));
});

// Базовый класс Спортсмен
class Athlete {
    static all = [];
    static nextId = 1;

    constructor() {
        this.id = Athlete.nextId++;
        this.name = ""
        this._sport = ""
        this._rank = ""
        this._country = ""
        this._age = 0
    }
    get sport() {
        return this._sport
    }
    set sport(newSport) {
        this._sport = newSport
    }
    get rank() {
        return this._rank
    }
    set rank(newRank) {
        this._rank = newRank
    }
    get country() {
        return this._country
    }
    set country(newCountry) {
        this._country = newCountry
    }
    get age() {
        return this._age
    }
    set age(newAge) {
        this._age = newAge
    }
    save() {
        Athlete.all.push(this);
    }

    delete() {
        Athlete.all = Athlete.all.filter(a => a.id !== this.id);
    }

}

// Класс наследник Футболист
class Soccer extends Athlete {
    constructor(name, sport) {
        super()
        this._position = ""
        this._number = 0
        this._club = ""
    }
    get position() {
        return this._position
    }
    set position(newPosition) {
        this._position = newPosition
    }
    get number() {
        return this._number
    }
    set number(newNumber) {
        this._number = newNumber
    }
    get club() {
        return this._club
    }
    set club(newClub) {
        this._club = newClub
    }
}

// Класс наследник Пловец
class Swimmer extends Athlete {
    constructor() {
        super()
        this._distance = 50
        this._style = ""
        this._record = 0 // в секундах
    }
    get distance() {
        return this._distance
    }
    set distance(newDistance) {
        this._distance = newDistance
    }
    get style() {
        return this._style
    }
    set style(newStyle) {
        this._style = newStyle
    }
    get record() {
        return this._record
    }
    set record(newRecord) {
        this._record = newRecord
    }
}

function loadFromStorage() {
    const data = localStorage.getItem('athletes');
    if (!data) return;

    const parsed = JSON.parse(data);

    parsed.forEach(item => {
        let athlete;
        if (item._sport === "Футбол") {
            athlete = new Soccer();
            athlete.position = item._position;
            athlete.number = item._number;
            athlete.club = item._club;
        } else if (item._sport === "Плавание") {
            athlete = new Swimmer();
            athlete.distance = item._distance;
            athlete.style = item._style;
            athlete.record = item._record;
        }

        athlete.id = item.id;
        athlete.name = item.name;
        athlete.rank = item._rank;
        athlete.country = item._country;
        athlete.age = item._age;
        athlete.sport = item._sport;

        Athlete.all.push(athlete);
    });

    Athlete.nextId = Athlete.all.length
        ? Math.max(...Athlete.all.map(a => a.id)) + 1
        : 1;
    renderTable();
}

loadFromStorage()