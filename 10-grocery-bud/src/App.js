import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const list = localStorage.getItem("list")
  if(list)
  {
    return JSON.parse(list)
  }
  else
  {
    return [];
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('hello')

    if (!name) {
      //display alert
      showAlert(true, "please enter value", "danger")
    }
    else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name }
          }
          return item;
        })
      )
      setName("")
      setEditId(null)
      setIsEditing(false)
      showAlert(true, "item edited", "success")

    }
    else {
      showAlert(true, "Item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("")
    }
  }

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  }

  const removeItem = (id) => {
    showAlert(true, "item removed", "danger")
    const newList = list.filter((item) => id !== item.id);
    setList(newList);

  }

  const editItem = (id) => {
    setIsEditing(true);
    const itemToBeEdited = list.find((item) => item.id === id);
    setEditId(id);
    setName(itemToBeEdited.title);
  }

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='eg. eggs' value={name} onChange={(e) => setName(e.target.value)} />
          <button className="submit-btn" type='submit'>
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {
        list.length > 0 &&
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} list={list} />
          <button className="clear-btn" onClick={() => {
            setList([])
            showAlert(true, "empty list", "danger")
          }}>clear items</button>
        </div>
      }
    </section>
  )
}
export default App
