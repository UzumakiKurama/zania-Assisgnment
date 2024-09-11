import { useDrag, useDrop } from "react-dnd"
import { cardT } from "../MainGrid/MainGrid"
import { useRef } from "react"
import ImageWithSpinner from "../ImageWIthSpinner/ImageWithSpinner"

const Card = ({ 
  cardDetails, 
  index,
  id,
  cardClickHandler,
  moveCardHandler
}: {
  cardDetails : cardT,
  index : number,
  id : number,
  cardClickHandler : (imageUrl : string) => void,
  moveCardHandler : (dragIndex : number, hoverIndex : number) => void
}) => {

  const ref = useRef<HTMLDivElement>(null);

  const [ {handlerId} , drop] = useDrop({
    accept : "CARD",
    collect(monitor){
      return {
        handlerId : monitor.getHandlerId()
      }
    },
    hover(item : any){
        if(!ref.current) return;
      
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return
        }

        moveCardHandler(dragIndex, hoverIndex)

        item.index = hoverIndex
      }
    })

  const [{isDragging}, drag] = useDrag({
    type : "CARD",
    item : () => {
      return {id, index}
    },
    collect : (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

    drag(drop(ref));

  return (
    <div
      ref={ref}
      onClick={() => cardClickHandler(cardDetails.imgUrl)}
      data-handler-id={handlerId} 
      className='card_container'
      style={{opacity : isDragging ? 0.7 : 1}}>
        <h1> {cardDetails.title} </h1>
        <ImageWithSpinner src={`/assets/${cardDetails.imgUrl}`} />
    </div>
  )
}

export default Card