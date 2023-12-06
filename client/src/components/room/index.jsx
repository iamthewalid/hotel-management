import { Link } from 'react-router-dom';
import DescriptionModal from './description-modal';
import RoomCarousal from './room-carousel';
import './room.css';
import { useDateRange } from '../../store';

const Room = ({ data }) => {
  const [from, to] = useDateRange((state) => [state.from, state.to]);

  return (
    <>
      <article className="row box-shadow room_card mt-5 rounded p-3">
        <div className="col-md-4">
          <img src={data?.imageurls[0]} className="small_img rounded" alt="" />
        </div>
        <div className="col-md-7">
          <h1>{data?.name}</h1>
          <p>Max count: {data?.maxcount}</p>
          <p>Phone Number: {data?.phonenumber}</p>
          <p>Type : {data?.type}</p>

          <div className="row">
            <div className="ml-auto">
              {from && to && (
                <Link to={'/booking/' + data?._id} className="btn btn-primary">
                  Book now
                </Link>
              )}
              <DescriptionModal room={data}>
                <RoomCarousal room={data} />
              </DescriptionModal>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Room;
