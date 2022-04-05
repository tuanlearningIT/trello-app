import './BoardContent.scss';
import Column from './Column/Column';
import { initData } from '../../actions/initData';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../ultilities/sort';
import { Container, Draggable } from 'react-smooth-dnd';
import 'font-awesome/css/font-awesome.min.css';
import { applyDrag } from '../../ultilities/applyDrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fecthBoardDetail, createNewColumn, updateBoard, updateColumnTitle, updateCard } from '../../actions/APICall/index'
const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [addNewList, setAddNewList] = useState(false)
    const [addNewTitle, setAddNewTitle] = useState('')
    const newColumnInputRef = useRef(null)

    useEffect(() => {
        //   const boardData = initData.boards.find(board => board._id === 'board-1')
        const boardId = '623aa3d3a93d6db5d116886c'
        fecthBoardDetail(boardId).then(board => {
            setBoard(board)
            //sort column
            setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
        })
    }, [])
    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [addNewList])
    if (_.isEmpty(board)) {
        return (
            <div className='not-found'>Board Not found!</div>
        )
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = _.cloneDeep(columns);
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = _.cloneDeep(board)
        newBoard.columnOrder = newColumns.map(c => c._id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        //call api update board
        updateBoard(newBoard._id, newBoard)
            .catch(() => {
                setColumns(columns)
                setBoard(board)
            })

    }
    const onCardDrop = (dropResult, columnId) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumn = _.cloneDeep(columns);

            let currentColumn = newColumn.find(c => c._id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(i => i._id)
            setColumns(newColumn)
            if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
                /** 
                 * ActionL move card inside its column 
                 * 1 - Call api update cardOrder in current column 
                 */
                console.log('chekc ooix', dropResult)
                updateColumnTitle(currentColumn._id, currentColumn).catch(() => setColumns(columns))
            } else {
                /**
                 * Action: move card beetween two coluomns
                 * 1 - Call api update cardOrder in current card
                 */
                console.log('chekc ooix', dropResult)
                updateColumnTitle(currentColumn._id, currentColumn).catch(() => setColumns(columns))
                if (dropResult.addedIndex !== null) {
                    let currentCard = _.cloneDeep(dropResult.payload)
                    currentCard.columnId = currentCard._id
                    // 2 - Call api update columnIn current card
                    updateCard(currentCard._id, currentCard)


                }

            }

        }
    }
    const handleHideShow = () => {
        setAddNewList(true)
    }
    const handleClose = () => {
        setAddNewList(false)
    }
    const addNewColumn = () => {
        if (!addNewTitle) {
            newColumnInputRef.current.focus();
            return;
        }
        const newColumnToAdd = {
            boardId: board._id,
            title: addNewTitle.trim(),
        }
        //API create column
        createNewColumn(newColumnToAdd).then(column => {
            let newColumn = _.cloneDeep(columns);

            newColumn.push(column)
            let newBoard = _.cloneDeep(board)
            newBoard.columnOrder = newColumn.map(c => c._id)
            newBoard.columns = newColumn;
            newColumnInputRef.current.focus();
            setColumns(newColumn)
            setBoard(newBoard)
            setAddNewTitle('')
        })

    }
    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdUpdate = newColumnToUpdate._id
        let newColumn = _.cloneDeep(columns);
        const newColumnIndexUpdate = newColumn.findIndex(i => i._id === columnIdUpdate)

        if (newColumnToUpdate._destroy) {
            newColumn.splice(newColumnIndexUpdate, 1)
        } else {
            newColumn.splice(newColumnIndexUpdate, 1, newColumnToUpdate)
        }
        let newBoard = _.cloneDeep(board)
        newBoard.columnOrder = newColumn.map(c => c._id)
        newBoard.columns = newColumn;

        setColumns(newColumn)
        setBoard(newBoard)

    }

    return (
        <div className="board-column">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview'
                }}
            >
                {

                    columns && columns.length > 0 &&
                    columns.map(column => {
                        return (
                            <Draggable key={column._id}>
                                <Column column={column}
                                    onCardDrop={onCardDrop}
                                    onUpdateColumn={onUpdateColumn}

                                />
                            </Draggable>
                        )
                    })
                }
                {
                    addNewList === false &&
                    <div className='add-new-column col-9' onClick={handleHideShow}>
                        <i className='fa fa-plus icon'></i> Add another list
                    </div>
                }
                {addNewList === true &&
                    <div className='form-group enter-add-list col-9'>
                        <input size='sm' placeholder='Enter list title...' className='form-control active' type='text'
                            ref={newColumnInputRef}
                            value={addNewTitle}
                            onChange={e => setAddNewTitle(e.target.value)}
                            onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
                        />
                        <div className='button-add'>
                            <button onClick={addNewColumn}
                                size="sm" className='btn btn-primary active'>Add list</button>
                            <span onClick={handleClose} ><i className="fa fa-times close"></i></span>
                        </div>

                    </div>
                }

            </Container>

        </div>
    )
}

export default BoardContent;