import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [people, setPeople] = useState([
    {
      _id: "p1",
      name: "Artur",
      hobbies: [" Coding ", " Gaming "],
      image: "https://source.unsplash.com/100x100/?person,pilot",
    },
    {
      _id: "p2",
      name: "Tiana",
      hobbies: [" Coding", " Running", " Reading"],
      image: "https://source.unsplash.com/100x100/?person,teacher",
    },
    {
      _id: "p3",
      name: "Rita",
      hobbies: [],
      image: "https://source.unsplash.com/100x100/?person,stewardess",
    },
    {
      _id: "p4",
      name: "Ricci",
      hobbies: [" Traveling", " Coding", " Reading", " Writin"],
      image: "https://source.unsplash.com/100x100/?person,officer",
    },
  ]);

  const [person, setPerson] = useState();
  const [message, setMessage] = useState("");
  
  const [users, setUsers] = useState(() => {
    const saveUsersInLS = localStorage.getItem("users");
    if (saveUsersInLS) {
      return JSON.parse(saveUsersInLS);
    } else {
      return [];
    }
  });
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddInputChange = (e) => {
    setEmail(e.target.value);
    setText(e.target.value);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    if (email !== "" || text !== "") {
      setUsers([
        ...users,
        {
          id: new Date(),
          email: email.trim(),
          text: text.trim(),
        },
      ]);
    }
    setEmail("");
    setText("");
  };

  const showHobbies = () => {
    person.hobbies.length > 0
      ? setMessage(person.name + "s " + "hobbies are: " + person.hobbies)
      : setMessage("Unfortunately, " + person.name + " " + "has no hobbies.");
  };
  // const noHobbies = () => {
  //   person.hobbies.length > 0
  //     ? setMessage(person.name + " has " + person.hobbies.length + " hobbies")
  //     : setMessage(
  //         "Unfortunately, " + person.name + " " + "has no hobbies."
  //       );
  // };

  const countHobbies = (person) => {
    setPerson(person);
    setMessage(person.name + " has " + person.hobbies.length + " hobbies");
    // noHobbies(person)
  };

  return (
    <div className="App">
      <h1>Hobbies Challenges</h1>
      <div className="people">
        {people.map((person) => (
          <div
            key={person._id}
            onClick={() => countHobbies(person)}
            className="person"
          >
            <img src={person.image} alt={person.name} />
            <div className="name">{person.name}</div>
            <div className="hobbies">hobbies:</div>
            <div className="hobby">{person.hobbies}</div>
          </div>
        ))}
      </div>
      <button onClick={() => showHobbies()}>show hobbies!</button>
      <div className="hobbies_message">{message}</div>

      <div className="feedback">
        <h2>
          Your feedback is important to us!
        </h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            className="email"
            name="email"
            placeholder="your email address"
            value={users.email}
            onChange={handleAddInputChange}
          />
          <input
            type="text"
            className="text"
            name="text"
            placeholder="your feedback"
            value={users.text}
            onChange={handleAddInputChange}
          />
          <button type="submit">Add</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="user">
            <div className="email">{user.email}</div>
            <div className="email">{user.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
