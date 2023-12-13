$(function () {
  var but = document.getElementById("Get");
  var but2 = document.getElementById("add");
  var but6 = document.getElementById("Save");
  but.addEventListener("click", fetchData);
  but2.addEventListener("click", postData);
  $("#mtable2").on("click", "#Delete", deleteData);
  $("#mtable2").on("click", "#Edit", showModal);
  but6.addEventListener("click", putData);
  //but4.addEventListener('click', deleteData);
});
const Url = "http://localhost:3035/api/movie/";

async function fetchData() {
  const response = await fetch(Url, {
    method: "GET",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  const tab = document.getElementById("mtable2");
  tab.innerHTML = " ";
  for (let i = 0; i < data.length; i++) {
    var res = data[i];
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    let but3 = document.createElement("button");
    but3.innerHTML = "EDIT";
    but3.setAttribute("id", "Edit");
    but3.setAttribute("type", "button");
    but3.setAttribute("data-bs-toggle", "modal");
    but3.setAttribute("data-bs-target", "#exampleModal");
    but3.classList.add("button-54");
    var but4 = document.createElement("button");
    but4.innerHTML = "REMOVE";
    but4.setAttribute("id", "Delete");
    but4.classList.add("button-54");
    tr.setAttribute("data_id", res._id);
    tr.setAttribute("id", "row");

    td.classList.add("data1");
    td2.classList.add("data1");
    td3.classList.add("data1");
    td4.classList.add("data1");
    td5.classList.add("data1");
    // td6.classList.add("data2");

    if (res.Title) {
      td.textContent = res.Title;
    } else {
      td.textContent = "N/A";
    }
    tr.appendChild(td);
    tab.appendChild(tr);

    if (res.DirectorName) {
      td2.textContent = res.DirectorName;
    } else {
      td2.textContent = "N/A";
    }
    tr.appendChild(td2);
    tab.appendChild(tr);

    if (res.ReleaseDate) {
      td3.textContent = res.ReleaseDate;
    } else {
      td3.textContent = "N/A";
    }
    tr.appendChild(td3);
    tab.appendChild(tr);
    td6.appendChild(but3);
    tr.appendChild(td6);
    tr.appendChild(but4);
    tab.appendChild(tr);
  }
}

async function postData() {
  let Title = document.getElementById("Fname").value;
  let DirectorName = document.getElementById("Mname").value;
  let ReleaseDate = document.getElementById("Lname").value;
  let response = await fetch(Url, {
    method: "POST",
    body: JSON.stringify({
      Title : Title,
      DirectorName : DirectorName,
      ReleaseDate : ReleaseDate
    }),
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  fetchData();
}

async function deleteData() {
  var but5 = $(this);
  var parent = but5.closest("#row");
  var id = parent.attr("data_id");

  const response = await fetch(Url + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  fetchData();
}

async function showModal() {
  var but5 = $(this);
  var parent = but5.closest("#row");
  var id = parent.attr("data_id");

  const response = await fetch(Url + id, {
    method: "GET",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  document.getElementById("Fname1").value = data.Title;
  document.getElementById("Mname1").value = data.DirectorName;
  document.getElementById("Lname1").value = data.ReleaseDate;
  document.getElementById("ID").value = data._id;
}

async function putData() {
  var Title= document.getElementById("Fname1").value;
  var DirectorName = document.getElementById("Mname1").value;
  var ReleaseDate= document.getElementById("Lname1").value;
  var id1 = document.getElementById("ID").value;

  let response = await fetch(Url + id1, {
    method: "PUT",
    body: JSON.stringify({
      Title:Title,
      DirectorName:DirectorName,
     ReleaseDate : ReleaseDate
    }),
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  fetchData();
}
