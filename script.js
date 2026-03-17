
// Student Object Data Manual

class student {
    constructor({ studentName, studentAge, studentMarks }) {
        this.studentName = studentName;
        this.studentAge = Number(studentAge);
        this.studentMarks = Number(studentMarks);
    }

    GradeCalculation() {
        if (this._studentMarks > 900) {
            return `A`
        } else if (this._studentMarks > 700) {
            return `B`
        } else if (this._studentMarks > 550) {
            return `C`
        } else {
            return `F`
        }
    }

    get studentName() {
        return this._studentName.toLowerCase()
    }

    get studentAge() {
        return this._studentAge
    }

    get studentMarks() {
        return this._studentMarks
    }

    set studentAge(value) {

        const ErrorClassInsertion = document.getElementById("ageInput")
        const ageError = document.getElementById("ageError");

        if (value < 18 || value > 60) {
            ErrorClassInsertion.classList.add("outlineChange")
            ageError.textContent = `Age Must be Between 18 - 60.!`
            ageError.style.margin = `10px`
            ageError.style.color = `rgb(215, 0, 0)`
            return;
        } else {
            ErrorClassInsertion.classList.remove("outlineChange")
            ageError.textContent = ``
            ageError.style.margin = ``
            ageError.style.color = ``

            this._studentAge = value
        }
    }

    set studentName(value) {

        const userNameInput = document.getElementById("nameInput")
        const nameError = document.getElementById("nameError");

        if (!/^[a-zA-Z\s]+$/.test(value)) {
            userNameInput.classList.add("outlineChange")
            nameError.textContent = `Username Can't Include Numbers.!`
            nameError.style.margin = `10px`
            nameError.style.color = `rgb(215, 0, 0)`
            return;
        }
        else {
            userNameInput.classList.remove("outlineChange")
            nameError.textContent = ``
            nameError.style.margin = ``
            nameError.style.color = ``
            this._studentName = value
        }
    }

    set studentMarks(value) {

        const ErrorClassInsertion = document.getElementById("marksInput")
        const marksError = document.getElementById("marksError");

        if (value < 300 || value > 1100) {
            ErrorClassInsertion.classList.add("outlineChange")
            marksError.textContent = `Marks Should be Between 300 - 1100.!`
            marksError.style.margin = `10px`
            marksError.style.color = `rgb(215, 0, 0)`
            return;
        } else {
            ErrorClassInsertion.classList.remove("outlineChange")
            marksError.textContent = ``
            marksError.style.margin = ``
            marksError.style.color = ``

            this._studentMarks = value
        }
    }

}

const tableBody = document.getElementById("tableBody");
function printStudents(students) {
    tableBody.innerHTML = ``

    students.forEach((element, index) => {
        const trElement = document.createElement("tr")
        trElement.classList.add("tableData")
        if (typeof element.studentName !== "undefined" && typeof element.studentAge !== "undefined" && typeof element.studentMarks !== "undefined") {
            trElement.innerHTML = `<td>${element.studentName}</td>
                                   <td>${element.studentAge}</td>
                                   <td>${element.studentMarks}</td>
                                   <td>${element.GradeCalculation()}</td>
                                   <td class="delete-btn" data-index="${index}">X</td>`
            tableBody.appendChild(trElement)
            stats(students)
        }
    });
}

const avgMarks = document.getElementById("avgMarks")
const highestMarks = document.getElementById("highestMarks")
const lowestMarks = document.getElementById("lowestMarks")
const statesContainer = document.getElementById("statsContainer")

