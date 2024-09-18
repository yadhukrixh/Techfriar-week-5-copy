"use client";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  bookedTickets,
  fetchTickets,
  handleBackButton,
} from "@/utils/userUtils";
import TicketCard from "@/components/UserComponents/TicketCard/TicketCard";
import { parseCookies } from "nookies";
const page = () => {
  const [tickets, setTickets] = useState<bookedTickets[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const id = "";
  const cookies = parseCookies();
    const loggedInToken = cookies.token;

    if(!loggedInToken){
      window.location.href = '/';
    }
  useEffect(() => {
    fetchTickets(setTickets, setErrorMessage);
  }, []);

  return (
    <div className={styles.ticketsList}>
      <button onClick={handleBackButton}>Back</button>
      {!errorMessage && (
        <div>
          {tickets.map((ticket) => (
            <TicketCard key={id} {...ticket} />
          ))}
        </div>
      )}
      {errorMessage &&
        <p style={{textAlign:'center' , color:'red'}}>
            {errorMessage}
        </p>
      }
    </div>
  );
};

export default page;
