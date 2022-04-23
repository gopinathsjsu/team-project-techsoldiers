import { createStyles, Card, CheckboxGroup, Checkbox } from '@mantine/core';
import { useState } from 'react';
export const BookingDetailsRoom = (props) => {
    let { roomType, roomIndex, selectedAmenities } = props.details;
    
    console.log('BookingDetailsRoom', props.amenities);
   
    const [checks, setChecks] = useState(selectedAmenities);
    function onChange(selected){

        console.log('selected - ', selected);
        console.log('checks - ', checks);
      setChecks(selected);
      props.changeRoomAmenities(roomIndex,selected);
    }
    return (<>
        <Card withBorder radius="md" p={0} mb="md">
            <h1>{roomType}  {roomIndex + 1} </h1>
            <CheckboxGroup value={checks} onChange={onChange}>
                {props.amenities?.length>0&&
                   props.amenities.map((amen)=>{
                        return   <Checkbox value={amen.id} key={amen.id} label={amen.name} />
                    })}
              
            </CheckboxGroup>
        </Card>
    </>)
}