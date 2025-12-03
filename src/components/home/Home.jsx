import React, { useEffect, useState } from 'react';
import '../home/Home.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToNotes, updateTonotes } from '../../redux/noteSlice';
import toast from 'react-hot-toast';
import Ai from '../ai/Ai';


const Home = () => {
  // State for selecting Public/Private
  const [selectedStateOption, setSelectedStateOption] = useState('Public');
  // State for selecting category like Work, Education, etc.
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('Work');
  // State for title
  const [title, setTitle] = useState('');
  // State for value (content) of the note
  const [value, setValue] = useState('');
  // To get query params from URL (e.g., noteId)
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    if (noteId) {
      const note = notes.find((p) => p._id === noteId);
      if (note) {
        setTitle(note.title);
        setValue(note.content);
        setSelectedCategoryOption(note.category);
        setSelectedStateOption(note.stateOption);
      }
    } else {
      // Clear the form when there's no noteId
      resetForm();
    }
  }, [noteId, notes]);

  // Create or update the note
  const createNote = (event) => {
    event.preventDefault();

    if (!title || !value.trim()) {
      toast.error('Title and Content cannot be empty');
      return;
    }

    const note = {
      title,
      content: value,
      category: selectedCategoryOption,
      stateOption: selectedStateOption,

      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (noteId) {
      // Update the note
      dispatch(updateTonotes(note));
      // toast.success('Note updated successfully!');
    } else {
      // Add the note to Redux
      dispatch(addToNotes(note));
      // toast.success('Note created successfully!');
    }

    // Reset form fields after creation/updation
    resetForm();

    // Remove the noteId from the URL after update/create
    setSearchParams({});
  };

  // Reset the form fields
  const resetForm = () => {
    setTitle('');
    setValue('');
    setSelectedStateOption('Public');
    setSelectedCategoryOption('Work');
  };

  const [showAi, setShowAi] = useState(false); // State to control modal visibility

  const handleButtonClick = () => {
    setShowAi(true); // Show the modal when button is clicked
  };



  return (
    <div className="main-container">
      <div className="div-container">
        <div className="textarea-container">
          <label>
            <select
              id="state-category"
              className="select-container"
              value={selectedStateOption}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedStateOption(selectedValue);
            
                if (selectedValue === 'Private') {
                  toast.error('Private option is not available currently');
                  setTimeout(() => {
                    setSelectedStateOption('Public');
                  }, 1000);
                }
              }}
              
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </label>

          <label>
            <select
              id="category-select"
              className="select-container"
              value={selectedCategoryOption}
              onChange={(e) => setSelectedCategoryOption(e.target.value)}
            >
              <option value="Work">Work</option>
              <option value="Code">Code</option>
              <option value="Text">Text</option>
              <option value="JSON">JSON</option>
            </select>
          </label>

          <button className="ai-btn" onClick={handleButtonClick}>
            AI Assistant
          </button>
          {showAi && <Ai setShowAi={setShowAi} />}
        </div>

        <div>
          <form>
            <input
              type="text"
              className="create-inpt"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button className="create-btn" onClick={createNote}>
              {noteId ? 'Update Note' : 'Create Note'}
            </button>

            <div className="textarea-wrapper">
              <span className="option-tag public-tag">{selectedStateOption}</span>
              <span className="option-tag category-tag">{selectedCategoryOption}</span>
             
              <textarea
                name="note-content"
                className="note-textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                cols={20}
                rows={18}
                placeholder="Enter your note here here"
              ></textarea>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

