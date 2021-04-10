console.log("mic check 123 my name is mohit 123");

let recs = 0
let a = 0
let records = {}
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

let btn = document.getElementById('btn')
let bool
btn.addEventListener('click', () => {

    let sub = document.getElementById('inputsub')
    let teach = document.getElementById('inputeach')


    if (sub.value.trim() != "" && teach.value.trim() != "") {
        if (recs == 0) {
            let div = document.getElementById('cont')
            div.innerHTML = `<table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Subjects</th>
                    <th scope="col">Teachers</th>
                    
                </tr>
            </thead>
            <tbody id = 'bodi'>

            </tbody>
            
    `

            document.getElementById('laast').innerHTML = `<form class="row g-3 needs-validation" novalidate>
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label">Number of routines</label>
                <input type="text" class="form-control" id="routes" value="1" required>
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Number of periods per day</label>
                <input type="text" class="form-control" id="pers" value = "1" required>
            </div>

            <div class="col-12">
                <button type="button" id="prepare" class="btn btn-outline-secondary my-3 mx-5">Prepare routine!</button>
            </div>
        </form>`
            let pbtn = document.getElementById('prepare')
            pbtn.addEventListener('click', () => {
                prepareroutine();
            })

            recs = 1
        }
        a++
        addrecs(sub.value, teach.value, a);
        records[sub.value] = teach.value
        recs = 1
        sub.value = ""
        teach.value = ""
    } else {
        alert('Missing Subject or Teacher\'s name')
    }

})

function addrecs(subject, teacher, a) {
    let row = `<tr>
                    <th scope="row">${a}</th>
                    <td>${subject}</td>
                    <td>${teacher}</td>
                </tr>`
    let bodi = document.getElementById('bodi')
    bodi.innerHTML += row

}




function prepareroutine() {
    // alert('routine prepared!')
    let routes = Number(document.getElementById('routes').value)
    let subjects = Object.keys(records);
    let periods = Number(document.getElementById('pers').value)
    let routine = makearray(routes, 6, periods)
    let ind = 0

    if (periods > subjects.length || routes > subjects.length) {
        alert("Number of periods and routines should be less or equal to entered number of subjects")
    } else {


        for (let i = 0; i < routes; i++) {
            for (let j = 0; j < 6; j++) {
                for (let k = 0; k < periods; k++) {
                    do {
                        ind = Math.floor((Math.random()) * (subjects.length))

                    } while ((routine[i][j].includes(ind)) || mohitSp(routine, i, j, k, ind))
                    routine[i][j][k] = ind
                }
            }
        }

        for (let i = 0; i < routine.length; i++) {
            for (let j = 0; j < routine[i].length; j++) {
                for (let k = 0; k < routine[i][j].length; k++) {
                    let m = routine[i][j][k]
                    routine[i][j][k] = subjects[m]
                }
            }
        }

        document.getElementById('result').style.display = "block"




        let resdiv = document.getElementById('result')
        resdiv.innerHTML = ``
        for (i = 0; i < routine.length; i++) {
            document.getElementById('result').innerHTML += `Routine ${i + 1}`
            let str = `<table class="table table-dark table-hover">
                            <thead>
                            <tr id="reshead${i}">
                                <th>Days&#8595; Period&#8594;</th>
                            </tr>
                            </thead>
                            <tbody id="resbody${i}">

                            </tbody>
                        </table>`
            resdiv.innerHTML += str
            let reshead = document.getElementById(`reshead${i}`).innerHTML
            for (let j = 1; j <= periods; j++) {
                reshead += `<th>${j}</th>`
            }
            document.getElementById(`reshead${i}`).innerHTML = reshead


            let resbody = document.getElementById(`resbody${i}`).innerHTML
            let str2 = ``
            for (let d = 0; d < 6; d++) {
                str2 += '<tr><td>' + days[d] + '</td>'
                for (let s = 0; s < routine[i][d].length; s++) {
                    str2 += '<td>' + routine[i][d][s] + '</td>'
                }
                str2 += '</tr>'

            }

            document.getElementById(`resbody${i}`).innerHTML = str2


        }



        prepareRecords(routine);

    }
}



function prepareRecords(routine){
    let htm = document.getElementById('result').innerHTML
    htm += `<hr>`
    document.getElementById('result').innerHTML = htm

    let teachers = []
    let subj = Object.keys(records)
    subj.forEach(element => {
        teachers.push(records[element])
    });
    teachers = removeDuplicates(teachers)
    
    let htmm = `<table class="table table-borderless">
                    <thead>
                        <tr>
                            <th>Teachers</th>
                            <th>Number of periods per week</th>
                        </tr>
                    </thead>
                    <tbody id = "recbody">

                    </tbody>
                </table>`
    
    document.getElementById('result').innerHTML += htmm
    for (let i = 0; i < routine.length; i++){
        for(let j =0 ; j < routine[i].length; j++){
            for (let k = 0; k<routine[i][j].length; k++){
                let s = routine[i][j][k];
                let t = records[s];
                teachers[t] = teachers[t] + 1
            }
        }
    }


    let tbodyhtml = ''
    let t = Object.keys(teachers)
    for(let i = 0 ; i <t.length; i++){
        let teacher = t[i]
        tbodyhtml += `<tr><td>${teacher}</td><td>${teachers[teacher]}</td> </tr>`
    }
    document.getElementById('recbody').innerHTML = tbodyhtml
}








function makearray(rows, cols, height) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
        arr[i] = new Array(cols)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            arr[i][j] = new Array(height);
        }
    }

    return arr
}






function mohitSp(routine, i, j, k, rand) {

    if (i == 0) {
        return false
    } else {

        for (let m = 0; m < i; m++) {
            if (routine[m][j][k] == rand) {
                return true
            }
        }
        return false
    }
}





function removeDuplicates(param){
    param = new Set(param)

    let arr = Array.from(param)
    let a = {}
    arr.forEach(element => {
        a[element] = 0
    });
    return a
}