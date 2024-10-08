import React, { useEffect, useState } from 'react';
import CreateNoteForm from './components/CreateNoteForm';
import Note from './components/Note';
import Filters from './components/Filters';
import { createNote, fetchNotes } from './services/note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await fetchNotes(filter);
        setNotes(fetchedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  const onCreate = async (note) => {
    await createNote(note);

    const fetchedNotes = await fetchNotes(filter);
    setNotes(fetchedNotes);
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (error) {
    return <p className='text-red-500'>Error: {error}</p>;
  }

  return (
    <section className='p-8 flex flex-row justify-start gap-12'>
      <div className='flex flex-col w-1/3 gap-10'>
        <CreateNoteForm onCreate={onCreate}/>
        <Filters filter={filter} setFilter={setFilter} />
      </div>

      <ul className='flex flex-col gap-5 w-1/2'>
        {notes.map((note) => (
          <li key={note.id}>
            <Note
              title={note.title}
              description={note.description}
              createdAt={note.createdAt}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
