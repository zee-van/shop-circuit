import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from 'react-icons/io';

const Modal = forwardRef(function Modal({ children, dialogStyle }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
            close: () => {
                dialog.current.close();
            }
        }
    })

    function closeModal() {
        dialog.current.close();
    }
    let mainStyle = `md:w-[22rem] bg-zinc-800 backdrop:bg-stone-950/90 rounded-md`
    return createPortal(
            <dialog className={dialogStyle ? dialogStyle : mainStyle} ref={dialog}>
                <span onClick={closeModal} className='text-stone-200 text-3xl absolute top-0 right-0 cursor-pointer bg-zinc-800'><IoIosClose /></span>
                {children}
            </dialog>,
        document.getElementById("modal-root")
    )
})

export default Modal;
