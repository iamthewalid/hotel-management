import { Carousel } from 'react-bootstrap';

const RoomCarousal = ({ room }) => {
  return (
    <Carousel prevLabel="" nextLabel="">
      {room?.imageurls?.map((url, i) => {
        return (
          <Carousel.Item key={url + i}>
            <img className="d-block w-100 rounded" src={url} alt="First slide" />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default RoomCarousal;
