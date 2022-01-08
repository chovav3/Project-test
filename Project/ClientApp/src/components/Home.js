import React, { useEffect, useState, useRef,useContext } from 'react';
import Guard from '../components/Guard/Guard'
import '../components/Home.css'
import { UserContext } from '../context/UserContext';
import Popup from './Popup/Popup';
import QueuePopup from '../../src/components/Popup/QueuePopup'
import { toast } from '../components/Toast/ToastManager'


const Home = () => {

    const [Queues, setQueues] = useState([])
    const [popupContent, setpopupContent] = useState({})
    const [filter, setFilter] = useState({ name:"",dogName:"",date:""})
    const mountedRef = useRef(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (mountedRef.current) {
            fetch('api/Queues/GetQueues')
                .then(response => response.json())
                .then(data => setQueues(data))
        }
    }, [])

    useEffect(() => {
        return () => {
            mountedRef.current = false
        }
    })

    const getDate = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16)
    }

    const add = () => {
        if (Queues.every((Queue) => !Queue.inEdit)) {
            setQueues([{
                inEdit: true, id: 0,
                name:user[0].name,
                dogName: "", date: getDate()
            }, ...Queues])
        } else {
            alert('יש כבר רשומה בעריכה')
        }
    }

    const validation = (data) => {
        return data.date  && data.dogName  && data.name 
    }

    const save = (data) => {
        if (validation(data)) {
            fetch('api/Queues/InsertQueues', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(res => {
                const QueuesChange = Queues.map((Queue) =>
                    Queue.id == 0 ? { ...res[0] } : Queue)
                setQueues(QueuesChange)
                toast.show({
                    variant: "success",
                    content: "Saved successfully",
                    duration: 3000
                })
            }).catch(() => {
                toast.show({
                    variant: "error",
                    content: "An error occurred",
                    duration: 3000
                })
            })
        } else { alert('All fields are required')}
    }

    const handleChange = (e) => {
        const QueuesChange = Queues.map((Queue) =>
            Queue.id === 0 ? { ...Queue, [e.target.name]: e.target.value } : Queue)
        setQueues(QueuesChange)
    }

    const cancel = () => {
        const QueuesChange = Queues.filter((Queue) => Queue.id !== 0 )
        setQueues(QueuesChange)
    }

    const closePopup = () => {
        setpopupContent({})
    }


    return (
        <Guard>
            <h1 style={{ textAlign: 'center',fontSize: '60px'}}>Queues</h1>
            <div className="height">
                <div className="center">
                    <img onClick={add} src="https://img.icons8.com/color/48/000000/plus-2-math.png" alt="add" />
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>dog name</th>
                        <th>date</th>
                        <th></th>
                    </tr>
                    <tr style={{ background: '#e5c9c9'}}>
                        <td><input name="name" type="text" value={filter.name} onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })} style={{ width: 'auto' }} /></td>
                        <td><input name="dogName" type="text" value={filter.dogName} onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })} style={{ width: 'auto' }} /></td>
                        <td><input name="date" type="datetime-local" value={filter.date} onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.value })} style={{ width: 'auto' }} /></td>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Queues.filter((Queue) => Queue.id ==0 || Queue.name.includes(filter.name) && Queue.dogName.includes(filter.dogName) && Queue.date.includes(filter.date)).map((Queue) =>
                        <tr key={Queue.id}>

                            {Queue.inEdit ? <>
                                <td>{Queue.name}</td>
                                <td><input name="dogName" type="text" value={Queue.dogName} onChange={(e) => handleChange(e)} style={{ width: 'auto' }}/></td>
                                <td><input name="date" type="datetime-local" value={Queue.date} onChange={(e) => handleChange(e)} style={{ width: 'auto' }}/></td>
                                <td ><img onClick={() => save(Queue)} src="https://img.icons8.com/nolan/64/save.png" alt="save" />
                                    <img onClick={() => cancel(Queue)} src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-gradient-kiranshastry.png" alt="remove" />                                </td>
                            </> :
                                <>
                                    <td>{Queue.name}</td>
                                    <td>{Queue.dogName}</td>
                                    <td>{Queue.date.slice(0, 10)} | {Queue.date.slice(-8, -3)}</td>
                                    <td><img onClick={() => setpopupContent(Queue)} src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/64/000000/external-note-documents-icongeek26-outline-gradient-icongeek26.png" alt="open"/></td>
                                </>}
                        </tr>
                    )}
                </tbody>
            </table>
                <Popup show={Object.keys(popupContent).length !== 0} closeHandler={closePopup} content={<QueuePopup popupContent={popupContent} />} title={'Queue details'} />
                </div>
            </div>
    </Guard >
    );
}

export default Home
