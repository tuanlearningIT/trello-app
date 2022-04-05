import { mapOrder } from '../../../ultilities/sort';
import Card from './card/Card';
import './Column.scss';
import { Container, Draggable } from 'react-smooth-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, } from 'react-bootstrap';
import ConfirmModal from '../../../common/ConfirmModal';
import { useState, useEffect, useRef } from 'react';
import { MODAL_ACTION_CONFIRM } from '../../../ultilities/constants';
import { selectAll, saveContent } from '../../../ultilities/contentEdit';
import _ from 'lodash';
import { createNewCard, updateColumnTitle } from '../../../actions/APICall/index'
const Column = (props) => {
    const { column, onCardDrop, onUpdateColumn, } = props
    const card = mapOrder(column.cards, column.cardOrder, '_id');
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [changeNewTitle, setChangeNewTitle] = useState('')
    const [addNewCard, setAddNewList] = useState(false)
    const [addNewCardTitle, setAddNewCardTitle] = useState('')
    const newCardInputRef = useRef(null)

    useEffect(() => {
        setChangeNewTitle(column.title)
    }, [])
    useEffect(() => {
        if (newCardInputRef && newCardInputRef.current) {
            newCardInputRef.current.focus()
        }
    }, [addNewCard])
    const showModal = () => {
        setShowConfirmModal(!showConfirmModal)
    }
    const onConfirmModal = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true,
            }
            console.log("newcolumn", column)
            console.log("newcolumn", newColumn)
            updateColumnTitle(newColumn._id, newColumn).then(updatedColumn => {

                onUpdateColumn(updatedColumn)
            })
        }
        showModal()
    }
    // update column title
    const handTitleBlur = () => {

        if (changeNewTitle !== column.title) {
            const newColumn = {
                ...column,
                title: changeNewTitle
            }
            //API update
            updateColumnTitle(newColumn._id, newColumn).then(updatedColumn => {
                updatedColumn.cards = newColumn.cards;
                onUpdateColumn(updatedColumn)
            })
        }
    }
    const handleDefault = (e) => {
        e.preventDefault()
    }
    const handleHideShow = () => {
        setAddNewList(true)
    }
    const handleClose = () => {
        setAddNewCardTitle('')
        setAddNewList(!addNewCard)
    }
    const addNewCards = () => {
        if (!addNewCardTitle) {
            newCardInputRef.current.focus()
            return;
        }
        let newCardToAdd = {
            boardId: column.boardId,
            columnId: column._id,
            title: addNewCardTitle.trim(),
        }

        //API create card
        createNewCard(newCardToAdd).then(card => {
            let newColumn = _.cloneDeep(column)
            newColumn.cards.push(card)
            newColumn.cardOrder.push(card._id)
            onUpdateColumn(newColumn)
            setAddNewCardTitle('')
            newCardInputRef.current.focus()

        })
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addNewCards()
        }
    }
    return (
        <>
            <div className="column">
                <header className='column-drag-handle'>
                    <div className='column-title'>

                        <input size='sm' className='content-edit-title form-control ' type='text'
                            spellCheck='false'
                            value={changeNewTitle}
                            onClick={selectAll}
                            onChange={e => setChangeNewTitle(e.target.value)}
                            onBlur={handTitleBlur}
                            onKeyDown={saveContent}
                            onMouseDown={e => e.preventDefault()}
                        />
                    </div>
                    <div className='dropdown-title'>
                        <Dropdown onClick={handleDefault} >
                            <Dropdown.Toggle className='dropdown-btn' size='sm' />
                            <Dropdown.Menu>
                                <Dropdown.Item href="#">Add card...</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={showModal}>Remove column...
                                    <ConfirmModal

                                        show={showConfirmModal}
                                        onAction={onConfirmModal}
                                        title={"Remove column"}
                                        content={`Are you sure you want to remove <strong> ${column.title}</strong>. <br/> All related cards will also be removed!`}
                                    />
                                </Dropdown.Item>
                                <Dropdown.Item href="#">Move all card in this column(beta)...</Dropdown.Item>
                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </header>

                <div className="card-list">
                    <Container
                        groupName='col'
                        onDrop={(dropResult) => onCardDrop(dropResult, column._id)}
                        getChildPayload={index => card[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >
                        {

                            card && card.length > 0 &&
                            card.map(card =>
                                <Draggable key={card._id}>
                                    <Card card={card} />
                                </Draggable>
                            )
                        }
                    </Container>

                    <div className='form-group enter-add-card'>
                        {
                            addNewCard === true &&
                            <div>
                                <textarea
                                    placeholder='Enter a list title for this card...' className='form-control add-textarea-card'
                                    as="textarea"
                                    row="3"
                                    ref={newCardInputRef}
                                    value={addNewCardTitle}
                                    onChange={e => setAddNewCardTitle(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                                <div className='button-add-card'>
                                    <button
                                        onClick={addNewCards}
                                        size="sm" className='btn btn-primary add-list-card-title'>Add card</button>
                                    <span
                                        onClick={handleClose}
                                    ><i className="fa fa-times close-card"></i></span>
                                </div>
                            </div>
                        }
                    </div>
                    {
                        addNewCard === false &&
                        <footer>

                            <div className='footer-action' onClick={handleHideShow}>
                                <i className='fa fa-plus icon'></i>Add a card
                            </div>

                        </footer>
                    }
                </div>
            </div>


        </>
    )
}

export default Column;