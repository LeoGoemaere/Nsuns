const exercices = {
    squat: { 
        name: 'Squat',
        rm: null,
        tm: null
    },
    bench: {
        name: 'Bench',
        rm: null,
        tm: null
    },
    deadlift: {
        name: 'Deadlift',
        rm: null,
        tm: null 
    },
    overheadPress: {
        name: 'OHP',
        rm: null,
        tm: null 
    }
};

const secondaryExercices = {
    sumoDead: {
        name: 'Sumo dead'
    },
    closeGripBench: {
        name: 'Close grip bench'
    },
    frontSquat: {
        name: 'Front squat'
    }
};

const trainingMaxSets = {
    exercices: {
        monday: {
            bench: [
                { tm: 0.65, reps: 8 },
                { tm: 0.75, reps: 6 }, 
                { tm: 0.85, reps: 4 }, 
                { tm: 0.85, reps: 4 },
                { tm: 0.85, reps: 4 },
                { tm: 0.80, reps: 5 },
                { tm: 0.75, reps: 6 },
                { tm: 0.70, reps: 7 },
                { tm: 0.65, reps: 8 },
            ],
            overheadPress: [
                { tm: 0.50, reps: 6 },
                { tm: 0.60, reps: 5 }, 
                { tm: 0.70, reps: 3 }, 
                { tm: 0.70, reps: 5 },
                { tm: 0.70, reps: 7 },
                { tm: 0.70, reps: 4 },
                { tm: 0.70, reps: 6 },
                { tm: 0.70, reps: 8 },
            ]            
        },
        tuesday: {
            squat: [
                { tm: 0.75, reps: 5 },
                { tm: 0.85, reps: 3 }, 
                { tm: 0.95, reps: 1 }, 
                { tm: 0.90, reps: 3 },
                { tm: 0.85, reps: 3 },
                { tm: 0.80, reps: 2 },
                { tm: 0.75, reps: 5 },
                { tm: 0.70, reps: 5 },
                { tm: 0.65, reps: 5 }
            ],
            sumoDead: [
                { tm: 0.50, reps: 5 },
                { tm: 0.60, reps: 5 }, 
                { tm: 0.70, reps: 3 }, 
                { tm: 0.70, reps: 5 },
                { tm: 0.70, reps: 7 },
                { tm: 0.70, reps: 4 },
                { tm: 0.70, reps: 6 },
                { tm: 0.70, reps: 8 }
            ]            
        },
        thursday: {
            bench: [
                { tm: 0.75, reps: 5 },
                { tm: 0.85, reps: 3 },
                { tm: 0.95, reps: 1 },
                { tm: 0.90, reps: 3 },
                { tm: 0.85, reps: 5 },
                { tm: 0.80, reps: 3 },
                { tm: 0.75, reps: 5 },
                { tm: 0.70, reps: 3 },
                { tm: 0.65, reps: 5 }
            ],
            closeGripBench: [
                { tm: 0.40, reps: 6 },
                { tm: 0.50, reps: 5 },
                { tm: 0.60, reps: 3 },
                { tm: 0.60, reps: 5 },
                { tm: 0.60, reps: 7 },
                { tm: 0.60, reps: 4 },
                { tm: 0.60, reps: 6 },
                { tm: 0.60, reps: 8 },
            ]
        },
        friday: {
            deadlift: [
                { tm: 0.75, reps: 5 },
                { tm: 0.85, reps: 3 },
                { tm: 0.95, reps: 1 },
                { tm: 0.90, reps: 3 },
                { tm: 0.85, reps: 3 },
                { tm: 0.80, reps: 3 },
                { tm: 0.75, reps: 3 },
                { tm: 0.70, reps: 3 },
                { tm: 0.65, reps: 3 }
            ],
            frontSquat: [
                { tm: 0.35, reps: 5 },
                { tm: 0.45, reps: 5 },
                { tm: 0.55, reps: 3 },
                { tm: 0.55, reps: 5 },
                { tm: 0.55, reps: 7 },
                { tm: 0.55, reps: 4 },
                { tm: 0.55, reps: 6 },
                { tm: 0.55, reps: 8 },
            ]
        }
    }
}

