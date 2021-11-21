const dateTime = document.querySelector(".date__time");
const flagCross = document.querySelector(".flag__cross");
const flag = document.getElementById("flag");
const table = document.getElementById("table");
const tbody = document.getElementById("puthere");
const addRow = document.querySelector(".add__box");
const delRow = document.querySelector(".delete__box");
const achievements= document.querySelector(".achievements");

let today = new Date();
let i = 2;

let time = today.toLocaleString('en-IN', {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    hour12: true,
    minute: "numeric"
});
dateTime.innerText = `${time}`;

flagCross.addEventListener("click", function () {
    flag.classList.remove("flag");
    flag.classList.add("off");
});

achievements.style.backgroundColor = "rgb(0, 60, 128)";

addRow.onclick = () => {
    add();
    if(table.rows.length>2){
        delRow.classList.remove("off");
    }
};

delRow.onclick = () => {
    del();
    if (table.rows.length <= 2) {
        delRow.classList.add("off");
    }
}

function add() {
    let html = "";
    html += `
        <tr>            
                <td 
                 style=
                 "
                    border: 2px solid white;
                    height: 40px;
                    padding-left: 0.5rem;
                 "
                >${i++}</td>
                <td
                style=
                "
                   border: 2px solid white;
                   height: 40px;
                   padding-left: 0.5rem;
                "
                >
                    <select name="category" id="category">
                        <option value="">Select Category</option>
                        <option value="Academic">Academic</option>
                        <option value="Extra-Curricular">Extra-Curricular</option>
                        <option value="Others">Others</option>
                    </select>
                </td>
                <td
                style=
                 "
                    border: 2px solid white;
                    height: 40px;
                    padding-left: 0.5rem;
                 "
                >
                    <select name="achievements_item" id="achievements">
                        <option value="">Select item</option>
                        <option value="ISO">ISO</option>
                        <option value="IMO">IMO</option>
                        <option value="NSEIS">NSEIS</option>
                        <option value="RMO">RMO</option>
                        <option value="IOI">IOI</option>
                        <option value="NTSE">NTSE</option>
                        <option value="KVPY">KVPY</option>
                        <option value="Hackathon">Hackathons</option>
                        <option value="Contribution">Contribution</option>
                        <option value="NPTEL">NPTEL</option>
                        <option value="Sports Tournament">Sports Tournament</option>
                    </select>
                </td>
                <td
                style=
                 "
                    border: 2px solid white;
                    height: 40px;
                    padding-left: 0.5rem;
                 "
                >
                    <input type="text" name="description_text" id="description_text">
                </td>                          
        </tr>
        `




    let row = table.insertRow(-1);
    row.innerHTML = html;



}


function del() {
    i = i - 1
    table.deleteRow(-1);

}


