import React from 'react'
import '../viewnotes/Viewnote.css'

// import React, { useEffect, useState } from 'react';
import '../home/Home.css';
import '../home/Home'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Viewnote = () => {

    const {id} = useParams();

    const allnotes = useSelector((state) => state.note.notes);

    const note = allnotes.filter((p) => p._id === id)[0];

    return (
        <div className="main-container">
            <div className="div-container">

                <div>
                    <form>
                        <input
                            disabled
                            type="text"
                            className="create-inpt"
                            placeholder="Enter Title"
                            value={note.title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div className="textarea-wrapper">
                            <textarea
                                name="note-content"
                                className="note-textarea-2"
                                disabled
                                value={note.content}
                                onChange={(e) => setValue(e.target.value)}
                                cols={20}
                                rows={18}
                                placeholder="Enter your note here"
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Viewnote