function stats(statsStudent) {
    const waitingForInput = document.getElementById("waitingForInput")
    const alertBox = waitingForInput.parentElement
    const totalClassCount = statsStudent.map(element => element.studentMarks)
    const studentsLength = totalClassCount.length
    if (totalClassCount.length === 0) {
        alertBox.style.backgroundColor = `#e10000b5`
        waitingForInput.textContent = `Status: Awaiting Input..!`
        avgMarks.textContent = `OverAll Percentage: --`
        highestMarks.textContent = `Highest Marks: --`
        lowestMarks.textContent = `Lowest Marks: --`
        return
    }
    waitingForInput.textContent = `Status: Student Added..`
    alertBox.style.backgroundColor = `rgb(0, 180, 0)`
    const totalClassMarks = totalClassCount.reduce((accu, element) => { return accu + element }, 0)
    console.log(totalClassMarks)
    const averageClassMarks = (totalClassMarks / (studentsLength * 1100)) * 100
    const maxNumber = Math.max(...totalClassCount)
    const minNumber = Math.min(...totalClassCount)

    avgMarks.textContent = `OverAll Percentage: ${averageClassMarks.toFixed(2)}%`
    highestMarks.textContent = `Highest Marks: ${maxNumber}`
    lowestMarks.textContent = `Lowest Marks: ${minNumber}`

}

const addStudentBtn = document.getElementById("addStudentBtn");
const students = [];
addStudentBtn.onclick = () => {
    const storeNameInput = document.getElementById("nameInput");
    const nameInput = storeNameInput.value;
    const storeAgeInput = document.getElementById("ageInput");
    const ageInput = storeAgeInput.value;
    const storeMarksInput = document.getElementById("marksInput");
    const marksInput = storeMarksInput.value;

    if (!nameInput || !ageInput || !marksInput) {
        alert(`Please Enter Student Data to Proceed.!`)
        return;
    }

    const StudentObj = new student({ studentName: `${nameInput}`, studentAge: `${ageInput}`, studentMarks: `${marksInput}` })

    if (typeof StudentObj.studentName !== "undefined" && typeof StudentObj.studentAge !== "undefined" && typeof StudentObj.studentMarks !== "undefined") {
        students.push(StudentObj)
    }

    printStudents(students);
    storeNameInput.value = ""
    storeAgeInput.value = ""
    storeMarksInput.value = ""

}

const sortMarksBtn = document.getElementById("sortMarksBtn")
let isAscending = true;
sortMarksBtn.addEventListener("click", () => {
    if (isAscending) {
        const ascending = students.sort((a, b) => { return b.studentMarks - a.studentMarks })
        printStudents(ascending)
    } else {
        const descending = students.sort((a, b) => { return a.studentMarks - b.studentMarks })
        printStudents(descending)
    }
    isAscending = !isAscending
})

const sortNameBtn = document.getElementById("sortNameBtn")
sortNameBtn.addEventListener("click", () => {
    const sortByName = students.sort((a, b) => { return a.studentName.localeCompare(b.studentName) })
    printStudents(sortByName)
})

const searchInput = document.getElementById("searchInput")
searchInput.addEventListener("keyup", () => {
    const search = searchInput.value.toLowerCase();
    const filterByName = students.filter((element) => { return element.studentName.toLowerCase().includes(search) })
    printStudents(filterByName)
})

const generateRandomBtn = document.getElementById("generateRandomBtn")

generateRandomBtn.onclick = () => {
    const namesArr = ["Huzaif", "Arslan", "John Wick", "Zukhruf", "Ruffaf", "Osaf"]
    const randomNames = namesArr[Math.floor(Math.random() * namesArr.length)]
    const randomAge = Math.floor(Math.random() * (60 - 18) + 18)
    const randomMarks = Math.floor(Math.random() * (1100 - 350) + 350)
    const randomObj = new student({ studentName: `${randomNames}`, studentAge: `${randomAge}`, studentMarks: `${randomMarks}` })
    students.push(randomObj)
    printStudents(students)
}

const exportJsonBtn = document.getElementById("exportJsonBtn")
exportJsonBtn.onclick = () => {
    const convertJson = JSON.stringify(students)
    console.log(convertJson)
    alert(`Open Console to See the Export File...`)
}

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const deleteData = Number(event.target.dataset.index);
        students.splice(deleteData, 1)
        printStudents(students)
    }
})
























