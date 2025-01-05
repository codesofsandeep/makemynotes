import React, { useState } from 'react'
import '../note/Note.css'
import { useDispatch, useSelector } from 'react-redux'
import editIcon from '../../images/edit.png'
import copyIcon from '../../images/copy.png'
import trashIcon from '../../images/trash.png'
import shareIcon from '../../images/share.png'
import downloadIcon from '../../images/download.png'
import viewIcon from '../../images/view.png'
import { FormatDate } from '../formatedDate/Date'
import calendar from '../../images/calendar.png'
import { removeFromNotes } from '../../redux/noteSlice'
import toast from 'react-hot-toast'
import { jsPDF } from "jspdf";
import Close from '../../images/delete.png';
import whatsapp from '../../images/whatsapp.png'
import mail from '../../images/gmail.png'
import linkedin from '../../images/linkedin.png'
import skype from '../../images/skype.png'
import { Link } from 'react-router-dom';


const Note = () => {

    const notes = useSelector((state) => state.note.notes);

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filterData = notes.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const [isShareVisible, setIsShareVisible] = useState(false);

    const handleShareClick = () => {
        setIsShareVisible((prev) => {
            if (!prev) {
                setIsCloseVisible(true);
            }
            return !prev;
        });
    };

    function handleDelete(noteId) {
        dispatch(removeFromNotes(noteId));
    };

    function handleDownloadPDF(note) {
        if (!note?.content || !note?.title) {
            toast.error("No content or title to download");
            return;
        }

        const doc = new jsPDF();

        //Add title
        doc.setFontSize(16);
        doc.text(note.title, 10, 10);

        // Add content
        doc.setFontSize(12)
        doc.text(note.content, 10, 20);

        doc.save(`${note.title || 'note'}.pdf`);
        toast.success("PDF downloaded successfully");
    };

    const [isCloseVisible, setIsCloseVisible] = useState(true);

    const handleClose = () => {
        setIsShareVisible(false); // Hide the share div
        setIsCloseVisible(false);
    };

    // whatsapp Share
    const handleShareToWhatsapp = (note) => {
        if (!note?.content || !note?.title) {
            toast.error("No content to share");
            return;
        }

        const whatsappMessage = `Title: ${note.title}\nNote Category: ${note.category}\nNote Type: ${note.stateOption}\n\nContent:\n${note.content}`;
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, "_blank");
    };

    // Email Share
    const handleShareToMail = (note) => {
        if (!note?.title || !note?.content) {
            toast.error("No content to share");
            return;
        }

        const Subject = `Check out this note : ${note.title}`;
        const Body = `Hi, \n\nI wanted to share this note with you:\n\nTitle: ${note.title}\nNote Category: ${note.category}\nNote Type: ${note.stateOption}\n\nContent:\n${note.content}\n\nThank You.`;

        const mailToURL = `mailto:?Subject=${encodeURIComponent(Subject)}&body=${encodeURIComponent(Body)}`;
        window.open(mailToURL, "_blank");
    };

    // Linkedin Share 
    const handleShareToLinkedin = (note) => {
        if (!note?.title || !note?.content) {
            toast.error("No content to share");
            return;
        }

        const LinkedinMessage = `Check out my note: $Title: ${note.title}\nNote Category: ${note.category}\nNote Type: ${note.stateOption}\n\nContent:\n${note.content}`;
        const encodedMessage = encodeURIComponent(LinkedinMessage);
        const linkedinMessageURL = `https://www.linkedin.com/messaging/compose/?body=${encodedMessage}`;
        window.open(linkedinMessageURL, "_blank");
    };

    // Skype Share
    const handleShareToSkype = (note) => {
        if (!note?.title || !note?.content) {
            toast.error("No content to share");
            return;
        }

        const skypeMessage = `Check out this note:\n\nTitle: ${note.title}\nNote Category: ${note.category}\nNote Type: ${note.stateOption}\n\nContent:\n${note.content}`;
        const encodedMessage = encodeURIComponent(skypeMessage);
        const skypeURL = `skype:?chat&message=${encodedMessage}`;
        window.open(skypeURL, "_blank");
    };

    // passwrd fileds



    return (
        <div className='main-div'>
            <div className='child-div'>
                <input type="search" placeholder='Search Notes Here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className='note-head'>
                <h1>All <span>Notes</span></h1>
            </div>
            <div className='cards-div'>

                {filterData.length === 0 && (
                    <h1 className='warning-note-div'>No notes available</h1> // Display this message if no notes match the search term
                )}

                {
                    filterData.length > 0 &&
                    filterData.map((note) => {
                        return (
                            <div className='note-content-div' key={note?._id}>
                                <div className='note-div'>
                                    {note.title}
                                </div>
                                <div className='content-div'>
                                    {note.content}
                                </div>
                                <div className='btns-div'>
                                    <button>
                                        <Link to={`/?noteId=${note?._id}`}>
                                            <img src={editIcon} alt="edit" />
                                        </Link>
                                    </button>

                                    <button>
                                        <Link to={`/notes/${note?._id}`}>
                                            <img src={viewIcon} alt="view" />
                                        </Link>
                                        
                                    </button>


                                    



                                    <button><img src={copyIcon} alt="copy" onClick={() => {
                                        navigator.clipboard.writeText(note?.content)
                                        toast.success("Copied to clipboard");
                                    }} /></button>

                                    <button><img src={downloadIcon} alt="download" onClick={() => handleDownloadPDF(note)} /></button>

                                    <button><img src={shareIcon} alt="share" onClick={handleShareClick} /></button>

                                    <button><img src={trashIcon} alt="trash" onClick={() => handleDelete(note?._id)} /></button>
                                </div>

                                {isShareVisible && (
                                    <div className="share-div">
                                        <p className='share-para'>Share via:</p>
                                        <button><img src={whatsapp} alt="whatsapp" onClick={() => handleShareToWhatsapp(note)} /></button>

                                        <button><img src={mail} alt="mail" onClick={() => handleShareToMail(note)} /></button>

                                        <button><img src={linkedin} alt="linkedin" onClick={() => handleShareToLinkedin(note)} /></button>

                                        <button><img src={skype} alt="skype" onClick={() => handleShareToSkype(note)} /></button>

                                        <button><img src={copyIcon} alt="" onClick={() => {
                                            navigator.clipboard.writeText(note?.content)
                                            toast.success("Copied to clipboard");
                                        }} />
                                        </button>
                                        {(
                                            isCloseVisible &&
                                            <div>
                                                <button onClick={handleClose}><img src={Close} alt="" /></button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className='date-div'>
                                    <div><img src={calendar} alt="" /></div>
                                    <div>{FormatDate(note?.createdAt)}</div>
                                </div>

                                <div className='option-div'>
                                    <div>{note.stateOption}</div>
                                    <div>{note.category}</div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Note




