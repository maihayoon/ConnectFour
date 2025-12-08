import "./TodoList.css"
import React, {useState} from "react";

function TodoList() {
    const [task, settask] = useState("");
    const [tasks, settasks] = useState([]);
    const [index, setindex] = useState(null);


    const addTask=()=>{
        if(index === null){
            settasks([...tasks,task])
        }
        else{
            const updateTasks = tasks;
            updateTasks[index] = task
            settask(updateTasks);
            setindex(null)
        }



        settask("")


    }
    const removeTask=(indexToRemove)=>{
        settasks(tasks.filter((task,i) => i !== indexToRemove))
        setindex(null)

    }
    const editTask=(index)=>{
        setindex(index)
        settask(tasks[index])

    }



    return (
        <div>
            <h1> to do list</h1>
            <input type={"text"}
                   placeholder={"add a task ..."}
                   value={task}
                   onChange={(e) => settask(e.target.value)}
            />
            <button

                disabled={task.trim() === ""}
                    onClick={addTask}
                    >
                edd
            </button>

            {
                tasks.length > 0 && (
                    <ul>
                        {
                            tasks.map((task ,index) =>
                                <li key={index}>
                                    {task}
                                    <button onClick ={()=>removeTask(index)}> remove </button>
                                    <button onClick={()=>editTask(index)}>edit</button>



                                </li>
                            )
                        }


                    </ul>


                )

            }


        </div>

    );

}
export default TodoList;