let todoName = document.getElementById("todoName");
let description = document.getElementById("description");
let todosRequired = document.querySelector(".td-1");
let todosDone = document.querySelector(".td-2");
let ordlist = document.querySelectorAll(".ordlist");

for (let i = 0; i < ordlist.length; i++) {
  ordlist[i].addEventListener("click", deleteOrder);
}

let generateHtml = (id, todoName, description) => {
  const li = `<li id="${id}"> ${todoName} - ${description}
                    <button type="button" onclick="done(event)">&#10004;</button>
                    <button type="button" onclick="deleteItem(event)" class="delete">&#10006</button>
                </li>`;
  todosRequired.innerHTML = todosRequired.innerHTML + li;
};

function done(event) {
  const item = event.target.parentElement;
  item.querySelector("button").remove();
  item.querySelector(".delete").remove();
  todosDone.appendChild(item);
}
function deleteItem(event) {
  const item = event.target.parentElement;
  item.remove();
}

async function addTodo(event) {
    
  event.preventDefault();
  if (todoName.value && description.value) {
    let todoObj = {
      todoName: todoName.value,
      description: description.value
    };

    try {
      let response = await axios.post(
        "https://crudcrud.com/api/82370a7656d54e8b8c790c20f33a141a/Todosdata",
        todoObj
      );
      generateHtml(
        response.data._id,
        response.data.todoName,
        response.data.description
      );
    } catch (error) {
      document.body.innerHTML +=
        "<h4>Oops! Something Went Wrong</h4>";
      console.log(error);
    }
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let response = await axios.get(
      "https://crudcrud.com/api/82370a7656d54e8b8c790c20f33a141a/Todosdata"
    );
    response.data.forEach((order) => {
      generateHtml(order._id, order.todoName, order.description);
    });
  } catch (error) {
    console.log(error);
  }
});

// delete order

async function deleteOrder(event) {
  if (event.target.classList.contains("delete")) {
    const id = event.target.parentElement.getAttribute("id");
    try {
      let response = await axios.delete(
        `https://crudcrud.com/api/82370a7656d54e8b8c790c20f33a141a/Todosdata/${id}`
      );
      event.target.parentElement.remove();
      
    } catch (error) {
      console.log(error);
    }
  }
}
  
