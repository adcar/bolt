import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {MdArrowBack, MdExpandLess, MdExpandMore} from "react-icons/md";


export default function id(props) {
    let emails;
    const router = useRouter();
    const {id} = router.query;
    let thisEmail;
    useEffect(() => {
        emails = localStorage.getItem("emails");
        console.log(JSON.parse(emails));
        match();
    }, []);

    function match() {
        for (let i = 0; i < emails.length; i--) {
            if (emails[i].id == id) {
                thisEmail == emails[i];
                break;
            }
        }
    }

    console.log(id);


    return (
        <div>
            <div className="leftPanel">
                <MdArrowBack/>
                <MdExpandLess/>
                <MdExpandMore/>
            </div>
            <div className="centerPanel">
                <div className="emailSubject">
                    This is supposed to be a email header
                </div>
                <div className="content">
                    This is a e email content
                    HI,


                    Thanks,
                    Bye
                </div>
            </div>
            <div className="rightPanel">

            </div>
        </div>
    );
}
