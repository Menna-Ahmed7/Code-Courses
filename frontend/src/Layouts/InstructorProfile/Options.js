import React from 'react'
import styles from './index.module.css'
import { Link, useNavigate } from 'react-router-dom'

import useToken from '../../useToken'
import api from '../../api'

export default function Options({ id }) {
    const { userdata, token, setInstructor, isAdmin, userdata: { ID } } = useToken()
    const navigate = useNavigate();

    const handelDeleteIns = async () => {
        try {
            const res = await fetch(api.deleteInstructor(userdata.ID), {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'token': token }
            })
            const data = await res.json()
            if (!res.ok) throw data.message
            setInstructor(0)
            navigate(`/students/${userdata.ID}`)
        }
        catch (err) {
            console.log("error", err)
        }

    }
    return (
        <div className={styles.optsCont}>
            <div>
                <Link to={`/students/${id}`} className='btnG'>as Student</Link>
                {isAdmin && ID === id ?
                    <Link to={`/admin`} className='btnG'>as admin</Link> : <></>
                }
            </div>

            <div>
                {token && (isAdmin || userdata.ID === id) ?
                    <>
                        <Link to='/edit/me' className='btnE'>Edit</Link>
                        <button className='btnDanger' onClick={handelDeleteIns}>Delete Instructor</button>

                    </> : <></>}
            </div>
        </div>
    )
}
