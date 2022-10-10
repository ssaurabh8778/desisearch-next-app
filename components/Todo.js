import React, { useEffect, useRef, useState } from "react";
import ShortUniqueId from "short-unique-id";
import styles from "./Todo.module.css";

const getUniqueId = (n) => new ShortUniqueId({ length: n })();
const CheckAllIcon = ({ color = "white", className = "" }) => (
    <svg
        className={className}
        width="20"
        height="11"
        viewBox="0 0 20 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 6.53846L4.6 10M9.64 4.46154L13.24 1M6.76 6.53846L10.36 10L19 1"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const DeleteChecked = ({ color = "white", className = "" }) => (
    <svg
        className={className}
        width="19"
        height="21"
        viewBox="0 0 19 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 16C1 17.1 1.9 18 3 18H7.80383C7.28174 17.0956 7 16.0623 7 15C7 13.4087 7.63214 11.8826 8.75736 10.7574C9.88258 9.63214 11.4087 9 13 9V4H1V16Z"
            fill={color}
        />
        <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill={color} />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.85718 15C7.85718 13.6361 8.39901 12.328 9.36349 11.3635C10.328 10.399 11.6361 9.85718 13 9.85718C14.364 9.85718 15.6721 10.399 16.6366 11.3635C17.6011 12.328 18.1429 13.6361 18.1429 15C18.1429 16.364 17.6011 17.6721 16.6366 18.6366C15.6721 19.6011 14.364 20.1429 13 20.1429C11.6361 20.1429 10.328 19.6011 9.36349 18.6366C8.39901 17.6721 7.85718 16.364 7.85718 15ZM12.7065 17.2012L15.6675 13.4997L15.1326 13.0718L12.6078 16.2268L10.8195 14.7367L10.3806 15.2633L12.7065 17.2012Z"
            fill={color}
        />
    </svg>
);

const Todo = () => {
    const [todoList, setTodoList] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTodos = localStorage.getItem("todos");
            if (savedTodos) {
                return JSON.parse(savedTodos);
            }
        }
        return [];
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dialogRef = useRef(null);

    const addTodo = (e) => {
        e.preventDefault();
        if (!e.target.todo.value.trim()) {
            return false;
        }
        const newTodo = {
            id: getUniqueId(6),
            todo: e.target.todo.value.trim(),
            done: false,
        };
        setTodoList([...todoList, newTodo]);

        e.target.reset();
    };
    const toggleDone = (target) => {
        setTodoList((list) =>
            list.map(({ todo, done, id }) => {
                if (id === target) {
                    const updatedTodo = {
                        todo,
                        done: !done,
                        id,
                    };
                    return updatedTodo;
                }
                return { todo, done, id };
            })
        );
    };

    const checkAllTodos = () => {
        setTodoList((list) =>
            list.map(({ todo, id }) => ({ todo, done: true, id }))
        );
    };
    const deleteCheckedTodos = () => {
        setTodoList((list) => list.filter((item) => !item.done));
    };

    useEffect(() => {
        document.addEventListener("mouseup", (e) => {
            dialogRef.current?.contains(e.target)
                ? true
                : setIsDialogOpen(false);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <>
            {isDialogOpen ? (
                <div className={styles.container} ref={dialogRef}>
                    <div className={styles.header}>
                        <h4
                            className={styles.title}
                            onClick={() =>
                                setIsDialogOpen((current) => !current)
                            }
                        >
                            Todo
                        </h4>
                        <div className={styles.menu}>
                            <button
                                onClick={checkAllTodos}
                                className={styles.menuBtn}
                            >
                                <CheckAllIcon className={styles.menuIcon} />
                            </button>
                            <button
                                onClick={deleteCheckedTodos}
                                className={styles.menuBtn}
                            >
                                <DeleteChecked className={styles.menuIcon} />
                            </button>
                        </div>
                    </div>
                    <ul className={styles.todolist}>
                        {todoList.length !== 0 ? (
                            todoList.map(({ todo, done, id }) => (
                                <li key={id} className={styles.todoItem}>
                                    <input
                                        className={styles.checkbox}
                                        type="checkbox"
                                        value={done}
                                        checked={done}
                                        onChange={() => toggleDone(id)}
                                        id={id}
                                    />
                                    <label
                                        className={styles.todoText}
                                        htmlFor={id}
                                    >
                                        {todo}
                                    </label>
                                </li>
                            ))
                        ) : (
                            <span className={styles.noTodo}>
                                Add a todo to get started
                            </span>
                        )}
                    </ul>
                    <form onSubmit={addTodo} autoComplete="off">
                        <input
                            type="text"
                            name="todo"
                            className={styles.input}
                            placeholder="New Todo"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            hidden
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div
                    className={styles.btnContainer}
                    onClick={() => setIsDialogOpen((current) => !current)}
                >
                    <h4 className={styles.title}>Todo</h4>
                </div>
            )}
        </>
    );
};

const MemoizedTodo = React.memo(Todo);
export default MemoizedTodo;
