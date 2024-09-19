"use client";

import React from 'react';
import styles from './NewTheaterList.module.css';
import ButtonComponent from '../../reusableComponents/ButtonComponent/ButtonComponent';
import { TheaterProps } from '../ManageTheaters/ManageTheaters';
import { handleAddTheaters } from '@/utils/adminUtils';

// Theater interface


// TheaterList component
interface TheaterListProps {
    theaters: TheaterProps[]; // Function to handle adding a theater
    setMessage:(message:string)=>void;
    setTheaterAdded:(status:boolean)=>void;
}


const NewTheaterList: React.FC<TheaterListProps> = ({ theaters,setMessage,setTheaterAdded }) => {
    
    return (
        <div className={styles.theaterGrid}>
            {theaters.map((theater, index) => (
                <div className={styles.theaterCard} key={index}>
                    <h2 className={styles.theaterName}>{theater.cinema_name}</h2>
                    <p className={styles.theaterAddress}>
                        {theater.address}, {theater.city}, {theater.postcode}
                    </p>
                    <ButtonComponent
                        value="Add"
                        className="addButton"
                        onClickFunction={()=>handleAddTheaters(theater,setMessage,setTheaterAdded)}
                    />
                </div>
            ))}
        </div>
    );
};

export default NewTheaterList;
