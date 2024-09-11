import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import ImageWithSpinner from '../ImageWIthSpinner/ImageWithSpinner';

export interface cardT {
    type : string,
    title : string,
    imgUrl : string,
    position : number
  }
  
interface overlayT {
  isOverlayVisible : boolean,
  currOverlayImage : string
}

const MainGrid = ({
    data,
    moveCardHandler
  }:{
    data : cardT[],
    moveCardHandler : (dragIndex : number, hoverIndex : number) => void
  }) => {

  const [overlay, setOverlay] = useState<overlayT>({isOverlayVisible : false, currOverlayImage : ""});
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const cardClickHandler = (imgUrl : string) => {  
    let newState = {
      isOverlayVisible : true,
      currOverlayImage : imgUrl
    }
    setOverlay(newState);
  }

  const keydownEventHandler = (e : KeyboardEvent<HTMLDivElement>) => {
    if(e.key === "Escape"){
      setOverlay({isOverlayVisible : false, currOverlayImage : ""});
    }
  }

  // To set focus on the overlay div Element
  useEffect(() => {
    if(overlayRef.current){
      overlayRef.current?.focus();
    }
  }, [overlay])


  const renderCard = useCallback((item : cardT, id : number) => {
    return <Card 
              key={item.position}
              index={id}
              id={item.position}
              cardDetails={item}
              cardClickHandler={cardClickHandler}
              moveCardHandler={moveCardHandler}
            />
  }, [])

  return (
    <>
        <div className="main_container">
          {
            data.length > 0 && 
                data.map((item, id) => renderCard(item,id)) 
          }
          {
            overlay.isOverlayVisible && 
              <div
                ref={overlayRef}
                tabIndex={0} 
                onKeyDown={keydownEventHandler} 
                className='overlay_container'>
                <ImageWithSpinner src={`/assets/${overlay.currOverlayImage}`} /> 
              </div>
          }
        </div>
    </>
  )
}

export default MainGrid