Vue.component('primary-exercice-item', {
    props: ['element', 'repetionmax', 'trainingmax', 'roundvalue', 'unit'],
    template: `
        <div class="table__row">
            <p class="table__cell--quart">{{ element.name }}</p>

            <div class="table__cell--third input-container is-rm">
                <input type="number" v-bind:value="roundvalue(element.rm)" v-on:change="trainingmax($event, element)">
                <span class="unit-input">{{ unit }}</span>
            </div>

            <div class="table__cell--third input-container is-tm">
                <input type="number" v-bind:value="roundvalue(element.tm)" v-on:change="repetionmax($event, element)">
                <span class="unit-input">{{ unit }}</span>
            </div>
        </div>
    `
})

Vue.component('row-set-item', {
    props: {
        element: Object,
        index: Number,
        exercice: Object,
        sets: Array,
        unit: String,
        isspecialday: Boolean
    },
    template: `
        <div class="table__row table__row--set" v-bind:class="[sets.length - 1 === index || index === 2 && isspecialday === false ? 'table__row--hl' : '']">
            <span class="item-number">{{ index + 1 }}</span>
            <p><span class="repet-number">{{ element.reps }} {{sets.length - 1 === index || index === 2 && isspecialday === false ? '+': null}} </span> @ <span class="weight-item">{{ Math.ceil( ((exercice.tm) * (element.tm)) * 4) / 4 }}</span> {{ unit }}</p>
        </div>
    `
})

Vue.component('progression-list', {
    props: ['unit', 'roundvalue'],
    template: `
        <ul>
            <li>- If you get 0-1 reps, do not increase your TM</li>
            <li>- If you get 2-3 Reps, increase your TM by {{unit === 'kg' ? Math.round(5 * 0.45359237) : 5}} {{unit}}</li>
            <li>- If you get 4-5 reps, increase your TM by {{unit === 'kg' ? Math.round(5 * 0.45359237) : 5}}-{{unit === 'kg' ? Math.round(10 * 0.45359237) : 10}} {{unit}}</li>
            <li>- If you get more than 5 Reps, increase your TM by {{unit === 'kg' ? Math.round(10 * 0.45359237) : 10}}-{{unit === 'kg' ? Math.round(15 * 0.45359237) : 15}} {{unit}}</li>
        </ul>
    `
})

const app = new Vue({
    el: "#app",
    data: {
        exercices: exercices,
        secondaryExercices: secondaryExercices,
        sets: trainingMaxSets,
        unit: "kg",
    },
    methods: {
        calculateTrainingMax: function(e, item) {
            const repetitionMax = e.target.value;
            const trainingMax = repetitionMax * 0.9;
            item.tm = trainingMax
            item.rm = repetitionMax
        },
        calculateRepetitionMax: function(e, item) {
            const trainingMax = e.target.value;
            const repetitionMax = trainingMax / 0.9;
            item.rm = repetitionMax
            item.tm = trainingMax
        },
        weightConverter(e) {
            if (e.target.value === 'lb') {
                for (let key in this.exercices) {
                    const rmKgWeight = this.exercices[key].rm / 0.45359237;
                    const tmKgWeight = this.exercices[key].tm / 0.45359237;
                    this.exercices[key].rm = rmKgWeight
                    this.exercices[key].tm = tmKgWeight
                }
            } else {
                for (let key in this.exercices) {
                    const rmLbWeight = this.exercices[key].rm * 0.45359237;
                    const tmLbWeight = this.exercices[key].tm * 0.45359237;
                    this.exercices[key].rm = rmLbWeight
                    this.exercices[key].tm = tmLbWeight
                }
            }
        },
        toggleClass: function(e) {
            e.target.classList.toggle('active');
            e.target.nextElementSibling.classList.toggle('table__content--hide');
        },
        roundUpToNearestQuarter: function(value) {
            return Math.ceil(value * 4) / 4;
        }
    },
    mounted: function() {
        if (localStorage.getItem('exercices')) { 
            this.exercices = JSON.parse(localStorage.getItem('exercices'));
        }

        if (localStorage.getItem('unit')) {
            this.unit = JSON.parse(localStorage.getItem('unit'));
        }
    },
    watch: {
        exercices: {
            handler() {
                localStorage.setItem('exercices', JSON.stringify(this.exercices));
            },
            deep: true
        },
        unit: function() {
            localStorage.setItem('unit', JSON.stringify(this.unit));
        }
    }
});