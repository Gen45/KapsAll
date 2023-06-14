import ReactDOM from 'react-dom';
import { ReactNode, useState } from 'react';
import { FaEdit, FaRegTimesCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';
// import './Modal.css';

export const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};


const Modal = ({ title, children, isShowing, hide }: { title: string; children: ReactNode; isShowing: Boolean; hide: any }) => isShowing ? ReactDOM.createPortal(
    <>
        <div className="fixed top-0 left-0 bg-slate-800 opacity-90 w-screen h-screen z-10" />
        <div className="flex fixed top-0 left-0 w-screen h-screen max-h-screen justify-center items-center z-20 overflow-y-auto py-8" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="flex flex-col grow max-w-3xl rounded-2xl bg-white my-4">
                <div className="flex justify-between items-center p-6">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <button type="button" className="" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true"><FaTimes size="1.5rem" /></span>
                    </button>
                </div>
                <div className="flex px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    </>, document.body
) : null;

export default Modal;