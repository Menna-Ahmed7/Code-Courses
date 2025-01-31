import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import DeleteAll from '../../../DeleteAll'
import api from '../../../api'
import useToken from '../../../useToken'

export default function Options({ id, instructor_id, is_enrolled, setEnrollState }) {
    const { token, userdata, isAdmin, isInstructor } = useToken()
    const navigate = useNavigate()

    const enroll = async () => {
        try {
            const res = await fetch(api.enrollCourse(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token }
            });

            const data = await res.json();

            if (!res.ok)
                throw Error(data.message)
            console.log(data)
            setEnrollState(1)

        } catch (err) {
            console.log("error", err.message)
        }

    }

    const disenroll = async () => {
        try {

            const res = await fetch(api.disenrollCourse(id), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token }
            });

            const data = await res.json();

            if (!res.ok)
                throw Error(data.message)

            navigate('/courses');
        } catch (err) {
            console.log("error", err.message)
        }
    }
    return (
        <div className={styles.Buttons}>
            {
                token && userdata.ID === instructor_id &&
                <Link to='/lessons/add' className='btnG' >+ add lesson</Link>
            }
            {
                token && userdata.ID !== instructor_id && (
                    is_enrolled ?
                        <button className='btnG' onClick={disenroll}>Disenroll</button> :
                        <button className='btnG' onClick={enroll}>Enroll</button>
                )
            }
            {
                (token && (isAdmin || (isInstructor && userdata.ID === instructor_id))) &&
                <div className={styles.opt} >
                    <Link to={`/courses/edit/${id}`} className='btnE'>Edit</Link>
                    <DeleteAll
                        txt='Delete'
                        path={api.deleteCourse(id)}
                        isNavigate={1}
                        where={'/courses'}
                        afterDelete={() => { }}
                    />

                </div>
            }

        </div>
    )

}
