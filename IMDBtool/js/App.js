
//FIREBASE
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import React, { useState } from 'react';
import './App.css';
import pic from "./robot1.png";
import { useEffect } from 'react';


//init Firebase

const firebaseConfig = {
  apiKey: "API_XXX",
  authDomain: "imdb-search-tool.firebaseapp.com",
  projectId: "imdb-search-tool",
  storageBucket: "imdb-search-tool.appspot.com",
  messagingSenderId: "6328XXXXXX",
  appId: "1:63285XXXXXXX",
  measurementId: "G-XXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);






let x = 0
function ButtonComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  function clickEvent() {
    setIsDarkMode(!isDarkMode);
    x = (isDarkMode ? 0 : 1);
    console.log(x)
  }

  return (
    <div>
      
      <button id="mode" onClick={clickEvent}>
        Dark {x}
      </button>
    </div>
  );
}

//Image Visibility

function ImageComponent() {


  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (window.innerWidth < 1000 || window.innerHeight < 600) {
      setIsVisible(false);
    }
  }, []);

  return (
    <div>
      {isVisible && (
        <img 
          id="animated-component"
          src={pic}
          style={{ opacity: isVisible ? 1 : 0 }}
        />
      )}
    </div>
  );
}


// Search component
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '', // str to hold the search query
            results: [], // list to hold the search results
           
        };
    }

    

    // function to handle input changes
    handleChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    // function to handle form submission
    handleSubmit = (event) => {
      
        event.preventDefault();
       // TO 5 REQUESTS every 3 hours
        //const apiKey = 'k_iuz1u7qp';
        const apiKey = 'k_nuhfhrt0';
        
        const searchQuery = this.state.searchQuery;
        const url = `https://imdb-api.com/en/API/Search/${apiKey}/${searchQuery}`;
    
        // make the GET request to the IMDb API
        fetch(url)
            .then(response => response.json())
            .then(data => {
              console.log("SOME DATA:")
              console.log(data)
                this.setState({
                    results: data.results
                });
            })
            .catch(error => {
                console.log(error);
            });

        
    }
    
    //Handle Clicks

    clickWave = () =>{
      
      document.getElementById('wave-backgroundid').setAttribute("style", "opacity: 0");
      }
    

    clickEvent1 = () => {
    
    document.getElementById('panel').setAttribute("style", "background-color: #282c34" );
      document.getElementById('title').setAttribute("style", "color: white");
      document.getElementById('searchbtn').setAttribute("style", "color:white");
   
  }

    clickEvent2 = () => {
      document.getElementById('panel').setAttribute("style", "background-color: rgb(197, 222, 244)" );
    document.getElementById('title').setAttribute("style", "color: #282c34");
    document.getElementById('mode').setAttribute("style", "background-color: rgb(24, 150, 209)");
    document.getElementById('searchbtn').setAttribute("style", "color:#282c34");
    
      
  }


  render() {
   

    return (
        <div>
          
            <form onSubmit={this.handleSubmit}>
                <input id="inputer" type="text" placeholder="Search for movies or series" value={this.state.searchQuery} onChange={this.handleChange} />
                <ImageComponent/>

                <button id="searchbtn" type="submit" onClick={this.clickWave}>Search</button>
                <div onClick={this.clickEvent1}>

                <ButtonComponent/>

                </div>
                <div onClick={this.clickEvent2}>

                <button id="mode">Light</button>
                
                </div>
                

            </form>
            

            {/* Map over the search results and display them */}
            {this.state.results.length > 0 && this.state.results.map(result => (
        <div key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
            <img src={result.image}></img>

           
        </div>
            ))}
           
        </div>
    );
}
}



function App() {
  


  
  
  return (
    //jsx wrapping
    
    <div className="App">
        <div id="wave-backgroundid" className="wave-background"></div>
        <div id="panel" className="App-header" >
          <h1 id="title">IMDb Search Tool by Filip </h1>
          
          <Search />


        </div>
      </div>
);
}

export default App;