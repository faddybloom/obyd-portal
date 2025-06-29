import React from 'react';
import TutorialCard from '../../components/TutorialCard';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const amendTutorials = ({isAuth}) => {
    const [tutorials, setTutorials] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const { data } = await client.graphql({
                    query: `query ListTutorials {
                      listTutorials(sortDirection: ASC) {
                        items {
                          id
                          title
                          description
                          youtubelink
                          storelink
                          bloglink
                          imagelink
                          storepriority
                          displayorder
                          imagename
                        }
                      }
                    }`
                });
                setTutorials(data.listTutorials.items);
            } catch (error) {
                console.log('Error fetching data', error);
            } 
        };
  
        fetchTutorials();
    }, []);

    const newTutorial = () => {
        navigate("/newtutorial");
    };
    
    return (
        <section id="tutorials">
            <div className="container">
                <h2>Tutorial Admin Page</h2>
                <p>Add or Remove Tutorial posts</p>
                <div className="row">
                    {tutorials.map((Tutoriallisting) => (
                        <TutorialCard key={Tutoriallisting.id} Tutoriallisting={Tutoriallisting} />
                    ))}
                </div> 
                <button className="addButton" onClick={newTutorial}>&#x2B; </button>
            </div>
        </section>
    );
};

export default amendTutorials;