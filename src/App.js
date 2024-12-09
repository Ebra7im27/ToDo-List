import { useEffect, useRef, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './App.css'

function App() {
  const [x, setx] = useState(() => {
    // localStorage استرجاع البيانات من  عند تحميل الصفحة
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    // localStorage تخزين المهام في  عند تحديث القائمة
    localStorage.setItem('tasks', JSON.stringify(x))
  }, [x])

  const add = () => {
    const value = inputRef.current.value
    if (value === '') {
      alert('Please enter a task before adding!')
      return
    }
    
    const newData = { completed: false, value }
    setx([...x, newData])

    inputRef.current.value = ''
    inputRef.current.focus()
  }

  const itemDone = (index) => {
    const newx = [...x] // القديمه state كدا اخدت نسخه من ال

    newx[index].completed = !newx[index].completed // والعكس true خليها false لو

    setx(newx) // x جدد قيمه ال
  }

  const toDelete = (index, event) => {
    event.stopPropagation() // بيمنع العناصر تدخل ف بعضها

    const newx = [...x] // القديمه state كدا اخدت نسخه من ال

    newx.splice(index, 1) // حذف العنصر

    setx(newx) // x جدد قيمه ال
  }

  return (
    <div className="App">
      <Container className="mt-5 sec-up">
        <h2 className="text-center title">ToDo List</h2>
        <ul>
          {x.map(({ value, completed }, index) => (
            <li
              onClick={() => itemDone(index)}
              className={completed ? 'diffstyle' : ''}>{value}
              <i onClick={(event) => toDelete(index, event)} className="fas fa-times icon"></i>
            </li>
          ))}
        </ul>
        <Form>
          <Form.Group className="mb-3" controlId="formTaskInput">
            <Form.Control ref={inputRef} className="inp" type="text" placeholder="Enter New Task....." />
          </Form.Group>

          <Button onClick={add} variant="primary" className="w-100 btn">ADD</Button>
        </Form>
      </Container>
    </div>
  )
}

export default App
