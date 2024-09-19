"use client";
import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  bookedTickets, // Type definition for booked tickets
  fetchTickets, // Function to fetch tickets
  handleBackButton, // Function to handle back button click
} from "@/utils/userUtils";
import TicketCard from "@/components/UserComponents/TicketCard/TicketCard";

/**
 * Dashboard page component
 *
 * Displays a list of booked tickets and handles back button click
 */
const page = () => {
  // State to store booked tickets
  const [tickets, setTickets] = useState<bookedTickets[]>([]);

  // State to store error message
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize id (currently not used)
  const id = "";

  // Get cookies and extract logged in token
  const loggedInToken = localStorage.getItem("token");

  // Redirect to login page if not logged in
  if (!loggedInToken) {
    window.location.href = "/";
  }

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets(setTickets, setErrorMessage);
  }, []);

  return (
    // Container for ticket list
    <div className={styles.ticketsList}>
      {/* Back button */}
      <button onClick={handleBackButton}>Back</button>

      {/* Display tickets if no error */}
      {!errorMessage && (
        <div>
          {/* Map through tickets and render TicketCard component */}
          {tickets.map((ticket) => (
            <TicketCard key={id} {...ticket} />
          ))}
        </div>
      )}

      {/* Display error message if present */}
      {errorMessage && (
        <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default page;
