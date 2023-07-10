let todoName = document.getElementById("todoName");
let description = document.getElementById("description");
let todosRequired = document.querySelector(".td-1");
let todosDone = document.querySelector(".td-2");

let generateHtml = (id, todoName, description) => {
  const li = `<li id="${id}"> ${todoName} - ${description}
                    <button type="button" onclick="done(event)">&#10004;</button>
                    <button type="button" onclick="cancel(event)">&#10006;</button>
                </li>`;
    todosRequired.innerHTML = todosRequired.innerHTML + li
  
};

async function addTodo(event) {
    
  event.preventDefault();
  if (todoName.value && description.value) {
    let todoObj = {
      todoName: todoName.value,
      description: description.value
    };

    try {
      let response = await axios.post(
        "https://crudcrud.com/api/bb6740962ccc4376ba340fde43ddc3c0/Todosdata",
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
      "https://crudcrud.com/api/bb6740962ccc4376ba340fde43ddc3c0/Todosdata"
    );
    response.data.forEach((order) => {
      generateHtml(order._id, order.todoName, order.description);
    });
  } catch (error) {
    console.log(error);
  }
});

function done(event) {
    const item = event.target.parentElement;
    todosDone.appendChild(item);
  }
  
  function cancel(event) {
    const item = event.target.parentElement;
    todosRequired.appendChild(item);
  }
  