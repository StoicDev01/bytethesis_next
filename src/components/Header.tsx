import React, { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import Router, { useRouter } from "next/router"

import {MdOutlineDarkMode as Dark} from "react-icons/md"
import {RxSun as Light} from "react-icons/rx"
import { AiOutlineMenu} from "react-icons/ai"

import styles from "../styles/components/Header.module.css"
import Menu from "./Menu"
import IconButton from "./IconButton"
import { Language } from "@app/lib/Language"


interface Props {
    pages? : { name : string; link : string}[];
    languages? : Language[];
    languageName : string;
}


function ChangeLangButton(props : {languageName : string}){
    const router = useRouter();

    return (
        <IconButton
            icon={
                <h3>
                    {props.languageName === "pt" ? "Pt" : "En"}
                </h3>
            }

            onClick={ 
                () => {
                    props.languageName === "en" ? 
                        router.push("/pt", undefined, { shallow: true }) : 
                        router.push("/", undefined, { shallow : true})
                }
            }
        /> 
    )
}


export default function Header(props : Props) {
    const [theme, setTheme] = useState<string | null>(null);
    const [changeThemeIcon, setChangeThemeIcon] = useState<JSX.Element>()
    const [isMenuActive, setMenuActive] = useState(false);
    const [language, setLanguage] = useState<"pt" | "en">();
    
    function getChangeThemeIcon(theme : string | null ){
        const Icon = theme === "light" ? Dark : Light
        return <Icon className={styles.header_button}/>
    }

    function getThemeFromDocument(){
        const root = document.documentElement;
        const theme = (root.getAttribute("data-theme") || "light");
        return theme;
    }

    function getThemeFromMemory(){
        const memoryTheme = localStorage.getItem("theme");
        return memoryTheme;
    }
    
    function switchTheme(){
        const nextTheme = theme === "light" ? "dark" : "light"
        // change theme 
        setTheme(nextTheme);
    }

    function activateMenu(){
        setMenuActive(true);
    }

    function deactivateMenu(){
        setMenuActive(false);
    }

    // On start
    useEffect( () => {
        let startTheme = getThemeFromMemory() || getThemeFromDocument();

        setTheme(startTheme);
    }, [])

    // When theme changes
    useEffect( () => {
        const root = document.documentElement;

        if (theme){
            // Set theme css
            root.setAttribute("data-theme", theme);

            // save on memory
            localStorage.setItem("theme", theme);
        }

        // Set change icon
        setChangeThemeIcon(getChangeThemeIcon(theme));

    }, [theme])

    return (
        <div className={[styles.header, "outer", "shadow2"].join(" ")} >

            <Menu 
                pages={props.pages} 
                languages={props.languages} 
                isActive={isMenuActive}
                onDeactivate={deactivateMenu}
            />

            <div className={["inner", styles.header_inner].join(" ")}>
                <div className={styles.header_brand}>
                    <div className={styles.header_brand_icon}>
                        <Link 
                            href={props.languageName === "pt" ? "/pt" : "/"}
                        >
                            <Image 
                                alt="brand-image" width="50" height="50" id="brand-icon" 
                                className="shadow2 round clickable" src="/images/Bytethesis.png"
                            />
                        </Link>
                    </div>

                    <div className={styles.header_brand_text}>
                        <Link  
                            className={styles.header_text} 
                            href={props.languageName === "pt" ? "/pt" : "/"}
                        >
                            Bytethesis
                        </Link>
                    </div>

                    <div className={["phone-only", styles.header_buttons].join(" ")}>
                        <ChangeLangButton
                            languageName={props.languageName}
                        />

                        <IconButton
                            icon={changeThemeIcon}
                            onClick={switchTheme}
                        />

                        <IconButton
                            icon={<AiOutlineMenu className={styles.header_button}/>}
                            onClick={activateMenu}
                        />
                    </div>
                </div>

                <nav className={styles.header_nav}>
                    <ul className={styles.header_navigation}>
                        { props.pages && props.pages.map( (page) => (
                            <Link className="not-accentued" key={page.name} href={page.link}>
                                {page.name}
                            </Link>
                        ))}
                    </ul>
                </nav>


                <div className={[styles.header_buttons, "desktop-only"].join((" "))}>
                    <ChangeLangButton
                        languageName={props.languageName}
                    />

                    <IconButton
                        icon={ changeThemeIcon}
                        onClick={switchTheme}
                    />

                    <IconButton
                        icon={<AiOutlineMenu className={styles.header_button}/>}
                        onClick={activateMenu}
                    />
                </div>
            </div>
        </div>
    )
}