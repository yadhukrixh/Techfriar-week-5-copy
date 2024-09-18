import { newMovie } from "@/components/AdminComponents/ManageMovie/ManageMovie";
import { TheaterProps } from "@/components/AdminComponents/ManageTheaters/ManageTheaters";
import axios from "axios";
import { FetchedMovieProps, FetchedTheatersProps } from "./fetchData";

const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};


// handle Logged in
export const handleAdminLogin = async(
    email:string,
    password:string,
    setErrorMessage:(message:string)=>void
)=>{
    try{
        if(!email || !password){
            setErrorMessage("Enter a valid credentials");
        }
        const response = await axios.post("http://localhost:3200/auth/handleAdminLogin",{email,password});
        if(response.data.authenticated){
            window.location.href = '/Admin/AdminDashboard'
        }
        else{
            setErrorMessage(response.data.message);
        }
    }catch(error){
        console.error(error);
    }
}





// handle movie search
export const handleSearchMovie = async(
    movieTitle:string,
    movieYear:string,
    setnewMovie:(value:newMovie) => void,
    setResponseStatus:(status:boolean) => void,
    setMovieFoundStatus:(status:boolean) => void
) => {
    if(!movieTitle){
        setResponseStatus(true);
        setMovieFoundStatus(false)
    }
    else{
        try{
            const response = await axios.post('http://localhost:3200/movie/fetchMovieDetailsToRegister',{movieTitle,movieYear});
            if(response){
                setResponseStatus(true);
                if(response.data.response === "True"){
                    setMovieFoundStatus(true)
                    setnewMovie(response.data)
                }
                else{
                    setMovieFoundStatus(false)
                }
            }
        }catch(error){
            console.error(error);
        }
    }
    
};

//  add movie
export const handleAddMovie = async(
    newMovie:newMovie,
    rating:number,
    setShowAddMovie:(status:boolean) => void,
    setMessagePopup:(status:boolean)=>void,
    setMessage:(message:string)=>void
) => {
    
    try{
        if(!rating){
            setMessagePopup(true);
            return setMessage("You have to choose a rating");
        }
        const response = await axios.post('http://localhost:3200/movie/registerMovie',{newMovie,rating});
        if(response.data.savedStatus){
            setShowAddMovie(false);
        }
        setMessagePopup(true);
        setMessage(response.data.message);
        console.log(response.data.message);
        await delay(2000);
        window.location.reload();
    }catch(error){
        console.error(error);
    }
};

// delete movie
export const handleDeleteMovie = async(
    movieData:FetchedMovieProps,
    setMessage:(messsage:string)=>void,
    setShowPopup:(status:boolean)=>void
)=>{
    const movieId = movieData._id;
    try{
        const response = await axios.delete(`http://localhost:3200/movie/deleteMovie/${movieId}`);
        setShowPopup(true);
        setMessage(response.data.message);
        await delay(2000);
        window.location.reload();
    }catch(error){

    }
}

//  search Theaters
export const handleSearchTheatres = async(
    lat:string,
    long:string,
    setTheaterList:(list:TheaterProps[]) => void,
    setTheatersFound:(status:boolean)=>void,
    setMessage:(message:string)=>void
) => {
    const location = `${lat};${long}`;
    const response = await axios.post('http://localhost:3200/movie/searchTheaters',{location});
    setTheatersFound(true);
    if(!response.data.theatersFound){
        setMessage(response.data.message)
    }
    setTheaterList(response.data);
}

// Add theaters
export const handleAddTheaters = async(
    newTheater:TheaterProps,
    setMessage:(message:string)=> void,
    setTheaterAdded:(status:boolean)=>void
)=>{
    const response = await axios.post('http://localhost:3200/movie/addTheater',{newTheater});
    setTheaterAdded(true);
    setMessage(response.data.message);
    await delay(2000);
    window.location.reload();
}


// delete theater
export const handleDeleteTheater = async(
    theater : FetchedTheatersProps,
    setShowPopup:(status:boolean)=>void,
    setMessage:(message:string)=>void
)=>{
    const theaterId = theater._id
    const response = await axios.delete(`http://localhost:3200/movie/deleteTheater/${theaterId}`);
    setShowPopup(true);
    setMessage(response.data.message);
    await delay(2000);
    window.location.reload();
}


// Handle add show
export const handleAddShow = async(
    movie:string,
    theater:string,
    showTime:string,
    date:string,
    setErrorMessage:(message:string)=>void,
    setPopupMessage:(message:string)=>void,
    setSheduleAdded:(status:boolean)=>void
)=>{
    try{
        const response = await axios.post('http://localhost:3200/movie/addShows',{movie,theater,showTime,date});
        if(response){
            setErrorMessage(response.data.error);
            setPopupMessage(response.data.message);
            response.data.isAdded?setSheduleAdded(response.data.isAdded):setSheduleAdded(false);
        }
    }catch(error){
        console.error(error);
    }
}


