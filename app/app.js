// const exercicesArray = [
//     { 
//         name: 'Squat',
//         rm: null,
//         tm: null
//     },
//     { 
//         name: 'Bench',
//         rm: null,
//         tm: null 
//     },
//     { 
//         name: 'deadlift',
//         rm: null,
//         tm: null 
//     },
//     { 
//         name: 'Press',
//         rm: null,
//         tm: null 
//     }
// ];

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
    press: {
        name: 'Press',
        rm: null,
        tm: null 
    }
};

const secondaryExercices = {
    ohp: { 
        name: 'Ohp',
    },
    sumoDead: {
        name: 'Sumo dead'
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
            ohp: [
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
                { tm: 0.65, reps: 5 },
            ],
            sumoDead: [
                { tm: 0.50, reps: 5 },
                { tm: 0.60, reps: 5 }, 
                { tm: 0.70, reps: 3 }, 
                { tm: 0.70, reps: 5 },
                { tm: 0.70, reps: 7 },
                { tm: 0.70, reps: 4 },
                { tm: 0.70, reps: 6 },
                { tm: 0.70, reps: 8 },
            ]            
        }
    }
}

Vue.component('primary-exercice-item', {
    props: ['element', 'repetionmax', 'trainingmax'],
    template: `
        <div class="table__row">
            <p class="table__cell--third">{{ element.name }}</p>

            <div class="table__cell--third input-container is-rm">
                <input type="text" v-bind:value="element.rm" v-on:change="trainingmax($event, element)">
            </div>

            <div class="table__cell--third input-container is-tm">
                <input type="text" v-bind:value="element.tm" v-on:change="repetionmax($event, element)">
            </div>
        </div>
    `
})

Vue.component('row-set-item', {
    props: ['element', 'index', 'exercice'],
    template: `
        <div class="table__row table__row--set">
            <span class="item-number">{{ index + 1 }}</span>
            <p><span class="repet-number">{{ element.reps }}</span> @ {{ (exercice.tm) * (element.tm) }}</p>
        </div>
    `
})

const app = new Vue({
    el: "#app",
    data: {
        exercices: exercices,
        secondaryExercices: secondaryExercices,
        sets: trainingMaxSets
    },
    methods: {
        calculateTrainingMax: function(e, item) {
            const repetionMax = e.target.value;
            const trainingMax = repetionMax * 0.9;
            item.tm = trainingMax;
            item.rm = repetionMax;
        },
        calculateRepetitionMax: function(e, item) {
            const trainingMax = e.target.value;
            const repetitionMax = trainingMax / 0.9;
            item.rm = repetitionMax;
            item.tm = trainingMax;
        },
        toggleClass: function(e) {
            e.target.parentNode.nextElementSibling.classList.toggle('table__content--hide');
            // console.log(e.target.parentNode.nextElementSibling);
        }
    }
});