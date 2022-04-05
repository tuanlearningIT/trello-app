import './Card.scss';
import { Container, Draggable } from 'react-smooth-dnd';
const Card = (props) => {
    const { card } = props

    return (

        <>
            <div className="card-item">
                {
                    card.cover && <img
                        onMouseDown={e => e.preventDefault()}
                        src={card.cover} />
                }
                {
                    card.title
                }
            </div>



        </>
    )
}

export default Card;