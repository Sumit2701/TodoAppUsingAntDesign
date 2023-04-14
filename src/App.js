import './App.css';
import { useState } from 'react';
import { Table,Input } from 'antd';
import { WithContext as ReactTags } from 'react-tag-input';
function App() {
 
const [todoList, settodoList] = useState([])
 const [value, setValue] = useState();
 const [description, setdescription] = useState();
 const [status, setstatus] = useState("OPEN");
 const [dueDate, setdueDate] = useState();
 const [tags, setTags] = useState([
  
  ]);
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };
  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
const handleDelete = i => {
  setTags(tags.filter((tag, index) => index !== i));
};
const handleAddition = tag => {
  setTags([...tags, tag]);
};
 
 const createTodoItem = (todo) => {
  const newTodoItems = [...todoList, {dueDate,tags,status, todo,description, complete: false, timeStamp:  new Date().toLocaleString()}];
  settodoList(newTodoItems);
  };

 const handleSubmit = e => {
  e.preventDefault();
  if(value === ""){
  return console.log("Please add something to-do")
  }
  if(value === ""){
    return console.log("Please add something to-do")
    }
  createTodoItem(value,description)
  setValue("")
  setdescription("")
  }
  
  const deleteTodoItem = (index) => {
    const newTodoItems = [...todoList]
    newTodoItems.splice(index, 1)
    settodoList(newTodoItems)
    }

    const completeTodoItem = (index) => {
      let id = todoList.indexOf(index);
      const newTodoItems = [...todoList];
      newTodoItems[id].complete === false
      ? (newTodoItems[id].complete = true)
      :(newTodoItems[id].complete = false);
      console.log(newTodoItems[id].complete);
     
      settodoList(newTodoItems)
      };
      const updateTodoItem = (index) => {
        const newTodoItems = [...todoList];
        const item = index;
        let newItem = prompt(`Update ${item.todo}?`, item.todo);
        let newDescription = prompt(`Update the description?`, item.description);
        let todoObj = { todo: newItem, description: newDescription, complete: false };
        newTodoItems.splice(index, 1, todoObj);
        if (newItem === null || newItem === "") {
        return;
        } else {
        item.todo = newItem;
        item.description = newDescription;
        }
        settodoList(newTodoItems);
        };
        const columns = [
          {
            title: 'Todo',
            dataIndex: 'todo',
            key: 'todo',
            render: (text, record) => (
              <p style={{textDecoration: record.complete ? "line-through" : ""}}>{text}</p>
             ),
             sorter: {
              compare: (a, b) => a.todo > b.todo,
              },
           },
          
          {
            key: "timeStamp",
            title: "Time",
            dataIndex: "timeStamp",
            sorter: {
            compare: (a, b) => a.timeStamp > b.timeStamp,
              
            },
            
          },
          {
            key: "dueDate",
            title: "Due Date",
            dataIndex: "dueDate",
            sorter: {
              compare: (a, b) => a.dueDate > b.dueDate,
              },
          },
          {
            key: "status",
            title: "Status",
            dataIndex: "status",
            filters: [
              {
                text: 'OPEN',
                value: 'OPEN',
              },
              {
                text: 'WORKING',
                value: 'WORKING',
              },
              {
                text: 'DONE',
                value: 'DONE',
              },
              {
                text: 'OVERDUE',
                value: 'OVERDUE',
              }],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
          },
        
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
              <p style={{textDecoration: record.complete ? "line-through" : ""}}>{text}</p>
             ),
             sorter: {
              compare: (a, b) => a.description > b.description,
              },
           },
           {
            title: 'Tag',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags) => tags.map(tag => tag.id).join(),
            filter: true,
                
            
           },
          
          {
            title: 'Button Test',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
             <button onClick={()=>deleteTodoItem(record)}>
               Delete
             </button>
            ),
          },
          {
            title: 'Button Test',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
             <button onClick={()=>completeTodoItem(record)}>
               Completed
             </button>
            ),
          },
          {
            title: 'Button Test',
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
             <button onClick={()=>updateTodoItem(record)}>
              Update
             </button>
            ),
          },
          
        ];
   



     
return (
<div className="App container pt-3" >
  <h1>Algo Bulls Assignment</h1>
<form className='form-group ' onSubmit={handleSubmit}>

<input
type="text"
required
placeholder="Add new Task"
value={value}
className='form-control form-control-lg pt-1'
onChange={(e) => setValue(e.target.value)}
/>
<input
width="30%"
required
type="text"
className='form-control form-control-lg mt-2'
placeholder="Add description"
value={description}
onChange={(e) => setdescription(e.target.value)}
/>

<p className=' container'>
       <label className='m-3' htmlFor="radio">Status:</label>  
        <label>
          <input type="radio" className='form-check-input' onClick={(e)=>{setstatus(e.target.value)}} name="myRadio" value="WORKING" defaultChecked />
          OPEN
        </label>
        <label>
          <input type="radio" className='form-check-input' onClick={(e)=>{setstatus(e.target.value)}} name="myRadio" value="WORKING" />
          WORKING
        </label>
        <label>
          <input type="radio" className='form-check-input' onClick={(e)=>{setstatus(e.target.value)}}  name="myRadio" value="DONE" />
          DONE
        </label>
        <label>
          <input type="radio" className='form-check-input' onClick={(e)=>{setstatus(e.target.value)}}  name="myRadio" value="OVERDUE" />
          OVERDUE
        </label>
      </p>
      <ReactTags
          tags={tags}
          className='form-control form-control-lg mt-3'
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
        <label className='m-3'  htmlFor="date">Due Date </label>
      <input type="date" name="party" className='my-3' min={new Date().toISOString().slice(0, 10)} onChange={(e)=>{setdueDate(e.target.value)}}/>
<button className='btn btn-primary my-3 form-control form-control-lg' onChange={handleSubmit}>Create</button>
</form>
{console.log(new Date().toISOString().slice(0, 10))}


 <Table dataSource={todoList}  pagination={{defaultPageSize:5}} columns={columns} />



</div>
  );
}

export default App;
