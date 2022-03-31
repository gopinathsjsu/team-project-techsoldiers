import React from "react";
import { Box, Center, Container, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import HotelListing from "../../components/HotelListing";
import hotel1 from '../../media/hotel1.jpg';
import { useQuery, QueryClient  } from "react-query";
import { getHotelsByLocationId } from '../../services/HotelService';



export function Listing() {

  const queryClient = new QueryClient();

  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/listing",
      label: "Listing",
    },
    {
      link: "/hotel",
      label: "Hotel",
    },
  ];

const prefetchData = async () => {
  await queryClient.prefetchQuery('hotelByLocation', getHotelsByLocationId(1));
}
  
// whenever you are using params or parameter for getting the data use this kind of format
const { data, isLoading, isError, error } = useQuery(['hotelByLocation'],prefetchData, {
  initialData: {
    data: []
  }
});

if(isLoading){
  return (<div>Loading....</div>)
}else{
  return (
    <>
    <TopBar links={links} />
    {/* <SearchComponent></SearchComponent> */}
    <Box>
      <Image src={hotel1} height={300} width='lg' mb={30} />
      <Container>
        {
            data.data.map((item, key) => (
              <HotelListing links={item} key={key} />
            ))
          }
        
      </Container>
    </Box>
    </>
  );
}
}
