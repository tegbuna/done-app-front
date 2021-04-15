import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import "./styles.css";

import { auth } from './services/firebase';

export default function App() {
  
  const [state, setState] = useState({
    user: null,
    chores: [{ chore: "", status: "" }],
    newChore: {
      chore: "",
      status: "",
    },
  });

  async function getAppData() {
    try {
      const BASE_URL = "https://this-done-app.herokuapp.com/api/chores";
      const chores = await fetch(BASE_URL).then(res => res.json());
      setState((prevState) => ({
        ...prevState,
        chores,
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppData();
    
    auth.onAuthStateChanged(user => {
      setState(prevState => ({
        ...prevState,
        user,
      }));
    });

  }, []);

  async function addChore(e) {
    if(!state.user) return;
    
    e.preventDefault();
    
    const BASE_URL = 'https://this-done-app.herokuapp.com/api/chores';
    
    const chore = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newChore)
    }).then(res => res.json());

    setState((prevState) => ({
      ...prevState,
      chores: [...prevState.chores, chore],
      newChore: {
        chore: "",
        status: "",
      },
    }));
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState, 
      newChore: {
        ...prevState.newChore,
        [e.target.name]: e.target.value 
      }
    })) 
  }

  return (
    <>
      <Header user={state.user} />
      <main>
        <section>
          {state.chores.map((s) => (
            <article key={s.chore}>
              <div>{s.chore}</div> <div>{s.status}</div>
            </article>
          ))}
          {
            state.user && 
            <>
            <hr />
            <fieldset>
              <legend>Add A Chore</legend>
              <form onSubmit={addChore}>
                <label>
                  <span>Chore</span>
                  <input name="chore" value={state.newChore.chore} onChange={handleChange} />
                </label>
                <label>
                  <span>Status</span>
                  <select name="status" value={state.newChore.status} onChange={handleChange} >
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>
                  </select>
                </label>
                <button>ADD CHORE</button>
              </form>
              </fieldset>
            </>
          }
        </section>
      </main>
    </>
  );
}