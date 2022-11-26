import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import './edit-post-tag-add-box.component.css';

export default function TagAddBox(props) {

    const createTag = props.createTag;

    return (
        <div className={"tag-add-box"} hidden={true} >
            <div className={"tag-add-box-header"}>
                <button className={"tag-add-box-quit-button"} onClick={() => {
                    const tagbox = document.getElementsByClassName("tag-add-box")[0];
                    tagbox.hidden = true;
                }}>
                    <FontAwesomeIcon icon={faX} className={"tag-add-box-quit-button"}/>
                </button>
            </div>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    createTag(e.target[1].value, e.target[0].value);
                    document.getElementsByClassName("tag-add-box")[0].hidden = true
                }
            }>
                <div className={"tag-add-box-color-input"}>
                    <label form={"color"}>Choose a Color</label>
                    <select name={"color"} id={"color"}>
                        <option value={"grey"}>Grey</option>
                        <option value={"red"}>Red</option>
                        <option value={"blue"}>Blue</option>
                        <option value={"green"}>Green</option>
                        <option value={"yellow"}>Yellow</option>
                        <option value={"orange"}>Orange</option>
                        <option value={"purple"}>Purple</option>
                        <option value={"pink"}>Pink</option>
                    </select>
                </div>
                <div className={"tag-add-box-hashtag-input"}>
                    <input className={"tag-add-box-input"} type={"text"} placeholder={"Add a tag"}/>
                    <input type={"submit"} value={"Add"} className={"tag-add-box-submit"}/>
                </div>
            </form>
        </div>
    );
}
